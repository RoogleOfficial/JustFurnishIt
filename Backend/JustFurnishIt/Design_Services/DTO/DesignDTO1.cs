namespace Design_Services.DTO
{
    public class DesignDTO1
    {
        public int DesignId { get; set; }
        public string DesignName { get; set; }
        public string? ImageLink { get; set; }
        public string Description { get; set; }
        public decimal PricePerSquareFeet { get; set; }
        public string MaterialsUsed { get; set; }
        public int DesignerId { get; set; }

        // Convert DesignCategory to string
        public string Category { get; set; }

        public string Dimension { get; set; }
        public string Style { get; set; }
        public string Color { get; set; }
        public string SpecialFeatures { get; set; }
    }
}
