using System.ComponentModel.DataAnnotations;

namespace Design_Services.Models
{
    public class Design
    {
        [Key]
        public int DesignId { get; set; } // Unique identifier for each design. Changed to string to allow more flexible ID formats.

        [Required]
        public string DesignName { get; set; } // Name of the design, required field to ensure every design has a name.

        [Required]
        public string ImageLink { get; set; } // URL to access the design image. This is essential for displaying the design to users.

        [MaxLength(1000)]
        public string Description { get; set; } // Detailed description of the design. Limited to 1000 characters.

        [Required]
        public decimal PricePerSquareFeet { get; set; } // Price of the design or estimated cost. Required to provide cost information for each design.

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow; // Date when the design was created. Defaults to the current UTC time.

        [Required]
        public int DesignerId { get; set; } // ID to track the designer who created the design. Links to the designer in the system.

        public string MaterialsUsed { get; set; }

        [Required]
        public DesignCategory Category { get; set; } // Category of the design. Uses the DesignCategory enum to specify the type.

        [MaxLength(50)]
        public string Dimension { get; set; } // Dimensions of the design (e.g., 10x10 ft). Limited to 50 characters for brevity.

  
        public string Style { get; set; } // Style of the design (e.g., Modern, Classic). Limited to 50 characters to keep it concise.

  
        public string Color { get; set; } // Primary color of the design. Limited to 50 characters.

        
        public string SpecialFeatures { get; set; } // Special features of the design. Limited to 200 characters to provide extra details if needed.
    }
}
