using Account_Service.DTO;
using Account_Service.Models;
using Account_Service.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Account_Service.Controllers
{
    // Defines the AccountController, which handles user-related HTTP requests.
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // Repository for user-related database operations.
        private readonly IAccountRepository _authRepository;
        // Mapper for converting between DTOs and models.
        private readonly IMapper _mapper;

        // Constructor for injecting repository and mapper dependencies.
        public AccountController(IAccountRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _mapper = mapper;
        }

        // Endpoint for user registration.
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            // Map RegisterDTO to a User model for registration.
            User newUser = _mapper.Map<User>(registerDTO);
            // Generate a default profile picture URL and set the created date.
            newUser.ProfilePictureUrl = $"https://ui-avatars.com/api/?uppercase=true&name={registerDTO.FirstName}+{registerDTO.LastName}";
            newUser.CreatedOn = DateTime.UtcNow;
            // Call repository to register the user.
            var (statusCode, message) = await _authRepository.Registeration(newUser);
            if (statusCode != 200)
            {
                // Return error if registration fails.
                return StatusCode(statusCode, new { Message = message });
            }

            return Ok(new { Message = message });
        }

        // Endpoint for user login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            // Call repository to validate login credentials and get token.
            var (statusCode, message) = await _authRepository.Login(loginDTO);
            if (statusCode != 200)
            {
                // Return error if login fails.
                return StatusCode(statusCode, message);
            }
            // Return the authentication token.
            return Ok(message);
        }

        // Endpoint to delete a user by ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Call repository to delete user by ID.
            var result = await _authRepository.DeleteUserAsync(id);
            if (!result)
            {
                // Return 404 if user is not found.
                return NotFound("User not found.");
            }
            return Ok("User deleted successfully.");
        }

        // Endpoint to retrieve all users.
        [HttpGet("GetAllUser")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            // Call repository to retrieve all users.
            var users = await _authRepository.GetAllUsersAsync();
            return Ok(users);
        }

        // Endpoint to retrieve a user by ID.
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            // Call repository to retrieve user by ID.
            var user = await _authRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        // Endpoint to retrieve roles for a user by user ID.
        [HttpGet("roles/{userId}")]
        public async Task<ActionResult<List<string>>> GetRolesByUserId(int userId)
        {
            // Call repository to retrieve roles by user ID.
            var roles = await _authRepository.GetRolesByUserIdAsync(userId);
            if (roles == null || roles.Count == 0)
            {
                return NotFound("Roles not found for the user.");
            }
            return Ok(roles);
        }

        // Endpoint to retrieve users by their role.
        [HttpGet("role/{role}")]
        public async Task<ActionResult<List<User>>> GetUsersByRole(string role)
        {
            // Call repository to retrieve users with the specified role.
            var users = await _authRepository.GetUsersByRoleAsync(role);
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found for the specified role.");
            }
            return Ok(users);
        }

        // Endpoint to update user details.
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUserDetails(int id, UpdatedUserDTO updateduser)
        {
            // Check if the provided ID matches the user's ID.
            if (id != updateduser.UserId)
            {
                return BadRequest("User ID mismatch.");
            }
            // Call repository to update user details.
            var updatedUserResult = await _authRepository.UpdateUserDetailsAsync(updateduser);
            if (updatedUserResult == null)
            {
                return NotFound("User not found.");
            }
            return Ok(updatedUserResult);
        }

        // Endpoint to update the profile photo of a user.
        [HttpPut("updatephoto/{id}")]
        public async Task<IActionResult> UpdateProfilePhoto(int id, [FromBody] ProfilePhotoDTO profilePhotoDto)
        {

            // Check if the provided ID matches the UserID in the DTO.
            if (id != profilePhotoDto.UserID)
            {
                return BadRequest("User ID mismatch.");
            }

            // Validate that the ProfilePhotoDTO contains a valid URL.
            if (profilePhotoDto == null || string.IsNullOrEmpty(profilePhotoDto.ProfilePictureUrl))
            {
                return BadRequest("Invalid profile photo details.");
            }

            // Call the repository to update the profile photo
            var user = await _authRepository.UpdateProfilePhotoAsync(profilePhotoDto);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(new { message = "Profile photo updated successfully." });
        }

        // Endpoint to send a password reset email to a user.
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] string Email)
        {
            // Call repository to send password reset email.
            var (statusCode, message) = await _authRepository.ForgotPassword(Email);
            return StatusCode(statusCode, new { Message = message });
        }

        // Endpoint to reset a user's password.
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            // Validate the model state to ensure all required fields are present.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Call repository to reset the password with the provided DTO.
            var (statusCode, message) = await _authRepository.ResetPassword(resetPasswordDTO);
            if (statusCode != 200)
            {
                // Return error if reset fails.
                return StatusCode(statusCode, new { Message = message });
            }
            // Return success message.
            return Ok(new { Message = message });
        }
    }
}
