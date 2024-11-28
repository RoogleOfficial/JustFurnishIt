using Account_Service.DTO;
using Account_Service.Models;

namespace Account_Service.Repository
{
    public interface IAccountRepository
    {
        //Registers a new user in the system. Takes in a 'User' object and returns with an int status code and a string message.
        Task<(int,string)>Registeration(User newUser);


        //Authenticates a user based on the login credentials(username and password). Takes in a 'LoginDTO' and returns with an int status code and token.
        Task<(int,string)> Login(LoginDTO loginDTO);

        // Retrieves a user by their ID.Takes an integer 'id' and returns a 'User' object if found.
        Task<User> GetUserByIdAsync(int id);

        // Retrieves all users from the system and Returns a list of 'User' objects.
        Task<List<User>> GetAllUsersAsync();

        // Retrieves a list of users based on their role 
        Task<List<User>> GetUsersByRoleAsync(string role);

        // Retrieves the roles associated with a specific user based on their user ID.
        Task<List<string>> GetRolesByUserIdAsync(int userId);

        // Deletes a user from the Database by their unique ID.
        Task<bool> DeleteUserAsync(int id);

        // Updates the details of an existing user and Takes an 'UpdatedUserDTO' object with the new user details and returns the updated 'User' object.
        Task<User> UpdateUserDetailsAsync(UpdatedUserDTO updateduser);

        // Updates the profile photo of a user and Takes a 'ProfilePhotoDTO' and returns the updated 'User' object.
        Task<User> UpdateProfilePhotoAsync(ProfilePhotoDTO profilephoto);

        // Sends a password reset email to the user based on their email address.
        Task<(int, string)> ForgotPassword(string email);

        // Resets the user's password based on the provided reset information.
        Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO);
    }
}
