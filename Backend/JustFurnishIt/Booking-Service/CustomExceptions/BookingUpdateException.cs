namespace Booking_Service.CustomExceptions
{
    public class BookingUpdateException : Exception
    {
        public BookingUpdateException() : base("An error occurred while updating the booking.")
        {
        }

        public BookingUpdateException(string message) : base(message)
        {
        }

        public BookingUpdateException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
