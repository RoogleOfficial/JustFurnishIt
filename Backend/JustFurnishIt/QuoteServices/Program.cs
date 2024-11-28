
using QuoteServices.Models;
using QuoteServices.Repositories;

namespace QuoteServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<MongoDbSettings>(
  builder.Configuration.GetSection(nameof(MongoDbSettings)));

            // Register the QuoteRepository as a singleton service
            builder.Services.AddSingleton<IQuoteRepository, QuoteRepository>();


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
