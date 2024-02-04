using QrMenuServices.Business.Products.Models;

namespace QrMenuServices.Business.Categories.Models.Responses;

#nullable disable
public class ListCategoriesByUserIdResponse
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string ImagePath { get; set; }
    public bool IsActive { get; set; }
    public List<ProductDto> Products { get; set; }
}
