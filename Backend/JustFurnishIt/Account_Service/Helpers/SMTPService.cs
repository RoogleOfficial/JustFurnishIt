using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;

namespace Account_Service.Helpers
{
    // SMTPService implements IEmailSender to provide email-sending functionality via an SMTP server.
    public class SMTPService : IEmailSender
    {
        // Stores application configuration for accessing SMTP settings.
        private readonly IConfiguration _configuration;
        // Constructor initializes SMTPService with IConfiguration to access configuration settings.
        public SMTPService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // Sends an email asynchronously to a specified recipient with a subject and message body.
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            // Creates a new MIME email message.
            var emailMessage = new MimeMessage();
            // Sets the sender's name and email address using configuration settings.
            emailMessage.From.Add(new MailboxAddress(_configuration["SmtpSettings:SenderName"],_configuration["SmtpSettings:SenderEmail"]));
            // Sets the recipient's email address. Empty display name is used for simplicity.
            emailMessage.To.Add(new MailboxAddress("User", email));
            // Sets the email subject.
            emailMessage.Subject = subject;
            // Creates the email body with HTML formatting, allowing rich text content in the message.
            var bodyBuilder = new BodyBuilder { HtmlBody = message };
            // Assigns the constructed HTML body to the email message.
            emailMessage.Body = bodyBuilder.ToMessageBody();
            // Creates an SMTP client to connect to the SMTP server and send the email.
            using (var client = new SmtpClient())
            {
                // Connects to the SMTP server using configuration settings (server address and port).
                await client.ConnectAsync(_configuration["SmtpSettings:Server"],int.Parse(_configuration["SmtpSettings:Port"]),false);
                // Authenticates with the SMTP server using configured username and password.
                await client.AuthenticateAsync(_configuration["SmtpSettings:Username"], _configuration["SmtpSettings:Password"]);
                // Sends the email message to the specified recipient.
                await client.SendAsync(emailMessage);
                // Disconnects from the SMTP server after sending the email, passing 'true' to gracefully close the connection.
                await client.DisconnectAsync(true);
               
            }
        }
    }
}
