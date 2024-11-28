using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
namespace Customer_Service.Models
{
    public class Customer
    {
        [BsonId] // Maps this to the MongoDB _id field
        [BsonRepresentation(BsonType.ObjectId)] // Ensures it's treated as an ObjectId in MongoDB
        public string Id { get; set; } // MongoDB document ID
        [BsonElement("userId")]
        public int UserId { get; set; } // ID of the user (no longer customerId)
        [BsonElement("wishList")]
        public List<WishList> WishList { get; set; } = new List<WishList>(); // List of wishlist items
    }
    public class WishList
    {
        [BsonId] // Marks this field as the unique identifier for the wishlist item
        [BsonRepresentation(BsonType.ObjectId)] // Ensures it's treated as an ObjectId in MongoDB
        public string WishListId { get; set; } // ID of the wishlist item
        [BsonElement("userId")]
        public int UserId { get; set; } // ID of the user associated with this wishlist item
        [BsonElement("designId")]
        public int DesignId { get; set; } // ID of the design the user added to their wishlist
    }
}









