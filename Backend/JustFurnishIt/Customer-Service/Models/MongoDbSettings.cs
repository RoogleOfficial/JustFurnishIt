namespace Customer_Service.Models
{
    // Model class to store MongoDB configuration settings.
    public class MongoDbSettings
    {
        // The connection string for connecting to MongoDB.
        public string ConnectionString { get; set; }

        // The name of the MongoDB database to be accessed.
        public string DatabaseName { get; set; }
    }
}
