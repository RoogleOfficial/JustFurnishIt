using Microsoft.AspNetCore.Identity;

namespace Account_Service.Models
{
    // Represents a custom user entity that extends the default ASP.NET IdentityUser.
    public class ApplicationUser:IdentityUser
    {
        // Stores the user's application-specific username, which may differ from the default username provided by Identity.
        public string AppUserName { get; set; }
    }
}
