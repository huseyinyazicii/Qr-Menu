using CorePackages.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QrMenuServices.Business.Companies.Models.Requests;
using QrMenuServices.Business.Companies.Services;
using QrMenuServices.Models.Constants;
using System.Security.Claims;

namespace QrMenuServices.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _companyService;

    public CompaniesController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Admin)]
    [HttpPost("AddCompany")]
    public async Task<IActionResult> AddCompany([FromBody] AddCompanyRequest request)
    {
        var result = await _companyService.AddCompany(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpGet("GetCompanyByUserId/{userId}")]
    public async Task<IActionResult> GetCompanyByUserId([FromRoute(Name = "userId")] string userId)
    {
        var result = await _companyService.GetCompanyByUserId(userId);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Customer)]
    [HttpGet("GetCompanyByUser")]
    public async Task<IActionResult> GetCompanyByUser()
    {
        var result = await _companyService.GetCompanyByUserId(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpGet("GetCompanyName/{companyId}")]
    public async Task<IActionResult> GetCompanyName([FromRoute(Name = "companyId")] string companyId)
    {
        var result = await _companyService.GetCompanyName(companyId);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
