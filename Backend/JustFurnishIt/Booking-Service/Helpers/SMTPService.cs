using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;

namespace Booking_Service.Helpers
{
    public class SMTPService : IEmailSender
    {
        private readonly IConfiguration _configuration;
        public SMTPService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_configuration["SmtpSettings:SenderName"], _configuration["SmtpSettings:SenderEmail"]));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            var bodyBuilder = new BodyBuilder { HtmlBody = message };
            emailMessage.Body = bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_configuration["SmtpSettings:Server"], int.Parse(_configuration["SmtpSettings:Port"]), false);
                await client.AuthenticateAsync(_configuration["SmtpSettings:Username"], _configuration["SmtpSettings:Password"]);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
