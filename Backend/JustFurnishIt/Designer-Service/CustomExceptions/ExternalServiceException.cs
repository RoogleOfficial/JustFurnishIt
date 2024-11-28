namespace Designer_Service.CustomExceptions
{
    public class ExternalServiceException : Exception
    {
        public ExternalServiceException(string message) : base(message) { }
    }
}
