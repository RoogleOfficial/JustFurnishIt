namespace Feedback_Service
{
    public class ReviewRepositoryException:Exception
    {
        // Constructor for creating an exception with a specific message
        public ReviewRepositoryException(string message) : base(message)
        {
        }

        // Constructor for creating an exception with a specific message and inner exception
        public ReviewRepositoryException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
