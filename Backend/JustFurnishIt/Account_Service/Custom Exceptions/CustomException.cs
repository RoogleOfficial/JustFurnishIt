namespace Account_Service.Custom_Exceptions
{
    // Base class for custom exceptions in the Account Service.
    public class CustomException : Exception
    {
        // Constructor accepting a custom message and an optional inner exception for additional error context.
        public CustomException(string message, Exception innerException = null)
            : base(message, innerException) { }
    }
    // Exception for cases where a user is not found.
    public class UserNotFoundException : CustomException
    {
        // Constructor accepting a custom message to describe the error.
        public UserNotFoundException(string message)
            : base(message) { }
    }
    // Exception for invalid password attempts, e.g., during login or password reset.
    public class InvalidPasswordException : CustomException
    {
        public InvalidPasswordException(string message)
            : base(message) { }
    }
    // Exception for when an email address already exists in the system, typically during registration.
    public class EmailAlreadyExistsException : CustomException
    {
        public EmailAlreadyExistsException(string message)
            : base(message) { }
    }
    // Exception for invalid roles, such as an unrecognized or unauthorized role assignment.
    public class InvalidRoleException : CustomException
    {
        public InvalidRoleException(string message)
            : base(message) { }
    }
    // Exception for when a user deletion operation fails.
    public class UserDeletionFailedException : CustomException
    {
        public UserDeletionFailedException(string message)
            : base(message) { }
    }
    // Exception for when a password reset operation fails.
    public class PasswordResetFailedException : CustomException
    {
        public PasswordResetFailedException(string message)
            : base(message) { }
    }
}
