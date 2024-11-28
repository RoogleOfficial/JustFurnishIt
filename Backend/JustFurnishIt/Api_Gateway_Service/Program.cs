
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Api_Gateway_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load API Gateway configuration from a JSON file (ApiGatewayConfig.json)
            // This file defines the routing between upstream (clients) and downstream (microservices)
            builder.Configuration.
                SetBasePath(builder.Environment.ContentRootPath)// Setting the base path for configuration
                .AddJsonFile("ApiGatewayConfig.json", false, reloadOnChange: true);// Load the configuration file and allow automatic reload if changes occur.

            // Add authorization service, enabling authentication and access control.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add Ocelot services to handle gateway routing and middleware.
            builder.Services.AddOcelot();

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

            // Build the application (middleware pipeline setup).
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            // Enable authorization middleware to ensure that protected routes are secured and require proper access.
            app.UseAuthorization();

            // Enable the CORS policy defined earlier to allow cross-origin requests.
            app.UseCors("AllowAllOrigins");

            // Use Ocelot middleware for routing requests to downstream services based on the configuration in ApiGatewayConfig.json.
            app.UseOcelot().Wait();// The Wait() ensures Ocelot completes its setup asynchronously before proceeding.
            
            app.MapControllers();

            // Define a simple "Hello" endpoint for testing the gateway (useful for confirming the API Gateway is running).
            app.MapGet("/Hello", () => "welcome to gateway");

            // Start the application and listen for incoming requests.
            app.Run();
        }
    }
}
