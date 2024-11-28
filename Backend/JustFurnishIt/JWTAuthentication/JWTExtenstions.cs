using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace JWTAuthentication
{
    // Defines extension methods for configuring JWT authentication.
    public static class JWTExtensions
    {
        // Constant string to store the security key used for signing JWTs.
        public const string SecurityKey = "myjustfurnishit#services1234567890enpoint#key";
        // Extension method for adding JWT authentication to the service collection.
        public static void AddJwtAuthentication(this IServiceCollection services)
        {
            // Configures the authentication scheme for the application.
            services.AddAuthentication(opt =>
            {
                // Sets the default authentication scheme to JWT Bearer.
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
        // Configures JWT Bearer authentication options.
        .AddJwtBearer(options =>
        {
            // Sets parameters for validating JWT tokens.
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,// Ensures the token’s issuer is valid.
                ValidIssuer = "JustFurnishIt-issuer",// Sets the expected issuer for token validation.
                ValidateAudience = true,// Ensures the token’s audience is valid.
                ValidAudience = "JustFurnishIt-audience",// Sets the expected audience for token validation.
                ValidateIssuerSigningKey = true,// Ensures the token’s signing key is valid.
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey))// Specifies the signing key for validating JWT signature.
            };
        });
        }


    }
}
