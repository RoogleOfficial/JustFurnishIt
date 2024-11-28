using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace cloudinary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;

        public MediaController()
        {
            // Load Cloudinary credentials from .env file
            DotEnv.Load(new DotEnvOptions(probeForEnv: true));
            var cloudinaryUrl = Environment.GetEnvironmentVariable("CLOUDINARY_URL");
            _cloudinary = new Cloudinary(cloudinaryUrl);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file provided.");
            }

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                Folder = "roogle",
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            return Ok(new { url = result.Url.ToString() });
        }

    }
}
