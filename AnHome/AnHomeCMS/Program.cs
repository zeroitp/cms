using Microsoft.Extensions.FileProviders;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

builder.Services.AddControllersWithViews();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

// Thêm đoạn này để phục vụ trang tĩnh Sun Casa Central
app.UseStaticFiles();

// Thêm xử lý cho thư mục Sun Casa Central
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "sun-casa-central")),
    RequestPath = "/sun-casa-central",
    EnableDefaultFiles = true
});

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
