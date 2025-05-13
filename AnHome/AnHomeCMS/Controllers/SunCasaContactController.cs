using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace AnHomeCMS.Controllers
{
    public class SunCasaContactController : Controller
    {
        private readonly IConfiguration _configuration;

        public SunCasaContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult SubmitForm(ContactFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Send email
                SendEmail(model);
                return Json(new { success = true, message = "Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ với bạn sớm nhất!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau." });
            }
        }

        private void SendEmail(ContactFormModel model)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings["Host"] ?? "smtp.gmail.com";
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var userName = smtpSettings["UserName"] ?? "your-email@gmail.com";
            var password = smtpSettings["Password"] ?? "your-app-password";

            using (var client = new SmtpClient(host, port))
            {
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(userName, password);

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(userName),
                    Subject = "Liên hệ mới từ Sun Casa Central",
                    Body = $"<h2>Thông tin liên hệ mới</h2>" +
                           $"<p><strong>Họ và tên:</strong> {model.Name}</p>" +
                           $"<p><strong>Email:</strong> {model.Email}</p>" +
                           $"<p><strong>Số điện thoại:</strong> {model.Phone}</p>" +
                           $"<p><strong>Quan tâm về:</strong> {model.Interest}</p>" +
                           $"<p><strong>Nội dung:</strong> {model.Message}</p>",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add("zeroitp@gmail.com");

                client.Send(mailMessage);
            }
        }
    }

    public class ContactFormModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Interest { get; set; }
        public string Message { get; set; }
    }
}