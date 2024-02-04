using CorePackages.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CorePackages.Filters;

public class ValidationFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var controller = context.RouteData.Values["controller"];
        var action = context.RouteData.Values["action"];

        // Request Object
        var request = context.ActionArguments.SingleOrDefault().Value;

        if (!context.ModelState.IsValid)
        {
            var message = string.Join(" | ", context.ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage));

            throw new ValidationException($"{controller}/{action} --> {message}");
        }
    }
}