using AutoMapper;
using QrMenuServices.Business.Companies.Models;
using QrMenuServices.Business.Companies.Models.Requests;
using QrMenuServices.Business.Companies.Models.Responses;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Companies.Mappers;

public class CompanyProfile : Profile
{
    public CompanyProfile()
    {
        CreateMap<Company, AddCompanyRequest>();
        CreateMap<AddCompanyRequest, Company>();

        CreateMap<Company, GetCompanyByUserIdResponse>();
        CreateMap<GetCompanyByUserIdResponse, Company>();

        CreateMap<Company, CompanyDto>();
        CreateMap<CompanyDto, Company>();
    }
}
