



using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Cors.Infrastructure;
using Customer_Service.Models;
using MongoDB.Driver;

namespace Customer_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.Configure<MongoDbSettings>(
     builder.Configuration.GetSection("MongoDbSettings"));

            builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
                new MongoClient(builder.Configuration.GetValue<string>("MongoDbSettings:ConnectionString")));

            builder.Services.AddScoped(sp =>
                sp.GetRequiredService<IMongoClient>().GetDatabase(builder.Configuration.GetValue<string>("MongoDbSettings:DatabaseName")));
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


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
           




            var app = builder.Build();
         
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors("AllowAllOrigins");



            app.MapControllers();

            app.Run();
        }
    }
}
