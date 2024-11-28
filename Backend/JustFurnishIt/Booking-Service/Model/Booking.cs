using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Emit;
using System.ComponentModel;

namespace Booking_Service.Model
{
    public class Booking
    {

        [Key]
        public int BookingId { get; set; } // Unique identifier for each booking

        public int CustomerId { get; set; } // Reference to the Customer entity

        public int DesignerId { get; set; } // Reference to the Designer entity

        public int DesignId { get; set; } // Reference to the Design entity that the customer liked

        public DateTime BookingDate { get; set; } // Date when the booking was made

        public DateTime AppointmentDate { get; set; } // Date of the scheduled appointment

        public string Notes { get; set; } // Optional notes provided by the customer

        [DefaultValue(false)]
        public bool IsCompleted { get; set; }  // Indicates whether the booking consultation is completed by the designer

      
    }
}
