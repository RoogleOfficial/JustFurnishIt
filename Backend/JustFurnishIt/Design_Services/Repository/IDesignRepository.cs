using Design_Services.DTO;
using Design_Services.Models;

namespace Design_Services.Repository
{
    public interface IDesignRepository
    {
        Task<IEnumerable<DesignDTO1>> GetAllAsync(); // Retrieves all designs in the repository as a collection of DesignDTO1 objects.

        Task<DesignDTO1> GetByIdAsync(int id); // Retrieves a specific design by its ID.

        Task AddAsync(Design newdesign); // Adds a new design to the repository.

        Task UpdateAsync(UpdatedDesignDTO newdesign); // Updates an existing design in the repository with data from UpdatedDesignDTO.

        Task DeleteAsync(int id); // Deletes a design from the repository by its ID.

        Task<IEnumerable<Design>> GetByCategoryAsync(int categoryId); // Retrieves designs filtered by a specific category ID.

        Task<IEnumerable<DesignDTO1>> GetDesignsByDesignerIdAsync(int designerId); // Retrieves all designs created by a specific designer using their ID.
    }
}
