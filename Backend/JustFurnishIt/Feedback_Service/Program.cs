using Feedback_Service.Repository;
using Feedback_Service.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure services to be added to the dependency injection container.

            // Add database context with SQL Server configuration.
            builder.Services.AddDbContext<ReviewDBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("ReviewDBConnection")));

            // Register the ReviewRepository for dependency injection using the IReviewRepository interface.
            builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

            // Add controller support for MVC-based routing.
            builder.Services.AddControllers();

            // Configure CORS (Cross-Origin Resource Sharing) policy to allow requests from specific origins.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder => builder
                        .WithOrigins("http://localhost:5173") // Replace with your frontend URL if different.
                        .AllowAnyMethod()    // Allows any HTTP method (GET, POST, etc.).
                        .AllowAnyHeader()    // Allows any HTTP headers.
                        .AllowCredentials()); // Allows credentials such as cookies or authentication headers.
            });

            // Configure Swagger/OpenAPI for API documentation generation.
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline, including middleware and routing.

            // Enable Swagger and Swagger UI only in development environment for API documentation.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Redirect HTTP requests to HTTPS.
            app.UseHttpsRedirection();

            // Use Authorization middleware to protect endpoints.
            app.UseAuthorization();

            // Enable the configured CORS policy.
            app.UseCors("AllowAllOrigins");

            // Map controller endpoints to handle incoming requests.
            app.MapControllers();

            // Run the application.
            app.Run();
        }
    }
}
