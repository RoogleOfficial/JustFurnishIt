using QuoteServices.Models; 

namespace QuoteServices.Repositories
{
    public interface IQuoteRepository
    {
        // Retrieves all quotes from the database
        Task<IEnumerable<Quote>> GetAllQuotesAsync();

        // Retrieves a single quote by its unique MongoDB identifier
        Task<Quote> GetQuoteByIdAsync(string id);

        // Retrieves a single quote by its associated DesignId
        Task<Quote> GetQuoteByDesignIdAsync(string id);

        // Creates a new quote in the database
        Task CreateQuoteAsync(Quote quote);

        // Updates an existing quote in the database by its ID
        Task UpdateQuoteAsync(string id, Quote quote);

        // Deletes a quote from the database by its ID
        Task DeleteQuoteAsync(string id);
    }
}
