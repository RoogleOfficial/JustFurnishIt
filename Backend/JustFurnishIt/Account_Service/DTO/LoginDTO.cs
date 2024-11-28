namespace Account_Service.DTO
{
    // Data Transfer Object (DTO) for handling user login data.
    public class LoginDTO
    { 
        // Stores the user's email address, used as the primary identifier for login.
        public string Email { get; set; }
        // Stores the user's password for authentication during login.
        public string Password { get; set; }
    }
}

