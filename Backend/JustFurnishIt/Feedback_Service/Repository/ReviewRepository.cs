using Feedback_Service.Data;
using Feedback_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback_Service.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ReviewDBContext _context;

        public ReviewRepository(ReviewDBContext context)
        {
            _context = context;
        }

        public async Task AddReviewAsync(Review review)
        {
            try
            {
                _context.Reviews.Add(review);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new ReviewRepositoryException("An error occurred while adding a new review.", ex);
            }
        }

        public async Task<IEnumerable<Review>> GetReviewsByDesignerIdAsync(int designerId)
        {
            try
            {
                return await _context.Reviews
                    .Where(r => r.DesignerId == designerId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ReviewRepositoryException($"An error occurred while retrieving reviews for designer with ID {designerId}.", ex);
            }
        }

        public async Task<IEnumerable<Review>> GetReviewsByDesignIdAsync(int designId)
        {
            try
            {
                return await _context.Reviews
                    .Where(r => r.DesignId == designId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ReviewRepositoryException($"An error occurred while retrieving reviews for design with ID {designId}.", ex);
            }
        }

        public async Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId)
        {
            try
            {
                return await _context.Reviews
                    .Where(r => r.UserId == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ReviewRepositoryException($"An error occurred while retrieving reviews for user with ID {userId}.", ex);
            }
        }
    }
}
