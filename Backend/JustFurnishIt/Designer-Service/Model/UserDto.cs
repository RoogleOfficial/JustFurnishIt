using System.Text.Json.Serialization;

namespace Designer_Service.Model
{
    public class UserDto
    {
        // Unique identifier for the user
        public int UserId { get; set; }

        // First name of the user, serialized as "firstName" in JSON
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        // Last name of the user, serialized as "lastName" in JSON
        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        // Email address of the user, serialized as "email" in JSON
        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}
