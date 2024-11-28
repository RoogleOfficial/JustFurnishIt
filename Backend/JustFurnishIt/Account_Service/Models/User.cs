using System.ComponentModel.DataAnnotations;

namespace Account_Service.Models
{
    // Represents the User entity in the application, holding user-related data.
    public class User
    {
        // Primary key for the User entity. This unique identifier distinguishes each user in the database.
        [Key]
        public int UserId { get; set; }
        // The first name of the user.
        public string FirstName { get; set; }
        // The last name of the user.
        public string LastName { get; set; }
        // The email address of the user.
        public string Email { get; set; }
        // Optional phone number of the user.
        public long? PhoneNumber {  get; set; }
        // The user's password
        public string Password { get; set; }
        // URL to the user's profile picture, if available.
        public string ProfilePictureUrl { get; set; }
        // The role assigned to the user, such as "Admin", "User", or "Designer", for access control purposes.
        public string Role { get; set; }
        // Gender of the user.
        public string? Gender { get; set; }
        // The user's date of birth.
        public DateTime? DateOfBirth { get; set; }
        // Date and time when the user account was created.
        public DateTime CreatedOn { get; set; }
        // Street address of the user.
        public string? StreetAddress { get; set; }
        // City of the user.
        public string? City { get; set; }
        // State or province of the user.
        public string? State { get; set; }
        // Postal code of the user.
        public string? PostalCode { get; set; }
        // Country of the user.
        public string? Country { get; set; }

    }
}

