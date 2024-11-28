namespace QuoteServices.DTOs
{
    public class QuoteDTO
    {
        public string DesignId { get; set; } // Field for the associated DesignId, linking this quote to a specific design

        public PackageDTO Basic { get; set; } // Details of the basic package for this quote
        public PackageDTO Intermediate { get; set; } // Details of the intermediate package for this quote
        public PackageDTO Premium { get; set; } // Details of the premium package for this quote
    }

    public class PackageDTO
    {
        public int New { get; set; } // Cost or specifications for new installations
        public int Renew { get; set; } // Cost or specifications for renewal services

        public string Modular { get; set; } // Information about modular options or items in the package
        public string Furniture { get; set; } // Information about furniture included in the package
        public string Services { get; set; } // Additional services included in the package
    }
}
