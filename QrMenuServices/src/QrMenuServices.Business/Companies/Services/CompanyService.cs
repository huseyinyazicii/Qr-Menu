using AutoMapper;
using Azure.Core;
using CorePackages.Utilities.Results;
using Microsoft.EntityFrameworkCore;
using QrMenuServices.Business.Companies.Exceptions;
using QrMenuServices.Business.Companies.Models;
using QrMenuServices.Business.Companies.Models.Requests;
using QrMenuServices.Business.Companies.Models.Responses;
using QrMenuServices.DataAccess.UnitOfWorks;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Companies.Services;

public class CompanyService : ICompanyService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public CompanyService(IRepositoryManager repositoryManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
    }

    #region Endpoints Methods

    public async Task<ResponseModel> AddCompany(AddCompanyRequest request)
    {
        var company = _mapper.Map<Company>(request);

        company.Id = Guid.NewGuid().ToString();
        company.DismissalDate = DateTimeOffset.Now.AddYears(1);
        company.CreatedDate = DateTimeOffset.Now;
        company.IsActive = true;

        await _repositoryManager.Company.AddAsync(company);

        await _repositoryManager.SaveAsync();

        return Response.Success("Created Company!");
    }

    public async Task<ResponseModel<GetCompanyByUserIdResponse>> GetCompanyByUserId(string userId)
    {
        var company = await _repositoryManager.Company
            .List(x => x.UserId == userId)
            .Select(x => _mapper.Map<GetCompanyByUserIdResponse>(x))
            .FirstOrDefaultAsync();

        if (company is null)
            return Response.Error<GetCompanyByUserIdResponse>(message: "Company not found");

        return Response.Success(company, "Listed company by user!");
    }

    public async Task<ResponseModel<string>> GetCompanyName(string companyId)
    {
        var company = await _repositoryManager.Company.SingleAsync(x => x.Id == companyId);

        if (company is null)
            return Response.Error<string>(message: "Company not found");

        return Response.Success(company.Name, "Successfully");
    }

    #endregion

    public async Task<CompanyDto> GetCompanyDtoByUserId(string userId)
    {
        var company = await _repositoryManager.Company.SingleAsync(x => x.UserId == userId);

        if (company is null)
            throw new CompanyNotFoundForUserException(userId);

        return _mapper.Map<CompanyDto>(company);
    }
}

