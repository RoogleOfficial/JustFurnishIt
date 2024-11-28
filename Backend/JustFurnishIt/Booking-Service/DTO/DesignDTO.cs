namespace Booking_Service.DTO
{
    public class DesignDTO
    {
        public int DesignId { get; set; }        // The unique identifier of the design
        public string DesignName { get; set; }    // The name of the design
        public string DesignCategory { get; set; } // The category of the design (e.g., "Kitchen", "Bathroom")
        public string Description { get; set; } //Description of design
        public int DesignerId { get; set; }  //DesignerId of design
    } 
}
