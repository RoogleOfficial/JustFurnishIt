namespace Booking_Service.CustomExceptions
{
    public class DataFetchException : Exception
    {
        public DataFetchException() : base("An error occurred while fetching data.")
        {
        }

        public DataFetchException(string message) : base(message)
        {
        }

        public DataFetchException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
