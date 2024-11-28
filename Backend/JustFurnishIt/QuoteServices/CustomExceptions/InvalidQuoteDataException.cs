namespace QuoteServices.CustomExceptions
{
    public class InvalidQuoteDataException : Exception
    {
        public InvalidQuoteDataException(string message) : base(message) { }
    }
}
