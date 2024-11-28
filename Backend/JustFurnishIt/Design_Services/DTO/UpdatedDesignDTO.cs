using Design_Services.Models;
using System.ComponentModel.DataAnnotations;

namespace Design_Services.DTO
{
    public class UpdatedDesignDTO
    {
     
        public int DesignId { get; set; } // Unique identifier for each design.

        public string DesignName { get; set; } // Name of the design.

        public string ImageLink { get; set; } // URL to access the design image.

        public string Description { get; set; } // Detailed description of the design.

        public decimal PricePerSquareFeet { get; set; } // Price or estimated cost per square feet.

        public int DesignerId { get; set; } // The ID of the designer who created this design.

        public string MaterialsUsed { get; set; }

        public DesignCategory Category { get; set; } // Enum category of the design.

        public string Dimension { get; set; }

        public string Style { get; set; }

        public string Color { get; set; }

        public string SpecialFeatures { get; set; }
    }
}
