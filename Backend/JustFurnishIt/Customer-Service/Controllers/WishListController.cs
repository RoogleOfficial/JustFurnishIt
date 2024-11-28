using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Customer_Service.Models;
using Customer_Service.DTOs;
using System.Threading.Tasks;
using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace Customer_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        // MongoDB collection for accessing customer data.
        private readonly IMongoCollection<Customer> _customerCollection;

        // Constructor that initializes the MongoDB collection.
        public WishListController(IMongoDatabase database)
        {
            _customerCollection = database.GetCollection<Customer>("Customers");
        }

        // POST: api/wishlist
        // Adds a new item to the wishlist of a specific customer.
        [HttpPost]
        public async Task<IActionResult> AddToWishList([FromBody] WishListCreateDTO wishListDTO)
        {
            if (wishListDTO == null || wishListDTO.UserId <= 0 || wishListDTO.DesignId <= 0)
            {
                return BadRequest("Invalid UserId or DesignId.");
            }

            try
            {
                // Find the customer by UserId.
                var customer = await _customerCollection.Find(c => c.UserId == wishListDTO.UserId).FirstOrDefaultAsync();
                if (customer == null)
                {
                    return NotFound($"Customer with UserId {wishListDTO.UserId} not found.");
                }

                // Create a new wishlist item.
                var newWishListItem = new WishList
                {
                    WishListId = ObjectId.GenerateNewId().ToString(), // Generate a unique ID for the wishlist item.
                    UserId = wishListDTO.UserId,
                    DesignId = wishListDTO.DesignId
                };

                // Add the new wishlist item to the customer's wishlist.
                customer.WishList.Add(newWishListItem);

                // Update the customer's wishlist in MongoDB.
                var updateDefinition = Builders<Customer>.Update.Set(c => c.WishList, customer.WishList);
                await _customerCollection.UpdateOneAsync(c => c.UserId == wishListDTO.UserId, updateDefinition);

                return Ok("Wishlist item added successfully.");
            }
            catch (MongoException ex)
            {
                return StatusCode(500, $"An error occurred while adding the item to the wishlist: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        // DELETE: api/wishlist/{userId}/{wishListId}
        // Removes an item from the wishlist of a specific customer.
        [HttpDelete("{userId}/{wishListId}")]
        public async Task<IActionResult> RemoveFromWishList(int userId, string wishListId)
        {
            if (userId <= 0 || string.IsNullOrWhiteSpace(wishListId))
            {
                return BadRequest("Invalid UserId or WishListId.");
            }

            try
            {
                // Find the customer by UserId.
                var customer = await _customerCollection.Find(c => c.UserId == userId).FirstOrDefaultAsync();
                if (customer == null)
                {
                    return NotFound($"Customer with UserId {userId} not found.");
                }

                // Find the wishlist item within the customer's wishlist.
                var wishListItem = customer.WishList.Find(w => w.WishListId == wishListId);
                if (wishListItem == null)
                {
                    return NotFound($"WishList item with ID {wishListId} not found.");
                }

                // Remove the item from the customer's wishlist.
                customer.WishList.Remove(wishListItem);

                // Update the customer's wishlist in MongoDB.
                var updateDefinition = Builders<Customer>.Update.Set(c => c.WishList, customer.WishList);
                await _customerCollection.UpdateOneAsync(c => c.UserId == userId, updateDefinition);

                return Ok($"WishList item with ID {wishListId} removed successfully.");
            }
            catch (MongoException ex)
            {
                return StatusCode(500, $"An error occurred while removing the item from the wishlist: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }

        // GET: api/wishlist/{userId}
        // Retrieves the wishlist for a specific customer by their UserId.
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetWishListByUserId(int userId)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid UserId.");
            }

            try
            {
                // Find the customer by UserId.
                var customer = await _customerCollection.Find(c => c.UserId == userId).FirstOrDefaultAsync();
                if (customer == null)
                {
                    return NotFound($"Customer with UserId {userId} not found.");
                }

                // Return the customer's wishlist.
                return Ok(customer.WishList);
            }
            catch (MongoException ex)
            {
                return StatusCode(500, $"An error occurred while retrieving the wishlist: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }
    }
}
