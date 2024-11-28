using Designer_Service.Model; 
using Designer_Service.Repository; 
using Microsoft.AspNetCore.Http; 
using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore; 
namespace Designer_Service.Controllers
{
    [Route("api/[controller]")] // Setting the base route for this controller
    [ApiController] // Specifying that this is an API controller
    public class DesignerController : ControllerBase
    {
        private readonly IDesignerRepository _designerRepository; // Repository for designer operations

        // Constructor for injecting the designer repository
        public DesignerController(IDesignerRepository designerRepository)
        {
            _designerRepository = designerRepository; // Initializing the injected repository
        }

        // GET: api/designer/designer-details
        [HttpGet("designer-details")] // Setting route for getting all designer details
        public async Task<ActionResult> GetAllDesignerDetails()
        {
            var designers = await _designerRepository.GetAllDesignersAsync(); // Fetching all designers

            if (designers == null || !designers.Any()) // Checking if any designers were found
            {
                return NotFound(new { message = "No designers found" }); // Return 404 if none found
            }

            try
            {
                var designerDetailsList = new List<object>(); // Initialize list to hold detailed designer info

                // Loop through each designer to fetch related user details
                foreach (var designer in designers)
                {
                    UserDto userDetails = null; // Initialize variable to hold user details
                    try
                    {
                        userDetails = await _designerRepository.GetUserDetailsAsync(designer.UserId); // Fetch user details by userId
                    }
                    catch (Exception ex) // Catch any exceptions during user detail fetch
                    {
                        Console.WriteLine($"Error fetching user details for UserId {designer.UserId}: {ex.Message}"); // Log error
                        continue; // Skip to the next designer if error occurs
                    }

                    if (userDetails == null) continue; // Skip if user details are not found

                    // Add designer and user details to the response list
                    designerDetailsList.Add(new
                    {
                        DesignerId = designer.DesignerId,
                        UserId = designer.UserId,
                        FirstName = userDetails.FirstName,
                        LastName = userDetails.LastName,
                        Email = userDetails.Email,
                        Specialization = designer.Specialization,
                        ExperienceYears = designer.ExperienceYears,
                        PortfolioUrl = designer.PortfolioUrl,
                        Bio = designer.Bio,
                        Certifications = designer.Certifications,
                        IsApproved = designer.IsApproved
                    });
                }

                return Ok(designerDetailsList); // Return the list of designer details
            }
            catch (Exception ex) // Catch any exceptions during processing
            {
                return StatusCode(500, new { message = "Failed to retrieve designer details", error = ex.Message }); // Return 500 status on error
            }
        }

        // GET: api/designer
        [HttpGet] // Route to get all designers
        public async Task<ActionResult<IEnumerable<Designer>>> GetAllDesigners()
        {
            var designers = await _designerRepository.GetAllDesignersAsync(); // Fetch all designers
            return Ok(designers); // Return list of designers
        }

        // GET: api/designer/{id}
        [HttpGet("{id}")] // Route to get a designer by ID
        public async Task<ActionResult<Designer>> GetDesignerById(int id)
        {
            var designer = await _designerRepository.GetDesignerByIdAsync(id); // Fetch designer by ID

            if (designer == null) // Check if designer exists
            {
                return NotFound(new { message = "Designer not found" }); // Return 404 if not found
            }

            return Ok(designer); // Return the designer
        }

        // POST: api/designer/CreateDesigner
        [HttpPost("CreateDesigner")] // Route to create a new designer
        public async Task<ActionResult> CreateDesigner([FromBody] CreateDTO createDTO)
        {
            if (createDTO.UserId <= 0) // Validate the user ID
            {
                return BadRequest(new { message = "Invalid user ID" }); // Return 400 if invalid
            }

            // Create a new Designer object with default values
            var newDesigner = new Designer
            {
                UserId = createDTO.UserId,
                Specialization = string.Empty,
                ExperienceYears = 0,
                PortfolioUrl = string.Empty,
                Bio = string.Empty,
                IsApproved = ApprovalStatus.Pending,
                Certifications = string.Empty
            };

            try
            {
                await _designerRepository.AddDesignerAsync(newDesigner); // Add designer to the database

                return CreatedAtAction(nameof(GetDesignerById), new { id = newDesigner.DesignerId }, newDesigner); // Return the created designer
            }
            catch (Exception ex) // Catch any exceptions
            {
                return StatusCode(500, new { message = $"An error occurred while creating the designer: {ex.Message}" }); // Return 500 status on error
            }
        }

        // POST: api/designer
        [HttpPost] // Route to add a designer
        public async Task<ActionResult> AddDesigner([FromBody] Designer designer)
        {
            if (designer == null) // Validate designer data
            {
                return BadRequest(new { message = "Invalid designer data" }); // Return 400 if invalid
            }

            await _designerRepository.AddDesignerAsync(designer); // Add designer to the repository
            return CreatedAtAction(nameof(GetDesignerById), new { id = designer.DesignerId }, designer); // Return the created designer
        }

        // DELETE: api/designer/{id}
        [HttpDelete("{id}")] // Route to delete a designer by ID
        public async Task<ActionResult> DeleteDesigner(int id)
        {
            try
            {
                await _designerRepository.DeleteDesignerAsync(id); // Delete the designer by ID
                return NoContent(); // Return 204 No Content on success
            }
            catch (KeyNotFoundException) // Catch exception if designer not found
            {
                return NotFound(new { message = "Designer not found" }); // Return 404 if designer not found
            }
        }

        // PUT: api/designer/{designerId}
        [HttpPut("{designerId}")] // Route to update a designer by ID
        public async Task<IActionResult> UpdateDesigner(int designerId, [FromBody] Designer updatedDesigner)
        {
            if (updatedDesigner == null || updatedDesigner.DesignerId != designerId) // Validate designer ID and data
            {
                return BadRequest("Designer information is invalid or ID mismatch."); // Return 400 if invalid
            }

            try
            {
                var existingDesigner = await _designerRepository.GetDesignerByIdAsync(designerId); // Fetch the existing designer

                if (existingDesigner == null) // Check if designer exists
                {
                    return NotFound(new { message = "Designer not found" }); // Return 404 if not found
                }

                await _designerRepository.UpdateDesignerAsync(updatedDesigner); // Update the designer

                return Ok(new { message = "Designer updated successfully" }); // Return success message
            }
            catch (Exception ex) // Catch any exceptions
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 status on error
            }
        }

        // PUT: api/designer/approve/{id}
        [HttpPut("approve/{id}")] // Route to approve a designer
        public async Task<ActionResult> ApproveDesigner(int id)
        {
            var designer = await _designerRepository.GetDesignerByIdAsync(id); // Fetch the designer by ID

            if (designer == null) // Check if designer exists
            {
                return NotFound(new { message = "Designer not found" }); // Return 404 if not found
            }

            await _designerRepository.ApproveDesignerAsync(id); // Approve the designer
            return Ok(new { message = "Designer approved successfully" }); // Return success message
        }

        // PUT: api/designer/reject/{id}
        [HttpPut("reject/{id}")] // Route to reject a designer
        public async Task<IActionResult> RejectDesigner(int id)
        {
            try
            {
                await _designerRepository.RejectDesignerAsync(id); // Reject the designer by ID
                return Ok(new { message = "Designer rejected successfully." }); // Return success message
            }
            catch (Exception ex) // Catch any exceptions
            {
                return StatusCode(500, new { message = ex.Message }); // Return 500 status on error
            }
        }

        // GET: api/designer/designer-detail/{designerId}
        [HttpGet("designer-detail/{designerId}")] // Route to get user ID by designer ID
        public async Task<IActionResult> GetUserIdByDesignerId(int designerId)
        {
            try
            {
                var userId = await _designerRepository.GetUserIdByDesignerIdAsync(designerId); // Fetch user ID by designer ID

                if (userId == 0) // Check if user ID is valid
                {
                    return NotFound(new { message = $"User ID not found for designer ID {designerId}" }); // Return 404 if not found
                }

                return Ok(new { DesignerId = designerId, UserId = userId }); // Return designer and user ID
            }
            catch (Exception ex) // Catch any exceptions
            {
                Console.WriteLine($"Error fetching User ID for designer: {ex.Message}"); // Log error
                return StatusCode(500, new { message = "An error occurred while fetching the User ID", error = ex.Message }); // Return 500 status on error
            }
        }

        // GET: api/designer/getDesignerIdByUserId/{userId}
        [HttpGet("getDesignerIdByUserId/{userId}")] // Route to get designer ID by user ID
        public async Task<IActionResult> GetDesignerIdByUserId(int userId)
        {
            var designer = await _designerRepository.GetDesignerIdByUserIdAsync(userId); // Fetch designer by user ID

            if (designer == null) // Check if designer exists
            {
                return NotFound(new { message = "Designer not found" }); // Return 404 if not found
            }

            return Ok(designer); // Return designer
        }
    }
}
