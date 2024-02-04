using CorePackages.Filters;
using CorePackages.Middlewares.GlobalExceptions;
using CorePackages.Security;
using Microsoft.AspNetCore.Mvc;
using QrMenuServices.Business;
using QrMenuServices.DataAccess;
using QrMenuServices.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------------------------------------

builder.Services.Configure<JwtSettingsModel>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);
builder.Services.AddScoped<ValidationFilterAttribute>();

builder.Services.AddDataAccessServices(builder.Configuration);
builder.Services.AddBusinessServices();

builder.Services.ConfigureCors();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureAuthenticationWithJWT(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// -----------------------------------------------------------

var app = builder.Build();

// -----------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ConfigureCustomExceptionMiddleware();

app.ConfigureCustomExceptionMiddleware();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
