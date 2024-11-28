using Microsoft.Extensions.Options; 
using MongoDB.Driver;
using QuoteServices.Models;
using QuoteServices.CustomExceptions;

namespace QuoteServices.Repositories
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly IMongoCollection<Quote> _quotes; // MongoDB collection for Quote documents

        // Constructor to initialize the MongoDB client and collection
        public QuoteRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString); // Creating MongoDB client using connection string
            var database = client.GetDatabase(mongoDbSettings.Value.DatabaseName); // Getting MongoDB database
            _quotes = database.GetCollection<Quote>("Quotes"); // Accessing the "Quotes" collection in the database
        }

        // Retrieves all quotes from the collection
        public async Task<IEnumerable<Quote>> GetAllQuotesAsync()
        {
            return await _quotes.Find(quote => true).ToListAsync(); // Finds all documents and returns as a list
        }

        // Retrieves a quote by its unique ID
        public async Task<Quote> GetQuoteByIdAsync(string id)
        {
            var quote = await _quotes.Find<Quote>(quote => quote.Id == id).FirstOrDefaultAsync();
            if (quote == null)
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found.");
            }
            return quote; // Finds the quote with matching ID
        }

        // Retrieves a quote by its associated DesignId
        public async Task<Quote> GetQuoteByDesignIdAsync(string id)
        {
            var quote = await _quotes.Find<Quote>(quote => quote.DesignId == id).FirstOrDefaultAsync();
            if (quote == null)
            {
                throw new QuoteNotFoundException($"Quote with Design ID '{id}' was not found.");
            }
            return quote; // Finds the quote with matching DesignId
        }

        // Inserts a new quote into the collection
        public async Task CreateQuoteAsync(Quote quote)
        {
            if (quote == null)
            {
                throw new InvalidQuoteDataException("Quote data is invalid or missing.");
            }

            await _quotes.InsertOneAsync(quote);// Inserts a single document into the collection
        }

        // Updates an existing quote by its ID
        public async Task UpdateQuoteAsync(string id, Quote quote)
        {
            if (quote == null || id != quote.Id)
            {
                throw new InvalidQuoteDataException("Quote data is invalid or does not match the provided ID.");
            }

            var result = await _quotes.ReplaceOneAsync(quote => quote.Id == id, quote);
            if (result.MatchedCount == 0)
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found and could not be updated.");
            } // Replaces document with matching ID with the updated quote
        }

        // Deletes a quote by its ID
        public async Task DeleteQuoteAsync(string id)
        {
            var result = await _quotes.DeleteOneAsync(quote => quote.Id == id);
            if (result.DeletedCount == 0)
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found and could not be deleted.");
            }
        }
    }
}
