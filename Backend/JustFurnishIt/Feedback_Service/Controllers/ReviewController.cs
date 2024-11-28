using Feedback_Service.Models;
using Feedback_Service.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Feedback_Service.Controllers
{
    // API Controller for handling review-related HTTP requests.
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        // Repository for handling review data operations.
        private readonly IReviewRepository _reviewRepository;

        // Constructor to inject the review repository dependency.
        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        // POST: api/Review
        // Endpoint for adding a new review. Accepts a Review object in the request body.
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] Review review)
        {
            if (review == null)
            {
                return BadRequest("Review is null."); // Returns a 400 response if the review is null.
            }

            try
            {
                await _reviewRepository.AddReviewAsync(review); // Calls repository to add the review.
                return Ok("Review added successfully."); // Returns a success message if review is added.
            }
            catch (Exception ex)
            {
                // Returns a 500 response if an exception occurs.
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Review/designer/{designerId}
        // Endpoint for retrieving reviews by designerId.
        [HttpGet("designer/{designerId}")]
        public async Task<IActionResult> GetReviewsByDesignerId(int designerId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByDesignerIdAsync(designerId); // Fetches reviews by designerId.
                return Ok(reviews); // Returns the reviews as a 200 response.
            }
            catch (Exception ex)
            {
                // Returns a 500 response if an exception occurs.
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Review/design/{designId}
        // Endpoint for retrieving reviews by designId.
        [HttpGet("design/{designId}")]
        public async Task<IActionResult> GetReviewsByDesignId(int designId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByDesignIdAsync(designId); // Fetches reviews by designId.
                return Ok(reviews); // Returns the reviews as a 200 response.
            }
            catch (Exception ex)
            {
                // Returns a 500 response if an exception occurs.
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Review/user/{userId}
        // Endpoint for retrieving reviews by userId.
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReviewsByUserId(int userId)
        {
            try
            {
                var reviews = await _reviewRepository.GetReviewsByUserIdAsync(userId); // Fetches reviews by userId.
                return Ok(reviews); // Returns the reviews as a 200 response.
            }
            catch (Exception ex)
            {
                // Returns a 500 response if an exception occurs.
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
