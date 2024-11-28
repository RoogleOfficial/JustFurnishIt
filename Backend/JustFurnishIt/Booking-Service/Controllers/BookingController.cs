using Booking_Service.CustomExceptions;
using Booking_Service.DTO;
using Booking_Service.Model;
using Booking_Service.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        public BookingController(IBookingRepository bookingRepository) {
            _bookingRepository = bookingRepository;
        }

       
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDTO booking)
        {
            try
            {
                // Check if the provided AppointmentDate is valid
                if (booking.AppointmentDate == default(DateTime))
                {
                    // If the AppointmentDate is missing or invalid, return a 400 Bad Request response
                    return BadRequest(new { message = "Invalid appointment date. Please provide a valid date and time." });
                }

                // Attempt to create the booking using the booking repository
                var createdBooking = await _bookingRepository.CreateBookingAsync(booking);

                // Return a 200 OK response with the created booking details
                return Ok(createdBooking);
            }
            catch (DesignerUnavailableException ex)
            {
                // Handle known conflicts (e.g., double-booking or invalid state)
                // Return a 409 Conflict response with the specific conflict message
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // For any unexpected errors, return a 500 Internal Server Error response
                // Include a generic message and error details for debugging
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }


        
        //An IActionResult containing the list of all bookings.
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            // Fetch all bookings asynchronously using the repository
            var bookings = await _bookingRepository.GetAllBookingsAsync();

            // Return the bookings in a 200 OK response
            return Ok(bookings);
        }


        // Get booking by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            // Attempt to retrieve the booking by its ID
            var booking = await _bookingRepository.GetBookingByIdAsync(id);

            // If the booking is not found, return a 404 Not Found response with a message
            if (booking == null)
            {
                return NotFound(new { message = "Booking not found" });
            }

            // If the booking is found, return a 200 OK response with the booking details
            return Ok(booking);
        }

        // Update a booking
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] Booking updatedBooking)
        {
            // Check if the ID in the URL matches the ID of the booking in the request body
            if (id != updatedBooking.BookingId)
            {
                // Return a 400 Bad Request response if there's an ID mismatch
                return BadRequest(new { message = "Booking ID mismatch" });
            }

            try
            {
                // Attempt to update the booking using the repository
                await _bookingRepository.UpdateBookingAsync(updatedBooking);

                // Return a 200 OK response with the updated booking details
                return Ok(updatedBooking);
            }
            catch (KeyNotFoundException ex)
            {
                // If the booking is not found, return a 404 Not Found response with an error message
                return NotFound(new { message = ex.Message });
            }
        }

        // Delete a booking
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            try
            {
                // Attempt to delete the booking by ID using the repository
                await _bookingRepository.DeleteBookingAsync(id);

                // If deletion is successful, return a 204 No Content response to indicate successful deletion
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                // If the booking is not found, catch the KeyNotFoundException and return a 404 Not Found response with the error message
                return NotFound(new { message = ex.Message });
            }
        }
  

        [HttpGet("available-times")]
        public async Task<IActionResult> GetAvailableAppointments([FromQuery] int designerId, [FromQuery] string date)
        {
            // Validate the date format to ensure it's in the expected format (YYYY-MM-DD)
            if (string.IsNullOrEmpty(date) || !DateTime.TryParseExact(date, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out DateTime parsedDate))
            {
                // If the date is missing or not in the expected format, return a 400 Bad Request response
                return BadRequest(new { message = "Invalid date format. Please provide a valid date in the format YYYY-MM-DD." });
            }

            // Fetch available appointments for the specified designer on the given date
            var availableAppointments = await _bookingRepository.GetAvailableAppointmentsAsync(designerId, parsedDate);

            // Return a 200 OK response with the available appointment slots
            return Ok(availableAppointments);
        }

        // Get bookings by User ID (to display upcoming bookings for a customer)
        // GET: api/Booking/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBookingsByUserId(int userId)
        {
            try
            {
                // Fetch the enriched bookings with designer name and design name
                var bookings = await _bookingRepository.GetBookingsByUserIdAsync(userId);

                // If no bookings found, return NotFound
                if (bookings == null || !bookings.Any())
                {
                    return NotFound(new { message = "No bookings found for this user." });
                }

                // Return the bookings as JSON
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                // Return a 500 error with the exception message
                return StatusCode(500, new { message = "An error occurred while fetching bookings.", details = ex.Message });
            }
        }

        [HttpGet("designer-name/{designId}")]
        public async Task<IActionResult> GetDesignerNameByDesignId(int designId)
        {
            try
            {
                var designerName = await _bookingRepository.GetDesignerNameByDesignIdAsync(designId);
                return Ok(new { designerName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", details = ex.Message });
            }
        }


        [HttpGet("designer/{designerId}")]
        public async Task<IActionResult> GetBookingsByDesignerId(int designerId)
        {
            try
            {
                var bookings = await _bookingRepository.GetBookingsByDesignerIdAsync(designerId);
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching bookings.", details = ex.Message });
            }
        }

        [HttpPut("{id}/complete")]
        public async Task<IActionResult> MarkAsCompleted(int id)
        {
            var success = await _bookingRepository.MarkAsCompletedAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent(); // 204 No Content
        }
    }
}
