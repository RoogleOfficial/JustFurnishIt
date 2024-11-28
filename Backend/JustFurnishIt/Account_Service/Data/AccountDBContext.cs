using Account_Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Account_Service.Data
{
    // Defines the database context for the account service, integrating ASP.NET Identity with custom models.
    public class AccountDBContext:IdentityDbContext<ApplicationUser>
    {
        // Constructor for configuring the database context with options, passed down to the base IdentityDbContext.
        public AccountDBContext(DbContextOptions<AccountDBContext> options): base(options)
        {
        }
        // Represents the "users" table in the database, using the custom User model.
        public DbSet<User> users { get; set; }
        // Configures entity properties using the Fluent API.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configures the DateOfBirth property in the User entity to store dates only (no time).
            modelBuilder.Entity<User>()
                .Property(u => u.DateOfBirth)
                .HasColumnType("date");
            // Calls the base method to include ASP.NET Identity configurations.
            base.OnModelCreating(modelBuilder);
        }
    }
}
