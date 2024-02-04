using CorePackages.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QrMenuServices.Business.Categories.Models.Requests;
using QrMenuServices.Business.Categories.Services;
using QrMenuServices.Business.Companies.Models.Requests;
using QrMenuServices.Models.Constants;
using System.Security.Claims;

namespace QrMenuServices.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Customer)]
    [HttpPost("AddCategory")]
    public async Task<IActionResult> AddCategory([FromForm] AddCategoryRequest request)
    {
        var result = await _categoryService.AddCategory(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Customer)]
    [HttpGet("ListCategoriesByUserId")]
    public async Task<IActionResult> ListCategoriesByUserId()
    {
        var result = await _categoryService.ListCategoriesByUserId(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Customer)]
    [HttpDelete("DeleteCategory/{categoryId}")]
    public async Task<IActionResult> ListCategoriesByUserId([FromRoute(Name = "categoryId")] string companyId)
    {
        var result = await _categoryService.DeleteCategory(companyId, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Customer)]
    [HttpPut("UpdateCategory")]
    public async Task<IActionResult> UpdateCategory([FromForm] UpdateCategoryRequest request)
    {
        var result = await _categoryService.UpdateCategory(request, User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpGet("ListCategoriesByCompanyId/{companyId}")]
    public async Task<IActionResult> ListCategoriesByCompanyId([FromRoute(Name = "companyId")] string companyId)
    {
        var result = await _categoryService.ListCategoriesByCompanyId(companyId);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
