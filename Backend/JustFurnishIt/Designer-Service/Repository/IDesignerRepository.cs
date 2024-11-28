using Designer_Service.Model;
namespace Designer_Service.Repository
{
    public interface IDesignerRepository
    {
        // Retrieves a list of all designers
        Task<IEnumerable<Designer>> GetAllDesignersAsync();
        // Fetches user details by user ID from an external service
        Task<UserDto> GetUserDetailsAsync(int userId);
        // Retrieves a designer by their unique ID
        Task<Designer> GetDesignerByIdAsync(int id);
        // Adds a new designer to the database
        Task AddDesignerAsync(Designer designer);
        // Updates the details of an existing designer
        Task UpdateDesignerAsync(Designer designer);
        // Approves a designer by setting their status to Accepted
        Task ApproveDesignerAsync(int id);
        // Deletes a designer by their unique ID
        Task DeleteDesignerAsync(int id);
        // Retrieves the user ID associated with a specific designer ID
        Task<int> GetUserIdByDesignerIdAsync(int designerId);
        // Rejects a designer by setting their status to Rejected
        Task RejectDesignerAsync(int id);
        // Retrieves a designer by the associated user ID
        Task<Designer> GetDesignerIdByUserIdAsync(int userId);
    }
}