using Feedback_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback_Service.Data
{
    // Database context class for the Feedback Service, handling database access and configuration for the Review entity.
    public class ReviewDBContext : DbContext
    {
        // Constructor for injecting database context options, used to configure the DbContext.
        public ReviewDBContext(DbContextOptions<ReviewDBContext> options) : base(options)
        {
        }

        // DbSet representing the Reviews table in the database, allowing CRUD operations on Review entities.
        public DbSet<Review> Reviews { get; set; }
    }
}
