namespace QuoteServices.Models
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } // Connection string to connect to MongoDB database
        public string DatabaseName { get; set; } // Name of the MongoDB database to use
    }
}
