using System.ComponentModel.DataAnnotations;

namespace Account_Service.DTO
{
    // Data Transfer Object (DTO) for handling password reset requests.
    public class ResetPasswordDTO
    {
        // The email address of the user requesting a password reset. This field is required.
        [Required]
        public string Email { get; set; }
        // The reset token sent to the user via email, needed to authorize the password reset.
        [Required(ErrorMessage = "Reset token is required.")]
        public string Token { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        // The new password chosen by the user, with validation to ensure it meets minimum length and type requirements.
        public string NewPassword { get; set; }

    }
}
