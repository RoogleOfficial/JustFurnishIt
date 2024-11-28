namespace Design_Services.CustomExceptions
{
    public class CustomException:Exception
    {
        public CustomException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }

    public class DesignNotFoundException : CustomException
    {
        public DesignNotFoundException(string message)
            : base(message) { }
    }

    public class InvalidDesignCategoryException : CustomException
    {
        public InvalidDesignCategoryException(string message)
            : base(message) { }
    }

    public class DesignAdditionFailedException : CustomException
    {
        public DesignAdditionFailedException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }

    public class DesignDeletionFailedException : CustomException
    {
        public DesignDeletionFailedException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }

    public class DesignUpdateFailedException : CustomException
    {
        public DesignUpdateFailedException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }
}
