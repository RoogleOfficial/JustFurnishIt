using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Customer_Service.Models;
using Customer_Service.DTOs;
using System.Threading.Tasks;
using System;

namespace Customer_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // MongoDB collection for accessing customer data.
        private readonly IMongoCollection<Customer> _customerCollection;

        // Constructor to initialize the MongoDB collection.
        public CustomerController(IMongoDatabase database)
        {
            _customerCollection = database.GetCollection<Customer>("Customers");
        }

        // POST: api/customer
        // Creates a new customer entry in the database.
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreateDTO customerDTO)
        {
            // Validate the input data.
            if (customerDTO == null || customerDTO.UserId <= 0)
            {
                return BadRequest("Invalid UserId or data.");
            }

            try
            {
                // Check if a customer with the given UserId already exists.
                var existingCustomer = await _customerCollection.Find(c => c.UserId == customerDTO.UserId).FirstOrDefaultAsync();
                if (existingCustomer != null)
                {
                    return Conflict($"Customer with UserId {customerDTO.UserId} already exists.");
                }

                // Create a new Customer object and initialize with an empty wishlist.
                var customer = new Customer
                {
                    UserId = customerDTO.UserId,
                    WishList = new List<WishList>() // Start with an empty wishlist.
                };

                // Insert the new customer into the database.
                await _customerCollection.InsertOneAsync(customer);

                // Return a 201 response, including the location of the created customer.
                return CreatedAtAction(nameof(GetCustomerByUserId), new { userId = customer.UserId }, customer);
            }
            catch (MongoException ex)
            {
                // Handle any MongoDB-related errors.
                return StatusCode(500, $"An error occurred while inserting the customer: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle any general errors.
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        // GET: api/customer/{userId}
        // Retrieves a customer's details by their UserId.
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCustomerByUserId(int userId)
        {
            try
            {
                // Find the customer by UserId.
                var customer = await _customerCollection.Find(c => c.UserId == userId).FirstOrDefaultAsync();
                if (customer == null)
                {
                    return NotFound($"Customer with UserId {userId} not found.");
                }

                // Return the customer details.
                return Ok(customer);
            }
            catch (MongoException ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the customer: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        // DELETE: api/customer/{userId}
        // Deletes a customer entry from the database by their UserId.
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteCustomer(int userId)
        {
            try
            {
                // Attempt to delete the customer.
                var result = await _customerCollection.DeleteOneAsync(c => c.UserId == userId);
                if (result.DeletedCount == 0)
                {
                    return NotFound($"Customer with UserId {userId} not found.");
                }

                // Return success message.
                return Ok($"Customer with UserId {userId} deleted successfully.");
            }
            catch (MongoException ex)
            {
                return StatusCode(500, $"An error occurred while deleting the customer: {ex.Message}");
            }
            catch (Exception ex) 
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }
    }
}
