namespace QuoteServices.CustomExceptions
{
    public class QuoteNotFoundException : Exception
    {
        public QuoteNotFoundException(string message) : base(message) { }
    }
}
