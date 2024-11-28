using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Designer_Service.Model
{
    public enum ApprovalStatus
    {
        Pending=0,
        Accepted=1,
        Rejected=2
    }
    public class Designer
    {
        [Key]
        public int DesignerId { get; set; }

        public int UserId { get; set; } // Reference to the user ID from the User microservice

       
        public string Specialization { get; set; } // E.g., Living Room, Bedroom, Office

    
        public int ExperienceYears { get; set; } // Years of experience

    
        public string PortfolioUrl { get; set; } // URL of the portfolio or gallery

        public string Bio { get; set; } // Optional description or introduction of the designer


        [DefaultValue(ApprovalStatus.Pending)]  // Default to Pending
        public ApprovalStatus IsApproved { get; set; } // Indicates whether the designer has been approved by an admin

        public string Certifications { get; set; } // List of certifications or qualifications (optional)



    }
}
