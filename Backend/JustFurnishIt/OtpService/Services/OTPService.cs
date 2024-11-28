using System.Net.Mail;
using System.Net;

namespace OtpService.Services
{
    public class OTPService
    {
        private readonly IConfiguration _config; // Configuration for accessing SMTP settings

        public OTPService(IConfiguration config)
        {
            _config = config; // Initialize configuration
        }

        public string GenerateOTP()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString(); // Generate a 6-digit OTP
        }

        public void SendOTPEmail(string toEmail, string otp)
        {
            var smtpSection = _config.GetSection("SMTP"); // Get SMTP configuration section from app settings
            string smtpHost = smtpSection["Host"]; // SMTP server host
            int smtpPort = int.Parse(smtpSection["Port"]); // SMTP server port
            bool enableSSL = bool.Parse(smtpSection["EnableSSL"]); // SSL setting for secure email
            string userName = smtpSection["UserName"]; // SMTP username
            string password = smtpSection["Password"]; // SMTP password

            MailMessage message = new MailMessage
            {
                From = new MailAddress(userName), // Set sender's email address
                Subject = "Your OTP Code", // Email subject
                Body = $"Your OTP Code is: {otp}" // Email body with the OTP code
            };
            message.To.Add(toEmail); // Add recipient email address

            // Configure SMTP client with server details and credentials
            SmtpClient smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(userName, password), // SMTP credentials
                EnableSsl = enableSSL // Enable SSL if specified
            };

            smtpClient.Send(message); // Send the email
        }
    }
}
