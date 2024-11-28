namespace Designer_Service.CustomExceptions
{
    public class DataDeserializationException : Exception
    {
        public DataDeserializationException(string message) : base(message) { }
    }
}
