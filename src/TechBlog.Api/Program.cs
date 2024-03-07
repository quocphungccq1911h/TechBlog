using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TechBlog.Core.Domain.Identity;
using TechBlog.Data;
using TechBlog.Utilities.Constants;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Config DB Context and ASP.NET Core Identity
builder.Services.AddDbContext<TechBlogContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString(SystemConstants.ConnectionString.TechBlogDB)));

builder.Services.AddIdentity<AppUser, AppRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<TechBlogContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // password setting
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User setting
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;
});

//Default config for ASP.NET Core
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
