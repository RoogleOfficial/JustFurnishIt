using System.Collections.Generic;
using Designer_Service.Model;
using Microsoft.EntityFrameworkCore;

namespace Designer_Service.DataAccess
{
    public class DesignerDbContext : DbContext
    {
        // Constructor to initialize the DbContext with options
        public DesignerDbContext(DbContextOptions<DesignerDbContext> options) : base(options) { }

        // DbSet representing the Designers table in the database
        public DbSet<Designer> Designers { get; set; }
    }
}
