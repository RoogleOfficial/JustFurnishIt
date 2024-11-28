using Account_Service.DTO;
using Account_Service.Models;
using AutoMapper;

namespace Account_Service.AutoMapperProfile
{
    // Defines the AutoMapper profile for mapping between DTOs and models in the Account Service.
    public class AccountProfile:Profile
    {
        // Constructor that configures mapping rules between DTOs and models.
        public AccountProfile()
        {
            // Configures mapping between RegisterDTO and User model.
            // ReverseMap() allows map from RegisterDTO to User and vice versa.
            CreateMap<RegisterDTO, User>().ReverseMap();
        }
    }
}
