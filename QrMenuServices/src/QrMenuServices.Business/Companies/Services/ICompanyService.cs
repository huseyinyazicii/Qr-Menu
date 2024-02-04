using CorePackages.Utilities.Results;
using QrMenuServices.Business.Companies.Models;
using QrMenuServices.Business.Companies.Models.Requests;
using QrMenuServices.Business.Companies.Models.Responses;

namespace QrMenuServices.Business.Companies.Services;

public interface ICompanyService
{
    // Endpoints
    Task<ResponseModel> AddCompany(AddCompanyRequest request);
    Task<ResponseModel<GetCompanyByUserIdResponse>> GetCompanyByUserId(string userId);
    Task<ResponseModel<string>> GetCompanyName(string companyId);

    // Methods
    Task<CompanyDto> GetCompanyDtoByUserId(string userId);
}
