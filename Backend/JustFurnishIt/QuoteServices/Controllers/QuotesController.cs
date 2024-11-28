using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc;
using QuoteServices.CustomExceptions;
using QuoteServices.DTOs; 
using QuoteServices.Models; 
using QuoteServices.Repositories; 
using System.Collections.Generic; 

namespace QuoteServices.Controllers
{
    [Route("api/[controller]")] // Setting the base route for this controller
    [ApiController] // Specifying that this is an API controller
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteRepository _quoteRepository; // Repository for quote operations

        // Constructor for injecting the quote repository
        public QuotesController(IQuoteRepository quoteRepository)
        {
            _quoteRepository = quoteRepository; // Initializing the injected repository
        }

        // GET: api/quotes
        [HttpGet] // Route for getting all quotes
        public async Task<ActionResult<IEnumerable<QuoteDTO>>> GetAllQuotes()
        {
            var quotes = await _quoteRepository.GetAllQuotesAsync(); // Fetching all quotes
            return Ok(quotes); // Returning list of quotes in response
        }

        // GET: api/quotes/{id}
        [HttpGet("{id}")] // Route for getting a single quote by ID
        public async Task<ActionResult<QuoteDTO>> GetQuoteById(string id)
        {
            var quote = await _quoteRepository.GetQuoteByIdAsync(id); // Fetching quote by ID

            if (quote == null) // Checking if quote exists
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found."); // Return 404 if not found
            }

            return Ok(quote); // Return the quote in response
        }

        // GET: api/quotes/byDesignId/{id}
        [HttpGet("byDesignId/{id}")] // Route for getting a quote by DesignId
        public async Task<ActionResult<QuoteDTO>> GetQuoteByDesignId(string id)
        {
            var quote = await _quoteRepository.GetQuoteByDesignIdAsync(id); // Fetching quote by DesignId

            if (quote == null) // Checking if quote exists
            {
                throw new QuoteNotFoundException($"Quote with Design ID '{id}' was not found.");// Return 404 if not found
            }

            return Ok(quote); // Return the quote in response
        }

        // POST: api/quotes
        [HttpPost] // Route for creating a new quote
        public async Task<ActionResult<QuoteDTO>> CreateQuote(QuoteDTO quoteDto)
        {
            if (quoteDto == null)
            {
                throw new InvalidQuoteDataException("Quote data is invalid.");
            }
            // Mapping QuoteDTO to Quote model for storage
            var quote = new Quote
            {
                DesignId = quoteDto.DesignId, // Setting DesignId

                // Mapping basic package details
                Basic = new Package
                {
                    New = quoteDto.Basic.New,
                    Renew = quoteDto.Basic.Renew,
                    Modular = quoteDto.Basic.Modular,
                    Furniture = quoteDto.Basic.Furniture,
                    Services = quoteDto.Basic.Services
                },
                // Mapping intermediate package details
                Intermediate = new Package
                {
                    New = quoteDto.Intermediate.New,
                    Renew = quoteDto.Intermediate.Renew,
                    Modular = quoteDto.Intermediate.Modular,
                    Furniture = quoteDto.Intermediate.Furniture,
                    Services = quoteDto.Intermediate.Services
                },
                // Mapping premium package details
                Premium = new Package
                {
                    New = quoteDto.Premium.New,
                    Renew = quoteDto.Premium.Renew,
                    Modular = quoteDto.Premium.Modular,
                    Furniture = quoteDto.Premium.Furniture,
                    Services = quoteDto.Premium.Services
                }
            };

            await _quoteRepository.CreateQuoteAsync(quote); // Adding quote to the database
            return CreatedAtAction(nameof(GetQuoteById), new { id = quote.Id }, quote); // Returning created quote with its ID
        }

        // PUT: api/quotes/{id}
        [HttpPut("{id}")] // Route for updating an existing quote by ID
        public async Task<IActionResult> UpdateQuote(string id, QuoteDTO quoteDto)
        {
            var existingQuote = await _quoteRepository.GetQuoteByIdAsync(id); // Fetching existing quote by ID

            if (existingQuote == null) // Checking if quote exists
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found.");// Return 404 if not found
            }

            // Updating existing quote properties with new values
            existingQuote.DesignId = quoteDto.DesignId; // Updating DesignId

            existingQuote.Basic = new Package
            {
                New = quoteDto.Basic.New,
                Renew = quoteDto.Basic.Renew,
                Modular = quoteDto.Basic.Modular,
                Furniture = quoteDto.Basic.Furniture,
                Services = quoteDto.Basic.Services
            };
            existingQuote.Intermediate = new Package
            {
                New = quoteDto.Intermediate.New,
                Renew = quoteDto.Intermediate.Renew,
                Modular = quoteDto.Intermediate.Modular,
                Furniture = quoteDto.Intermediate.Furniture,
                Services = quoteDto.Intermediate.Services
            };
            existingQuote.Premium = new Package
            {
                New = quoteDto.Premium.New,
                Renew = quoteDto.Premium.Renew,
                Modular = quoteDto.Premium.Modular,
                Furniture = quoteDto.Premium.Furniture,
                Services = quoteDto.Premium.Services
            };

            await _quoteRepository.UpdateQuoteAsync(id, existingQuote); // Updating quote in the database
            return NoContent(); // Return 204 No Content to indicate successful update
        }

        // DELETE: api/quotes/{id}
        [HttpDelete("{id}")] // Route for deleting a quote by ID
        public async Task<IActionResult> DeleteQuote(string id)
        {
            var quote = await _quoteRepository.GetQuoteByIdAsync(id); // Fetching quote by ID

            if (quote == null) // Checking if quote exists
            {
                throw new QuoteNotFoundException($"Quote with ID '{id}' was not found."); // Return 404 if not found
            }

            await _quoteRepository.DeleteQuoteAsync(id); // Deleting quote from the database
            return NoContent(); // Return 204 No Content to indicate successful deletion
        }
    }
}
