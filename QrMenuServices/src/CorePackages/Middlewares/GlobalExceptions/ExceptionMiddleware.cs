using CorePackages.Exceptions;
using CorePackages.Utilities.Results;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace CorePackages.Middlewares.GlobalExceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception e)
        {
            await HandleExceptionAsync(httpContext, e);
        }
    }

    private Task HandleExceptionAsync(HttpContext httpContext, Exception e)
    {
        httpContext.Response.ContentType = "application/json";
        httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        string message = e.Message;

        if (e is NotFoundException)
            httpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
        else if (e is ValidationException)
            httpContext.Response.StatusCode = (int)HttpStatusCode.UnprocessableEntity;
        else if (e is BadRequestException)
            httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        else
            message = "Internal Server Error";

        var result = JsonSerializer.Serialize(Response.Error(message));

        return httpContext.Response.WriteAsync(result);
    }
}
