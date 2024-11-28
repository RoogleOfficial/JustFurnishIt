namespace Designer_Service.CustomExceptions
{
    public class DesignerNotFoundException : Exception
    {
        public DesignerNotFoundException(string message) : base(message) { }
    }
}
