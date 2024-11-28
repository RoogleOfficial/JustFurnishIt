using Account_Service.AutoMapperProfile;
using Account_Service.Data;
using Account_Service.Helpers;
using Account_Service.Models;
using Account_Service.Repository;
using JWTAuthentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Account_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            // Swagger helps to document and test APIs.
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Configure the DbContext for AccountDBContext using SQL Server.This sets up the connection to the database where user accounts and related data are stored.
            builder.Services.AddDbContext<AccountDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("AccountDBConnection")));


            // Configures Identity with default password requirements.
            // Identity is used for managing users, roles, authentication, and more.
            // Password policy is defined here (e.g., requiring digits, lowercase, uppercase, and a minimum length of 6).
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<AccountDBContext>()// Adds the Entity Framework stores for Identity using AccountDBContext to persist user information.
            .AddDefaultTokenProviders();// Adds support for token generation (used for email confirmation, password reset, etc.).

            // Adds JWT Authentication to secure API endpoints with role-based authentication this is a library.
            builder.Services.AddJwtAuthentication();

            // Registers the AccountRepository to handle user-related operations like registration, login, etc.
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();

            // Registers SMTPService to handle email sending functionality, e.g., sending confirmation or password reset emails.
            // Transient means a new instance is created every time it's requested.
            builder.Services.AddTransient<IEmailSender, SMTPService>();

            // Registers AutoMapper with the profile used for mapping between DTOs and models.
            // AutoMapper simplifies object-to-object mapping.
            builder.Services.AddAutoMapper(typeof(AccountProfile));

            // Adds  Controller services, allowing for the creation of controllers that handle API requests.
            builder.Services.AddControllers();

            // Configures CORS to allow requests from any origin, with any HTTP method, and any headers.
            // This is useful for allowing the frontend (which might be hosted on a different domain) to communicate with the backend.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin() // Allows any domain to make requests.
                               .AllowAnyMethod() // Allows any HTTP method (GET, POST, PUT, DELETE, etc.).
                               .AllowAnyHeader(); // Allows any HTTP headers to be sent.
                    });
            });
            
            var app = builder.Build();

            // Enable Swagger for all environments
            //app.UseSwagger();
            //app.UseSwaggerUI(options =>
            //{
            //    options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            //    options.RoutePrefix = string.Empty; // Swagger at root
            //});
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Adds the Authorization middleware, ensuring that only authorized requests can access protected endpoints.
            app.UseAuthorization();

            // Enable the CORS policy defined earlier to allow cross-origin requests.
            app.UseCors("AllowAllOrigins");

            // Map controllers to their respective routes so that API endpoints can be accessed.
            app.MapControllers();

            // Start the application.
            app.Run();
        }
    }
}
