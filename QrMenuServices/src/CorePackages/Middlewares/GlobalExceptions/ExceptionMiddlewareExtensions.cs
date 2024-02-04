using Microsoft.AspNetCore.Builder;

namespace CorePackages.Middlewares.GlobalExceptions;

public static class ExceptionMiddlewareExtensions
{
    public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
    }
}