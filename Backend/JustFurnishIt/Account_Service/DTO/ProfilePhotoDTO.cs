namespace Account_Service.DTO
{
    // Data Transfer Object (DTO) for updating a user's profile photo.
    public class ProfilePhotoDTO
    {
        // The unique identifier of the user whose profile photo is being updated.
        public int UserID { get; set; }
        // The URL of the new profile picture for the user.
        public string ProfilePictureUrl { get; set; }
    }
}
