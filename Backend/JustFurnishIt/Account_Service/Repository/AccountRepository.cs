using Account_Service.Custom_Exceptions;
using Account_Service.Data;
using Account_Service.DTO;
using Account_Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Account_Service.Repository
{
    // The AccountRepository class implements the IAccountRepository interface and
    // provides functionality for user management such as registration, login,updating user details, and handling roles.
    public class AccountRepository : IAccountRepository
    {
        // UserManager is used for managing users in the ASP.NET Identity framework
        private readonly UserManager<ApplicationUser> _userManager;
        // RoleManager is used for managing roles in ASP.NET Identity
        private readonly RoleManager<IdentityRole> _roleManager;
        // AccountDBContext provides access to the database tables for custom user data
        private readonly AccountDBContext _context;
        // IConfiguration allows access to configuration settings, such as JWT settings
        private readonly IConfiguration _configuration;
        // IEmailSender is used for sending emails
        private readonly IEmailSender _emailSender;

        // Constructor to inject required dependencies
        public AccountRepository(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            AccountDBContext context,
            IConfiguration configuration,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
        }


        // Method to delete a user by ID    
        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                // Find the user in the custom user table by ID
                var user = await _context.users.FindAsync(id);
                // If user not found, throw a custom exception
                if (user == null)
                {
                    throw new UserNotFoundException($"User with ID {id} does not exist.");
                }
                // Find the user in the Identity system by email
                var identityUser = await _userManager.FindByEmailAsync(user.Email.ToString());
                // If Identity user not found, throw a custom exception
                if (identityUser == null)
                {
                    throw new UserNotFoundException($"No user found with the email {user.Email} in the identity store.");
                }
                // Delete the Identity user from the ASP.NET Identity system
                var identityResult = await _userManager.DeleteAsync(identityUser);
                if (!identityResult.Succeeded)
                {
                    throw new UserDeletionFailedException($"Failed to delete identity user: {identityUser.UserName}");
                }
                // Remove the user from the custom user table
                _context.users.Remove(user);
                // Save changes to the database
                await _context.SaveChangesAsync();
                return true;
            }
            catch (UserNotFoundException ex)
            {
                // Handle known exception for user not found
                throw new CustomException($"User deletion failed: {ex.Message}");
            }
            catch (UserDeletionFailedException ex)
            {
                // Handle known exception for deletion failure in Identity
                throw new CustomException($"Failed to delete user: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle unknown exceptions with a general custom exception
                throw new CustomException("An unexpected error occurred during user deletion.", ex);
            }
        }

        // Method to retrieve all users from the database
        public async Task<List<User>> GetAllUsersAsync()
        {
            try
            {
                // Retrieve all users from the custom user table
                return await _context.users.ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions with a custom error message
                throw new CustomException("An error occurred while retrieving all users from the database.", ex);
            }
        }

        // Method to get roles associated with a user by user ID
        public async Task<List<string>> GetRolesByUserIdAsync(int userId)
        {
            try
            {
                // Find the user in the custom user table by user ID
                var user = await _context.users.FirstOrDefaultAsync(u => u.UserId == userId);
                // If user not found, throw a custom exception
                if (user == null)
                {
                    throw new UserNotFoundException($"User with ID {userId} not found.");
                }
                // Return the role as a list (assuming user has a single role)
                return new List<string> { user.Role.ToString() };
            }
            catch (UserNotFoundException ex)
            {
                // Handle known exception for user not found
                throw new CustomException($"Failed to get roles: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle unknown exceptions with a custom error message
                throw new CustomException("An error occurred while retrieving user roles.", ex);
            }
        }

        // Method to get a user by their unique ID
        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                // Find the user in the custom user table by ID
                var user = await _context.users.FindAsync(id);
                // If user not found, throw a custom exception
                if (user == null)
                {
                    throw new UserNotFoundException($"User with ID {id} not found.");
                }
                // Return the user if found
                return user;
            }
            catch (UserNotFoundException ex)
            {
                // Handle known exception for user not found
                throw new CustomException($"Failed to retrieve user by ID: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle unknown exceptions with a custom error message
                throw new CustomException("An error occurred while retrieving the user by ID.", ex);
            }
        }

        // Method to retrieve users based on their role
        public async Task<List<User>> GetUsersByRoleAsync(string role)
        {
            try
            {
                // Retrieve users with the specified role from the custom user table
                return await _context.users.Where(u => u.Role == role).ToListAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions with a custom error message
                throw new CustomException("An error occurred while retrieving users by role.", ex);
            }
        }

        // Method to authenticate a user (login)
        public async Task<(int, string)> Login(LoginDTO loginDetails)
        {
            try
            {
                // Find the user in Identity by email
                var user = await _userManager.FindByEmailAsync(loginDetails.Email);
                // If user not found, throw a custom exception
                if (user == null)
                {
                    throw new UserNotFoundException("The provided email address is not registered.");
                }
                // Check if the password is correct
                if (!await _userManager.CheckPasswordAsync(user, loginDetails.Password))
                {
                    throw new InvalidPasswordException("The provided password is incorrect.");
                }

                // Retrieve additional user details from the database (profileImage)
                var userdetails = await _context.users
                    .FirstOrDefaultAsync(u => u.Email == loginDetails.Email);

                // Prepare a list of claims (user data included in the JWT token)
                var userRoles = await _userManager.GetRolesAsync(user);
                // Create a list of claims to be included in the JWT token
                //   - ClaimTypes.Name: The username of the user
                //   - JwtRegisteredClaimNames.Jti: A unique identifier for the token
                //   - ClaimTypes.Email: The email address of the user
                //   - "ProfilePicture": The URL of the user's profile picture
                //   - "UserId": The ID of the user in the database
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.AppUserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("ProfilePicture", userdetails?.ProfilePictureUrl ?? string.Empty),
                    new Claim("UserId", userdetails?.UserId.ToString() ?? string.Empty)
                };
                // Add user roles to the claims
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                // Generate a JWT token with the claims
                string token = GenerateToken(authClaims);
                // Return status 200 and the generated token
                return (200, token);
            }
            catch (UserNotFoundException ex)
            {
                // Handle known exception for user not found
                return (404, $"Login failed: {ex.Message}");
            }
            catch (InvalidPasswordException ex)
            {
                // Handle known exception for invalid password
                return (400, $"Login failed: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle unknown exceptions with a custom error message
                throw new CustomException("An unexpected error occurred during login.", ex);
            }
        }

        // Registers a new user in both Identity and the custom user table.
        public async Task<(int, string)> Registeration(User newUser)
        {
            try
            {
                // Check if a user with the same email already exists.
                var existingUser = await _userManager.FindByEmailAsync(newUser.Email);
                if (existingUser != null)
                {
                    throw new EmailAlreadyExistsException("A user with this email address is already registered.");
                }

                // Create a new ApplicationUser for Identity.
                var user = new ApplicationUser
                {
                    UserName = newUser.Email,
                    Email = newUser.Email,
                    AppUserName = newUser.FirstName,
                    SecurityStamp = Guid.NewGuid().ToString()
                   
                };
                // Assign role, defaulting to 'User' if none is specified.
                var role = newUser.Role ?? Roles.User;
                if (role == Roles.User || role == Roles.Admin || role == Roles.Designer)
                {
                    // Create the user using ASP.NET Identity
                    var result = await _userManager.CreateAsync(user, newUser.Password);
                    if (!result.Succeeded)
                    {
                        throw new CustomException($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }

                    // Ensure the role exists and assign it to the user
                    if (!await _roleManager.RoleExistsAsync(role))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(role));
                    }
                    await _userManager.AddToRoleAsync(user, role);

                    // Add the user to the custom user table and save changes.
                    await _context.users.AddAsync(newUser);
                    await _context.SaveChangesAsync();
                    return (200,$"{newUser.UserId},{role}");
                }

                throw new InvalidRoleException("The role provided is invalid.");
            }
            catch (EmailAlreadyExistsException ex)
            {
                return (400, $"Registration failed: {ex.Message}");
            }
            catch (InvalidRoleException ex)
            {
                return (400, $"Registration failed: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new CustomException("An unexpected error occurred during registration.", ex);
            }
        }

        // Updates the profile photo of a user in the custom user table.
        public async Task<User> UpdateProfilePhotoAsync(ProfilePhotoDTO profilePhoto)
        {
            try
            {
                // Find the user by UserID
                var user = await _context.users.FirstOrDefaultAsync(u => u.UserId == profilePhoto.UserID);

                if (user == null)
                {
                    throw new UserNotFoundException($"User with ID {profilePhoto.UserID} not found.");
                }

                // Update the profile picture URL
                user.ProfilePictureUrl = profilePhoto.ProfilePictureUrl;

                // Save changes to the database
                _context.users.Update(user);
                await _context.SaveChangesAsync();

                return user; // Return the updated user
            }
            catch (UserNotFoundException ex)
            {
                throw new CustomException($"Profile photo update failed: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new CustomException("An unexpected error occurred while updating profile photo.", ex);
            }
        }

        // Updates the details of an existing user in the custom user table.
        public async Task<User> UpdateUserDetailsAsync(UpdatedUserDTO updatedUser)
        {
            try
            {
                // Fetch the existing user from the database
                var existingUser = await _context.users.FindAsync(updatedUser.UserId);
                if (existingUser == null)
                {
                    throw new UserNotFoundException($"User with ID {updatedUser.UserId} not found.");
                }
                // Update user details.
                existingUser.FirstName = updatedUser.FirstName;
                existingUser.LastName = updatedUser.LastName;
                existingUser.PhoneNumber = updatedUser.PhoneNumber;
                existingUser.ProfilePictureUrl = updatedUser.ProfilePictureUrl;
                existingUser.Gender = updatedUser.Gender;
                existingUser.DateOfBirth = updatedUser.DateOfBirth;
                existingUser.StreetAddress = updatedUser.StreetAddress;
                existingUser.City = updatedUser.City;
                existingUser.State = updatedUser.State;
                existingUser.PostalCode = updatedUser.PostalCode;
                existingUser.Country = updatedUser.Country;

                // Save the updated user back to the database
                _context.users.Update(existingUser);
                await _context.SaveChangesAsync();

                return existingUser;
            }
            catch (UserNotFoundException ex)
            {
                throw new CustomException($"Update user details failed: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new CustomException("An unexpected error occurred while updating user details.", ex);
            }
        }

        // Generates a JSON Web Token (JWT) for authenticated users.
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            // Create a symmetric security key using the secret key from configuration.
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            // Define the token properties, including the issuer, audience, expiration, signing credentials, and claims.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };
            // Creates a token handler, which will build the token based on the provided token descriptor.
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Initiates the password reset process for a user by email.
        public async Task<(int, string)> ForgotPassword(string email)
        {
            // Find the user in the Identity system by their email address.
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return (404, "User not found.");
            }
            // Generate a password reset token for the user.
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Construct the reset link URL containing the token and email.
            var resetLink = $" http://localhost:5173/resetpassword?token={(token)}&email={email}";
            // Send an email with the reset link to the user's email address.
            await _emailSender.SendEmailAsync(email, "Password Reset Request",
                $"Please reset your password by clicking this link: <a href={resetLink}>Reset Password</a>");
            // Return a success response indicating that the reset link has been sent.
            return (200, ("Password reset link has been sent to your email."));
        }



        // Method to update user password in the custom user table
        public async Task<bool> UpdateCustomUserPasswordAsync(User user, string newPassword)
        {
            //Assign the new password to the user.
            user.Password = newPassword;
            // Update the user record in the database with the new password and Save changes to the database.
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        // Resets the user's password after they have clicked the reset link.
        public async Task<(int, string)> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            //step1: Find the user in Identity by their email to reset their Identity password.
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                return (404, "User not found.");
            }

            // Step 2: Find user in custom user table
            var customUser = await _context.users.FirstOrDefaultAsync(u => u.Email == resetPasswordDTO.Email);
            if (customUser == null)
            {
                return (404, "User not found in custom user table.");
            }

            // Step 3: Check if the new password is the same as the current one (no hashing for custom table)
            if (customUser.Password == resetPasswordDTO.NewPassword)
            {
                return (400, "New password cannot be the same as the current password.");
            }

            // Step 4: Reset password using the token in Identity Table
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
            if (!result.Succeeded)
            {
                return (500, string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Update password in the custom user table (plain text)
            var customTableUpdateResult = await UpdateCustomUserPasswordAsync(customUser, resetPasswordDTO.NewPassword);
            if (!customTableUpdateResult)
            {
                return (500, "Error updating password in custom user table.");
            }
            // Return success message if all updates succeed.
            return (200, "Password has been successfully reset.");
        }   
    }
}
