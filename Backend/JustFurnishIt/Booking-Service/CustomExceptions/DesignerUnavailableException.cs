namespace Booking_Service.CustomExceptions
{
    public class DesignerUnavailableException : Exception
    {
        public DesignerUnavailableException() : base("The selected time slot is already booked.")
        {
        }

        public DesignerUnavailableException(string message) : base(message)
        {
        }

        public DesignerUnavailableException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
