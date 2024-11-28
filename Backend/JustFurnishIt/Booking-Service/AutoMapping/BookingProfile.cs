using AutoMapper;
using Booking_Service.DTO;
using Booking_Service.Model;

namespace Booking_Service.AutoMapping
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<Booking, BookingDTO>();
        }
    }
}
