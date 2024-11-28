using MongoDB.Bson; 
using MongoDB.Bson.Serialization.Attributes; 

namespace QuoteServices.Models
{
    public class Quote
    {
        [BsonId] // Specifies this property as the document's unique identifier in MongoDB
        [BsonRepresentation(BsonType.ObjectId)] // Represents the Id as an ObjectId in MongoDB
        public string Id { get; set; } // MongoDB ObjectId (_id)

        public string DesignId { get; set; } // Field for associated DesignId, linking the quote to a design

        public Package Basic { get; set; } // Basic package details
        public Package Intermediate { get; set; } // Intermediate package details
        public Package Premium { get; set; } // Premium package details
    }

    public class Package
    {
        public int New { get; set; } // Cost or details for new installations
        public int Renew { get; set; } // Cost or details for renewals or updates

        public string Modular { get; set; } // Details or options for modular furniture
        public string Furniture { get; set; } // Details or options for other furniture
        public string Services { get; set; } // Additional services included in the package
    }
}
