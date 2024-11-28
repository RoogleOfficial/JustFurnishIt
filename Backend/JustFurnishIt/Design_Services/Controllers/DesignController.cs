using AutoMapper;
using Design_Services.DTO;
using Design_Services.Models;
using Design_Services.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Design_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignController : ControllerBase
    {
        private readonly IDesignRepository _repository; // Repository for design operations
        private readonly IMapper _mapper; // AutoMapper for DTO to model mapping

        public DesignController(IDesignRepository repository, IMapper mapper)
        {
            _repository = repository; // Initialize repository
            _mapper = mapper; // Initialize mapper
        }

        // GET: api/Design - Retrieve all designs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Design>>> GetAllDesigns()
        {
            try
            {
                var designs = await _repository.GetAllAsync(); // Fetch all designs
                return Ok(designs); // Return designs with 200 OK status
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // GET: api/Design/{id} - Retrieve a design by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Design>> GetDesignById(int id)
        {
            try
            {
                var design = await _repository.GetByIdAsync(id); // Fetch design by ID

                if (design == null)
                {
                    return NotFound($"Design with ID {id} not found."); // Return 404 if not found
                }

                return Ok(design); // Return design with 200 OK status
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // POST: api/Design/AddDesigns - Add a new design
        [HttpPost("AddDesigns")]
        public async Task<ActionResult> AddDesign([FromBody] DesignDTO newDesignDTO)
        {
            if (newDesignDTO == null)
            {
                return BadRequest("Design object is null."); // Return 400 if DTO is null
            }

            try
            {
                Design newDesign = _mapper.Map<Design>(newDesignDTO); // Map DTO to Design model
                newDesign.CreatedOn = DateTime.UtcNow; // Set creation date

                await _repository.AddAsync(newDesign); // Add design to repository
                return Ok(new { message = "Added Successfully", designId = newDesign.DesignId }); // Return success message and ID
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // DELETE: api/Design/{id} - Delete a design by ID
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDesign(int id)
        {
            try
            {
                var existingDesign = await _repository.GetByIdAsync(id); // Check if design exists
                if (existingDesign == null)
                {
                    return NotFound($"Design with ID {id} not found."); // Return 404 if not found
                }

                await _repository.DeleteAsync(id); // Delete design
                return Ok("Deleted Successfully"); // Return success message
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // GET: api/Design/designer/{designerId} - Get designs by designer ID
        [HttpGet("designer/{designerId}")]
        public async Task<IActionResult> GetDesignsByDesignerId(int designerId)
        {
            try
            {
                var designs = await _repository.GetDesignsByDesignerIdAsync(designerId); // Fetch designs by designer ID
                if (!designs.Any())
                {
                    return NotFound("No designs found for this designer."); // Return 404 if no designs found
                }
                return Ok(designs); // Return designs with 200 OK status
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // PUT: api/Design/updateDesign/{id} - Update a design by ID
        [HttpPut("updateDesign/{id}")]
        public async Task<IActionResult> UpdateDesign(int id, [FromBody] UpdatedDesignDTO updatedDesign)
        {
            if (updatedDesign == null || id != updatedDesign.DesignId)
            {
                return BadRequest("Design object is null or ID mismatch."); // Return 400 for null object or ID mismatch
            }

            try
            {
                await _repository.UpdateAsync(updatedDesign); // Update design in repository
                return Ok(new { message = "Design updated successfully" }); // Return success message
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle exceptions
            }
        }

        // GET: api/Design/bycategory/{categoryId} - Get designs by category ID
        [HttpGet]
        [Route("bycategory/{categoryId}")]
        public async Task<IActionResult> GetDesignsByCategory(int categoryId)
        {
            var designs = await _repository.GetByCategoryAsync(categoryId); // Fetch designs by category ID
            return Ok(designs); // Return designs with 200 OK status
        }
    }
}
