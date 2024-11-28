using Design_Services.Data;
using Design_Services.DTO;
using Design_Services.Models;
using Design_Services.CustomExceptions;
using Microsoft.EntityFrameworkCore;

namespace Design_Services.Repository
{
    public class DesignRepository : IDesignRepository
    {
        private readonly DesignDBContext _context;

        public DesignRepository(DesignDBContext context)
        {
            _context = context; // Initialize the database context.
        }

        public async Task AddAsync(Design newdesign)
        {
            if (!Enum.IsDefined(typeof(DesignCategory), newdesign.Category))
            {
                throw new InvalidDesignCategoryException("Invalid design category."); // Check if the category is valid.
            }

            try
            {
                await _context.Designs.AddAsync(newdesign); // Add the new design to the database.
                await _context.SaveChangesAsync(); // Save changes to persist the new design.
            }
            catch (Exception ex)
            {
                throw new DesignAdditionFailedException("Error occurred while adding the design.", ex); // Handle addition errors.
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var designDetails = await _context.Designs.FindAsync(id); // Find the design by ID.
                if (designDetails == null)
                {
                    throw new DesignNotFoundException($"Design with ID {id} not found."); // Handle if design is not found.
                }

                _context.Designs.Remove(designDetails); // Remove the design from the database.
                await _context.SaveChangesAsync(); // Save changes to delete the design.
            }
            catch (DesignNotFoundException ex)
            {
                throw new DesignDeletionFailedException(ex.Message, ex); // Handle specific not found exception.
            }
            catch (Exception ex)
            {
                throw new DesignDeletionFailedException("Error occurred while deleting the design.", ex); // Handle deletion errors.
            }
        }

        public async Task<IEnumerable<DesignDTO1>> GetAllAsync()
        {
            try
            {
                var designs = await _context.Designs.ToListAsync(); // Retrieve all designs from the database.

                var designDtos = designs.Select(design => new DesignDTO1 // Map each Design to DesignDTO1.
                {
                    DesignName = design.DesignName,
                    ImageLink = design.ImageLink,
                    Description = design.Description,
                    PricePerSquareFeet = design.PricePerSquareFeet,
                    DesignerId = design.DesignerId,
                    MaterialsUsed = design.MaterialsUsed,
                    Category = design.Category.ToString(), // Convert enum to string.
                    Dimension = design.Dimension,
                    Style = design.Style,
                    Color = design.Color,
                    SpecialFeatures = design.SpecialFeatures
                });

                return designDtos.ToList(); // Return the list of mapped DTOs.
            }
            catch (Exception ex)
            {
                throw new CustomException("Error occurred while retrieving all designs.", ex); // Handle retrieval errors.
            }
        }

        public async Task<DesignDTO1> GetByIdAsync(int id)
        {
            try
            {
                var design = await _context.Designs.FindAsync(id); // Find the design by ID.

                if (design == null)
                {
                    throw new Exception("Design not found"); // Handle if design is not found.
                }

                var designDto = new DesignDTO1 // Map the Design to DesignDTO1.
                {
                    DesignId = design.DesignId,
                    DesignName = design.DesignName,
                    ImageLink = design.ImageLink,
                    Description = design.Description,
                    PricePerSquareFeet = design.PricePerSquareFeet,
                    DesignerId = design.DesignerId,
                    MaterialsUsed = design.MaterialsUsed,
                    Category = design.Category.ToString(), // Convert enum to string.
                    Dimension = design.Dimension,
                    Style = design.Style,
                    Color = design.Color,
                    SpecialFeatures = design.SpecialFeatures
                };

                return designDto; // Return the mapped DTO.
            }
            catch (DesignNotFoundException ex)
            {
                throw new CustomException(ex.Message, ex); // Handle specific not found exception.
            }
            catch (Exception ex)
            {
                throw new CustomException("Error occurred while retrieving design by ID.", ex); // Handle retrieval errors.
            }
        }

        public async Task UpdateAsync(UpdatedDesignDTO newdesign)
        {
            if (!Enum.IsDefined(typeof(DesignCategory), newdesign.Category))
            {
                throw new InvalidDesignCategoryException("Invalid design category."); // Check if the category is valid.
            }
            try
            {
                var existingDesign = await _context.Designs.FindAsync(newdesign.DesignId); // Find the design by ID.
                if (existingDesign == null)
                {
                    throw new DesignNotFoundException("Design not found."); // Handle if design is not found.
                }

                // Update design properties with values from newdesign.
                existingDesign.DesignName = newdesign.DesignName;
                existingDesign.ImageLink = newdesign.ImageLink;
                existingDesign.Description = newdesign.Description;
                existingDesign.PricePerSquareFeet = newdesign.PricePerSquareFeet;
                existingDesign.DesignerId = newdesign.DesignerId;
                existingDesign.MaterialsUsed = newdesign.MaterialsUsed;
                existingDesign.Category = newdesign.Category;
                existingDesign.Dimension = newdesign.Dimension;
                existingDesign.Style = newdesign.Style;
                existingDesign.Color = newdesign.Color;
                existingDesign.SpecialFeatures = newdesign.SpecialFeatures;

                _context.Designs.Update(existingDesign); // Mark design as updated.
                await _context.SaveChangesAsync(); // Save changes to persist updates.
            }
            catch (DesignNotFoundException ex)
            {
                throw new CustomException(ex.Message, ex); // Handle specific not found exception.
            }
            catch (Exception ex)
            {
                throw new DesignUpdateFailedException("Error occurred while updating the design.", ex); // Handle update errors.
            }
        }

        public async Task<IEnumerable<Design>> GetByCategoryAsync(int categoryId)
        {
            try
            {
                return await _context.Designs
                    .Where(d => (int)d.Category == categoryId) // Filter designs by category ID.
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException("Error occurred while retrieving designs by category.", ex); // Handle retrieval errors.
            }
        }

        public async Task<IEnumerable<DesignDTO1>> GetDesignsByDesignerIdAsync(int designerId)
        {
            try
            {
                var designs = await _context.Designs
                    .Where(d => d.DesignerId == designerId) // Filter designs by designer ID.
                    .ToListAsync();

                if (!designs.Any())
                {
                    throw new DesignNotFoundException("No designs found for this designer."); // Handle if no designs are found.
                }

                var designDtos = designs.Select(design => new DesignDTO1 // Map each Design to DesignDTO1.
                {
                    DesignId = design.DesignId,
                    DesignName = design.DesignName,
                    ImageLink = design.ImageLink,
                    Description = design.Description,
                    PricePerSquareFeet = design.PricePerSquareFeet,
                    DesignerId = design.DesignerId,
                    MaterialsUsed = design.MaterialsUsed,
                    Category = design.Category.ToString(), // Convert enum to string.
                    Dimension = design.Dimension,
                    Style = design.Style,
                    Color = design.Color,
                    SpecialFeatures = design.SpecialFeatures
                });

                return designDtos.ToList(); // Return the list of mapped DTOs.
            }
            catch (DesignNotFoundException ex)
            {
                throw new CustomException(ex.Message, ex); // Handle specific not found exception.
            }
            catch (Exception ex)
            {
                throw new CustomException("Error occurred while retrieving designs by designer ID.", ex); // Handle retrieval errors.
            }
        }
    }
}
