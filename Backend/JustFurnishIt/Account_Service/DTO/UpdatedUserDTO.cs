namespace Account_Service.DTO
{
    // Data Transfer Object (DTO) for updating user information.
    public class UpdatedUserDTO
    {
        // Unique identifier for the user being updated.
        public int UserId { get; set; }

        // The updated first name of the user.
        public string FirstName { get; set; }

        // The updated last name of the user.
        public string LastName { get; set; }

        // The updated phone number of the user. Allows null if phone number is not provided.
        public long? PhoneNumber { get; set; }

        // The updated password of the user.
        public string Password { get; set; }

        // URL to the updated profile picture of the user.
        public string ProfilePictureUrl { get; set; }

        // The updated gender of the user.
        public string? Gender { get; set; }

        // The updated date of birth of the user.
        public DateTime? DateOfBirth { get; set; }

        // Updated street address of the user.
        public string? StreetAddress { get; set; }

        // Updated city of the user.
        public string? City { get; set; }

        // Updated state or province of the user.
        public string? State { get; set; }

        // Updated postal code of the user.
        public string? PostalCode { get; set; }

        // Updated country of the user.
        public string? Country { get; set; }
    }
}
