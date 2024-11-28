using System.Collections.Generic;
using Booking_Service.Model;
using Microsoft.EntityFrameworkCore;

namespace Booking_Service.DataAccess
{
    public class BookingDbContext:DbContext
    {
        public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options) { }

        public DbSet<Booking> Bookings { get; set; }
      
    }
}
