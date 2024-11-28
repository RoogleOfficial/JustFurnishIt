namespace Booking_Service.DTO
{
    public class BookingDTO
    {
        public int BookingId { get; set; } // Unique identifier for each booking
        public int CustomerId { get; set; } // ID of the customer who made the booking
        public int DesignerId { get; set; } // ID of the designer assigned to the booking
        public int DesignId { get; set; } // ID of the design associated with the booking
        public string DesignName { get; set; } // Name of the design chosen by the customer
        public DateTime BookingDate { get; set; } // Date when the booking was created
        public DateTime AppointmentDate { get; set; } // Scheduled date for the appointment with the designer
        public string Notes { get; set; } // Additional notes provided by the customer for the designer
        public string CustomerEmail { get; set; } // Email address of the customer

        public Boolean? IsCompleted { get; set; } // Status indicating whether the booking is completed (true/false)
        public string CustomerName { get; set; } // Full name of the customer

    }

}
