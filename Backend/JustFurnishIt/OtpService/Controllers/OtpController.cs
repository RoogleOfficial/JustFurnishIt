using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtpService.Services;

namespace OtpService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly OTPService _otpService; // Service for generating and sending OTPs
        private static string staticOTP; // Static field to hold the OTP as a fallback

        public OtpController(OTPService otpService)
        {
            _otpService = otpService; // Initialize OTP service
        }

        // POST: api/Otp/SendOtp - Endpoint to generate and send an OTP to the provided email address
        [HttpPost("SendOtp")]
        public IActionResult SendOtp([FromBody] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Invalid email address."); // Validate email
            }

            string otp = _otpService.GenerateOTP(); // Generate a new OTP
            _otpService.SendOTPEmail(email, otp); // Send OTP to specified email

            // Store OTP in session for later verification
            HttpContext.Session.SetString("OTP", otp);
            staticOTP = otp; // Backup OTP in static variable for fallback

            return Ok("OTP sent to your email."); // Confirm OTP has been sent
        }

        // POST: api/Otp/VerifyOtp - Endpoint to verify the OTP entered by the user
        [HttpPost("VerifyOtp")]
        public IActionResult VerifyOtp([FromBody] string enteredOtp)
        {
            string storedOtp = HttpContext.Session.GetString("OTP"); // Retrieve OTP from session

            if (string.IsNullOrEmpty(storedOtp))
            {
                // Check if static OTP is available as a fallback
                if (staticOTP == null)
                {
                    return BadRequest("OTP expired. Please request a new one."); // OTP expired or not set
                }
                // Verify against static OTP if session OTP is unavailable
                if (staticOTP == enteredOtp)
                {
                    return Ok("OTP successfully verified"); // OTP matches
                }
            }

            // Verify against session OTP if available
            if (storedOtp == enteredOtp)
            {
                return Ok("OTP verified successfully."); // OTP matches
            }
            else
            {
                return BadRequest("Invalid OTP. Please try again."); // OTP does not match
            }
        }
    }
}
