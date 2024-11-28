namespace Account_Service.DTO
{
    // Data Transfer Object (DTO) for handling user registration data.
    public class RegisterDTO
    {
        // The first name of the user being registered.
        public string FirstName { get; set; }
        // The last name of the user being registered.
        public string LastName { get; set; }
        // The email address of the user, used as the primary contact and login identifier.
        public string Email { get; set; }
        // The password chosen by the user, used for authentication.
        public string Password { get; set; }
        // The role assigned to the user, such as "Admin" or "User", for defining access levels.
        public string Role { get; set; }
    }
}
