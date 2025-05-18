using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Antiforgery;
using System.Net.Mail;
using System.Net;

namespace AnHomeCMS.Controllers
{
    [Route("SunCasaContact")]
    public class SunCasaContactController : Controller
    {
        private readonly IConfiguration _configuration;

        public SunCasaContactController(IConfiguration configuration, IAntiforgery antiforgery)
        {
            _configuration = configuration;
        }
        
        [HttpOptions]
        [Route("SubmitForm")]
        public IActionResult PreflightRoute()
        {
            return Ok();
        }
        
        [HttpPost]
        [Route("SubmitForm")]
        [Consumes("application/json")]
        public IActionResult SubmitForm([FromBody] ContactFormModel model)
        {
            Console.WriteLine("Form submission received");
            
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Model state is invalid");
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                {
                    Console.WriteLine($"Validation error: {error.ErrorMessage}");
                }
                return BadRequest(ModelState);
            }

            try
            {
                Console.WriteLine($"Processing form submission for: {model.Name}, {model.Email}, {model.Phone}");
                // Send email
                SendEmail(model);
                Console.WriteLine("Form processed successfully");
                return Json(new { success = true, message = "Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ với bạn sớm nhất!" });
            }
            catch (Exception ex)
            {
                // Log error details để phân tích lỗi
                Console.WriteLine($"Email sending error: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                
                return Json(new { success = false, message = "Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau." });
            }
        }

        private void SendEmail(ContactFormModel model)
        {
            // Tạo cấu hình SMTP mới
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings["Host"] ?? "smtp.gmail.com";
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var userName = smtpSettings["UserName"] ?? "zeroitp@gmail.com";
            var password = smtpSettings["Password"] ?? "fzaf trix wlba gaxc";
            
            // Tạo SmtpClient với cấu hình đúng
            var client = new SmtpClient
            {
                Host = host,
                Port = port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(userName, password),
                Timeout = 30000 // 30 giây timeout
            };
            
            var mailMessage = new MailMessage
            {
                From = new MailAddress(userName),
                Subject = "Liên hệ mới từ Sun Casa Central",
                Body = $"<h2>Thông tin liên hệ mới</h2>" +
                       $"<p><strong>Họ và tên:</strong> {model.Name}</p>" +
                       $"<p><strong>Email:</strong> {model.Email}</p>" +
                       $"<p><strong>Số điện thoại:</strong> {model.Phone}</p>" +
                       $"<p><strong>Quan tâm về:</strong> {model.Interest}</p>" +
                       (model.Interest == "Khác" && !string.IsNullOrEmpty(model.AdditionalInfo) 
                           ? $"<p><strong>Thông tin thêm:</strong> {model.AdditionalInfo}</p>" 
                           : "") +
                       $"<p><strong>Nội dung:</strong> {model.Message}</p>",
                IsBodyHtml = true
            };
            
            mailMessage.To.Add("test.anhome@yopmail.com");
            
            try
            {
                Console.WriteLine($"Attempting to send email to {mailMessage.To[0].Address}...");
                client.Send(mailMessage);
                Console.WriteLine("Email sent successfully");
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"SMTP Error: {smtpEx.Message}");
                Console.WriteLine($"SMTP Status Code: {smtpEx.StatusCode}");
                if (smtpEx.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {smtpEx.InnerException.Message}");
                }
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                throw;
            }
        }
    }

    public class ContactFormModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Interest { get; set; }
        public string? Message { get; set; }
        public string? AdditionalInfo { get; set; }
    }
}