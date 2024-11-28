using System.Net.Http;
using Designer_Service.DataAccess;
using Designer_Service.Model;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
namespace Designer_Service.Repository
{
    public class DesignerRepository : IDesignerRepository
    {
        private readonly DesignerDbContext _context;
        private readonly HttpClient _httpClient;
        public DesignerRepository(DesignerDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }
        // Adds a new designer to the database
        public async Task AddDesignerAsync(Designer designer)
        {
            _context.Designers.Add(designer);
            await _context.SaveChangesAsync();
        }
        // Approves a designer by setting the approval status to Accepted
        public async Task ApproveDesignerAsync(int id)
        {
            var designer = await _context.Designers.FindAsync(id);
            if (designer != null)
            {
                designer.IsApproved = ApprovalStatus.Accepted;
                await _context.SaveChangesAsync();
            }
        }
        // Rejects a designer by setting the approval status to Rejected
        public async Task RejectDesignerAsync(int id)
        {
            var designer = await _context.Designers.FindAsync(id);
            if (designer != null)
            {
                designer.IsApproved = ApprovalStatus.Rejected;
                await _context.SaveChangesAsync();
            }
        }
        // Deletes a designer by ID
        public async Task DeleteDesignerAsync(int id)
        {
            var designer = await _context.Designers.FindAsync(id);
            // Throw an exception if designer not found
            if (designer == null)
            {
                throw new KeyNotFoundException("Designer not found.");
            }
            _context.Designers.Remove(designer);
            await _context.SaveChangesAsync();
        }
        // Retrieves all designers from the database
        public async Task<IEnumerable<Designer>> GetAllDesignersAsync()
        {
            return await _context.Designers.ToListAsync();
        }
        // Fetches user details from an external User microservice
        public async Task<UserDto> GetDesignerDetailsAsync()
        {
            var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Account");
            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                return JsonSerializer.Deserialize<UserDto>(responseBody, options);
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {response.StatusCode}, Content: {errorContent}");
            }
            throw new Exception("Failed to fetch user details from User microservice");
        }
        // Retrieves a designer by their unique ID
        public async Task<Designer> GetDesignerByIdAsync(int id)
        {
            return await _context.Designers.FindAsync(id);
        }
        // Fetches user details for a specific user ID from the User microservice
        public async Task<UserDto> GetUserDetailsAsync(int userId)
        {
            var response = await _httpClient.GetAsync($"https://localhost:7000/gateway/Account/{userId}");
            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                return JsonSerializer.Deserialize<UserDto>(responseBody, options);
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error: {response.StatusCode}, Content: {errorContent}");
            }
            throw new Exception("Failed to fetch user details from User microservice");
        }
        // Updates an existing designer's details
        public async Task UpdateDesignerAsync(Designer designer)
        {
            var existingDesigner = await _context.Designers.FindAsync(designer.DesignerId);
            if (existingDesigner != null)
            {
                existingDesigner.UserId = designer.UserId;
                existingDesigner.Specialization = designer.Specialization;
                existingDesigner.ExperienceYears = designer.ExperienceYears;
                existingDesigner.PortfolioUrl = designer.PortfolioUrl;
                existingDesigner.Bio = designer.Bio;
                existingDesigner.IsApproved = designer.IsApproved;
                existingDesigner.Certifications = designer.Certifications;
                // Save updated designer details to the database
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException("Designer not found.");
            }
        }
        // Retrieves the user ID for a given designer ID from the Designer microservice
        public async Task<int> GetUserIdByDesignerIdAsync(int designerId)
        {
            var designer = await _context.Designers
            .Where(d => d.DesignerId == designerId)
            .Select(d => new { d.UserId })
            .FirstOrDefaultAsync();

            if (designer == null)
            {
                throw new Exception("Designer not found.");
            }

            if (designer.UserId == 0)
            {
                throw new Exception("User ID not found for the given designer.");
            }

            return designer.UserId;
        }
        // Retrieves a designer by user ID
        public async Task<Designer> GetDesignerIdByUserIdAsync(int userId)
        {
            var designer = await _context.Designers
                .Where(d => d.UserId == userId)
                .FirstOrDefaultAsync();
            return designer;
        }
    }
}