using Design_Services.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Design_Services.Data
{
    public class DesignDBContext : DbContext
    {
        // Constructor that takes DbContextOptions for configuration and passes them to the base DbContext.
        public DesignDBContext(DbContextOptions<DesignDBContext> options) : base(options)
        {
        }

        // DbSet property representing the collection of Design entities in the database.
        public DbSet<Design> Designs { get; set; }
    }
}
