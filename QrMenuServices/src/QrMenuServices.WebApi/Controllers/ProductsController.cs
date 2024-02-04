using CorePackages.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QrMenuServices.Business.Categories.Models.Requests;
using QrMenuServices.Business.Products.Models.Requests;
using QrMenuServices.Business.Products.Services;
using QrMenuServices.Models.Constants;
using System.Security.Claims;

namespace QrMenuServices.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Customer)]
    [HttpPost("AddProduct")]
    public async Task<IActionResult> AddProduct([FromForm] AddProductRequest request)
    {
        var result = await _productService.AddProduct(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }


    [Authorize(Roles = Roles.Customer)]
    [HttpDelete("DeleteProduct/{productId}")]
    public async Task<IActionResult> ListCategoriesByUserId([FromRoute(Name = "productId")] string productId)
    {
        var result = await _productService.DeleteProduct(productId, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Customer)]
    [HttpPut("UpdateProduct")]
    public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductRequest request)
    {
        var result = await _productService.UpdateProduct(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
