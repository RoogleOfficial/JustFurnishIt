using Feedback_Service.Models;
using System.Threading.Tasks;

namespace Feedback_Service.Repository
{
    public interface IReviewRepository
    {
        Task AddReviewAsync(Review review);
        Task<IEnumerable<Review>> GetReviewsByUserIdAsync(int userId); 
        Task<IEnumerable<Review>> GetReviewsByDesignerIdAsync(int designerId); 

        Task<IEnumerable<Review>> GetReviewsByDesignIdAsync(int designId);
    }
}
