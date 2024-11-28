using AutoMapper;
using Design_Services.DTO;
using Design_Services.Models;

namespace Design_Services.AutoMappingProfile
{
    public class DesignProfile : Profile
    {
        public DesignProfile()
        {
            // Create a bidirectional mapping between DesignDTO and Design
            CreateMap<DesignDTO, Design>().ReverseMap(); // Allows mapping from DesignDTO to Design and vice versa
        }
    }
}
