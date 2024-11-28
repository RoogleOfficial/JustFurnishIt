using System.ComponentModel.DataAnnotations;

namespace Feedback_Service.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DesignId { get; set; }
        public int DesignerId { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public string LovedAboutDesigner { get; set; }
        public int DesignQuality { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
