using AutoMapper;
using QrMenuServices.Business.Products.Models;
using QrMenuServices.Business.Products.Models.Requests;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Products.Mappers;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, AddProductRequest>();
        CreateMap<AddProductRequest, Product>();

        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}
