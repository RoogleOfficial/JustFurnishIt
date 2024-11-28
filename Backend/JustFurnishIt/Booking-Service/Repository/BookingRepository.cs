using Booking_Service.CustomExceptions;
using Booking_Service.DataAccess;
using Booking_Service.DTO;
using Booking_Service.Model;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

    namespace Booking_Service.Repository
    {
        public class BookingRepository : IBookingRepository
        {
            private readonly BookingDbContext _context;
            private readonly IEmailSender _emailSender;
            private readonly HttpClient _httpClient;

            public BookingRepository(BookingDbContext bookingDbContext,IEmailSender emailSender,HttpClient httpClient)
            {
                _context = bookingDbContext;
                _emailSender = emailSender;
                _httpClient = httpClient;
            }

        public async Task<Booking> CreateBookingAsync(BookingDTO bookingDto)
        {
            try
            {
                var conflictingBooking = await _context.Bookings
                    .FirstOrDefaultAsync(b => b.DesignerId == bookingDto.DesignerId && b.AppointmentDate == bookingDto.AppointmentDate);

                if (conflictingBooking != null)
                {
                    throw new DesignerUnavailableException();
                }

                var booking = new Booking
                {
                    CustomerId = bookingDto.CustomerId,
                    DesignerId = bookingDto.DesignerId,
                    DesignId = bookingDto.DesignId,
                    AppointmentDate = bookingDto.AppointmentDate,
                    Notes = bookingDto.Notes,
                    IsCompleted = false,
                    BookingDate = DateTime.UtcNow,
                    
                };

                await _context.Bookings.AddAsync(booking);
                await _context.SaveChangesAsync();

                var userId = await GetUserIdByDesignerId(bookingDto.DesignerId);
                var designerName = await GetDesignerNameFromAccountService(userId);
                var designerEmail = await GetDesignerEmailFromAccountService(userId);
                var designName = await GetDesignName(bookingDto.DesignId);

                string mockupLink = "https://your-mockup-service.com/mockup/12345";
                string emailContent = ComposeBookingEmail(designerName, designName, booking, mockupLink);
                await _emailSender.SendEmailAsync(bookingDto.CustomerEmail, "Booking Confirmation", emailContent);

                string designerEmailContent = ComposeBookingEmailForDesigner(designerName, designName, booking, mockupLink);
                await _emailSender.SendEmailAsync(designerEmail, "New Booking Notification", designerEmailContent);

                return booking;
            }
            catch (Exception ex)
            {
                throw new BookingUpdateException("An error occurred while creating the booking.", ex);
            }
        }
        // Fetch the userId using designerId from Designer Service
        public async Task<int> GetUserIdByDesignerId(int designerId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Designer/designer-detail/{designerId}");
                if (response.IsSuccessStatusCode)
                {
                    var designerMapping = await response.Content.ReadFromJsonAsync<DesignerDTO>();
                    return designerMapping?.UserId ?? throw new Exception("User ID not found for the given designer.");
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Error fetching designer details: {response.StatusCode}, Content: {errorContent}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching designer ID: {ex.Message}");
            }
        }

        // Fetch designer name from Account Service using userId
        public async Task<string> GetDesignerNameFromAccountService(int userId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Account/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    var user = await response.Content.ReadFromJsonAsync<CustomerDTO>();
                    return $"{user?.FirstName} {user?.LastName}" ?? "Designer";
                }
                return "Designer";
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the designer name: {ex.Message}");
            }
        }
        // Fetch designer name from Account Service using userId
        public async Task<string> GetCustomerNameFromAccountService(int userId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Account/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    var user = await response.Content.ReadFromJsonAsync<CustomerDTO>();
                    return $"{user?.FirstName} {user?.LastName}" ?? "Designer";
                }
                return "Designer";
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the designer name: {ex.Message}");
            }
        }
        // Fetch designer email from Account Service using userId
        public async Task<string> GetDesignerEmailFromAccountService(int userId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Account/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    var user = await response.Content.ReadFromJsonAsync<CustomerDTO>();
                    return $"{user?.Email}" ?? "Designer@gmail.com";
                }
                return "Designer@gmail.com";
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the designer email: {ex.Message}");
            }
        }

        // Fetch design name from Design Service
        public async Task<string> GetDesignName(int designId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/design/{designId}");
                if (response.IsSuccessStatusCode)
                {
                    var design = await response.Content.ReadFromJsonAsync<DesignDTO>();
                    return design?.DesignName ?? "Design";
                }
                return "Design";
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the design name: {ex.Message}");
            }
        }

        public async Task<string> GetDesignerNameByDesignIdAsync(int designId)
        {
            try
            {
                // First, get the designer ID by the design ID
                var designResponse = await _httpClient.GetAsync($"https://localhost:7000/gateway/design/{designId}");
                if (!designResponse.IsSuccessStatusCode)
                {
                    throw new Exception("Failed to fetch design. Design not found.");
                }

                var designDetails = await designResponse.Content.ReadFromJsonAsync<DesignDTO>();
                int designerId = designDetails.DesignerId;

                // Then, use the designer ID to get the designer's name from Account Service
                var userId = await GetUserIdByDesignerId(designerId);
                var designerName = await GetDesignerNameFromAccountService(userId);

                return designerName;
            }
            catch (HttpRequestException ex)
            {
                // Handle HTTP-specific errors
                throw new Exception("An error occurred while fetching data from the services.", ex);
            }
            catch (Exception ex)
            {
                // Handle general errors
                throw new Exception("An error occurred while retrieving the designer name.", ex);
            }
        }


        private string ComposeBookingEmail(string designerName, string designName, Booking booking, string mockupLink)
            {
                return $@"
            <p>Dear Customer,</p>

            <p>Thank you for booking with us!</p>

            <p>We are pleased to confirm your consultation with <strong>{designerName}</strong> for the design project <strong>""{designName}""</strong>.</p>

            <p>Here are the details of your appointment:</p>
            <ul>
                <li>Booking Reference Number: <strong>#{booking.BookingId}</strong></li>
                <li>Appointment Date and Time: <strong>{booking.AppointmentDate}</strong></li>
                <li>Designer: <strong>{designerName}</strong></li>
                <li>Design: <strong>{designName}</strong></li>
                <li>Customer Notes: <strong>{booking.Notes}</strong></li>
            </ul>

            <p>To join the virtual consultation, please <a href='{mockupLink}' target='_blank'>join this link</a>.</p>

            <p>If you need to cancel or reschedule, please contact us.</p>

            <p>Best regards,</p>
            <p>JustFurnishIt</p>
        ";
        
        }
            private string ComposeBookingEmailForDesigner(string designerName, string designName, Booking booking, string mockupLink)
            {
                return $@"
            <p>Dear {designerName},</p>

            <p>You have a new booking for the design project <strong>""{designName}""</strong>.</p>

            <p>Here are the details of the appointment:</p>
            <ul>
                <li>Booking Reference Number: <strong>#{booking.BookingId}</strong></li>
                <li>Appointment Date and Time: <strong>{booking.AppointmentDate}</strong></li>
                <li>Customer Notes: <strong>{booking.Notes}</strong></li>
            </ul>

       
            <p>To join the virtual consultation, please <a href='{mockupLink}' target='_blank'>join this link</a>.</p>

            <p>Best regards,</p>
            <p>JustFurnishIt</p>
        ";
            }



            public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
            {
                return await _context.Bookings.ToListAsync();
            }

            public async Task<Booking> GetBookingByIdAsync(int id)
            {
            try
            {
                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null)
                {
                    throw new BookingNotFoundException($"Booking with ID {id} was not found.");
                }

                return booking;
            }
            catch (Exception ex)
            {
                throw new DataFetchException("An error occurred while fetching the booking by ID.", ex);
            }
        }

        public async Task UpdateBookingAsync(Booking booking)
        {
            try
            {
                var existingBooking = await _context.Bookings.FindAsync(booking.BookingId);
                if (existingBooking == null)
                {
                    throw new BookingNotFoundException();
                }

                existingBooking.CustomerId = booking.CustomerId;
                existingBooking.DesignerId = booking.DesignerId;
                existingBooking.DesignId = booking.DesignId;
                existingBooking.AppointmentDate = booking.AppointmentDate;
                existingBooking.Notes = booking.Notes;
                existingBooking.IsCompleted = booking.IsCompleted;

                await _context.SaveChangesAsync();
            }
            catch (BookingNotFoundException ex)
            {
                throw new BookingNotFoundException("Update failed: The specified booking does not exist.", ex);
            }
            catch (Exception ex)
            {
                throw new BookingUpdateException("An unexpected error occurred while updating the booking.", ex);
            }
        }


        public async Task DeleteBookingAsync(int id)
        {
            try
            {
                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null)
                {
                    throw new BookingNotFoundException();
                }

                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
            catch (BookingNotFoundException ex)
            {
                throw new BookingNotFoundException("Delete operation failed: The specified booking does not exist.", ex);
            }
            catch (Exception ex)
            {
                throw new BookingUpdateException("An unexpected error occurred while deleting the booking.", ex);
            }
        }


        public async Task<IEnumerable<string>> GetAvailableAppointmentsAsync(int designerId, DateTime date)
        {
            try
            {
                // Retrieve all booked appointment times for the given designer on the specified date
                var bookedSlots = await _context.Bookings
                    .Where(b => b.DesignerId == designerId && b.AppointmentDate.Date == date.Date)
                    .Select(b => b.AppointmentDate.TimeOfDay)
                    .ToListAsync();

                // Initialize a list to store available appointment times
                var availableAppointments = new List<string>();

                int startHour = (date.Date == DateTime.Today) ? Math.Max(DateTime.Now.Hour, 9) : 9;
                // Loop through each hour from 9 AM to 5 PM to check availability
                for (int hour = startHour; hour <= 17; hour++) // Business hours assumed from 9 AM to 5 PM
                {
                    // Create a DateTime object representing the slot at the current hour
                    var slot = new DateTime(date.Year, date.Month, date.Day, hour, 0, 0);

                    // If the slot is not in the list of booked slots, add it to available appointments
                    if (!bookedSlots.Contains(slot.TimeOfDay))
                    {
                        availableAppointments.Add(slot.ToString("hh:mm tt")); // Format as "hh:mm AM/PM"
                    }
                }

                return availableAppointments;
            }
            catch (Exception ex)
            {
                // Handle any unexpected exceptions that occur during database operations or processing
                throw new DataFetchException("An error occurred while retrieving available appointments.", ex);
            }
        }


        public async Task<IEnumerable<object>> GetBookingsByUserIdAsync(int userId)
        {
            try
            {
                // Fetch all bookings for the user
                var bookings = await _context.Bookings
                    .Where(b => b.CustomerId == userId)
                    .OrderBy(b => b.AppointmentDate)
                    .ToListAsync();

                // Prepare a list to store the enriched booking details with designer and design names
                var bookingDetailsList = new List<object>();

                foreach (var booking in bookings)
                {
                    // Fetch the userID name using the designer ID
                    var userIdByDesignerId  = await GetUserIdByDesignerId(booking.DesignerId);

                    //Fetch designerName from using userId

                    var designerName = await GetDesignerNameFromAccountService(userIdByDesignerId);

                    // Fetch the design name using the design ID
                    var designName = await GetDesignName(booking.DesignId);

                    // Create an anonymous object with the desired fields
                    var bookingDetails = new
                    {
                        booking.CustomerId,
                        DesignerName = designerName, // Designer name instead of ID
                        DesignName = designName,     // Design name instead of ID
                        booking.BookingDate,
                        booking.AppointmentDate,
                        booking.Notes,
                        booking.IsCompleted,
                        booking.DesignerId,
                        booking.DesignId
                    };

                    // Add the booking details to the list
                    bookingDetailsList.Add(bookingDetails);
                }

                return bookingDetailsList;
            }
            catch (Exception ex)
            {
                throw new DataFetchException("An error occurred while retrieving available appointments.", ex);
            }
        }

        public async Task<IEnumerable<BookingDTO>> GetBookingsByDesignerIdAsync(int designerId)
        {
            try
            {
                // Fetch bookings associated with the given designerId and sort them by appointment date
                var bookings = await _context.Bookings
                    .Where(b => b.DesignerId == designerId)
                    .OrderBy(b => b.AppointmentDate)
                    .ToListAsync();

                var bookingDtos = new List<BookingDTO>();

                // Map each booking to BookingDTO and retrieve additional data as needed
                foreach (var booking in bookings)
                {
                    try
                    {
                        // Fetch DesignName dynamically from another service or repository using DesignId
                        var designName = await GetDesignName(booking.DesignId);

                        // Fetch Customer's Name and Email from the Account Service
                        var customerName = await GetDesignerNameFromAccountService(booking.CustomerId);
                        var customerEmail = await GetDesignerEmailFromAccountService(booking.CustomerId);

                        // Create DTO with relevant fields
                        var bookingDto = new BookingDTO
                        {
                            BookingId = booking.BookingId,
                            CustomerId = booking.CustomerId,
                            DesignId = booking.DesignId,
                            DesignerId = designerId,
                            DesignName = designName,
                            BookingDate = booking.BookingDate,
                            AppointmentDate = booking.AppointmentDate,
                            Notes = booking.Notes,
                            CustomerName = customerName,
                            CustomerEmail = customerEmail,
                            IsCompleted = booking.IsCompleted
                        };

                        // Add the DTO to the list
                        bookingDtos.Add(bookingDto);
                    }
                    catch (Exception ex)
                    {
                        // Log the specific error for the current booking, but continue processing the others
                        Console.WriteLine($"Error processing booking {booking.BookingId}: {ex.Message}");
                    }
                }

                    return bookingDtos;
            }
            catch (Exception ex)
            {
                // Handle any errors that may occur during the database fetch or processing
                throw new DataFetchException("An error occurred while fetching bookings for the designer.", ex);
            }
        }

        public async Task<bool> MarkAsCompletedAsync(int bookingId)
        {
            try
            {
                // Retrieve the booking by ID
                var booking = await GetBookingByIdAsync(bookingId);

                // Check if the booking exists
                if (booking == null)
                {
                    throw new BookingNotFoundException($"Booking with ID {bookingId} not found.");

                }

                // Mark the booking as completed
                booking.IsCompleted = true;
                _context.Bookings.Update(booking);

                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (BookingNotFoundException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            catch (Exception ex)
            {
                throw new BookingUpdateException("An error occurred while marking the booking as completed.", ex);
            }
        }


        }



}
