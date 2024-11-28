using Booking_Service.DTO;
using Booking_Service.Model;

namespace Booking_Service.Repository
{
    public interface IBookingRepository
    {

        Task<Booking> CreateBookingAsync(BookingDTO booking); // Creates a new booking based on the provided BookingDTO

        Task<IEnumerable<Booking>> GetAllBookingsAsync(); // Retrieves a list of all bookings

        Task<Booking> GetBookingByIdAsync(int id); // Retrieves a single booking by its ID

        Task UpdateBookingAsync(Booking booking); // Updates an existing booking with new information

        Task DeleteBookingAsync(int id); // Deletes a booking by its ID

        Task<IEnumerable<string>> GetAvailableAppointmentsAsync(int designerId, DateTime date); // Retrieves available appointment slots for a specific designer on a given date

        Task<string> GetDesignerNameFromAccountService(int userId); // Fetches the designer's name from the Account Service using the user ID

        Task<bool> MarkAsCompletedAsync(int bookingId); // Marks a booking as completed based on its ID

        Task<int> GetUserIdByDesignerId(int designerId); // Retrieves the user ID associated with a specific designer ID

        Task<string> GetDesignName(int designId); // Fetches the name of a design based on the design ID

        Task<IEnumerable<object>> GetBookingsByUserIdAsync(int userId); // Retrieves bookings associated with a specific user by their ID, providing limited details

        Task<string> GetDesignerNameByDesignIdAsync(int designId); // Retrieves the designer's name associated with a specific design ID

        Task<IEnumerable<BookingDTO>> GetBookingsByDesignerIdAsync(int designerId); // Retrieves bookings associated with a specific designer by their ID and maps them to BookingDTO objects


    }
}
