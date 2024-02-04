namespace QrMenuServices.Business.Products.Models;

#nullable disable
public class ProductDto
{
    public string Id { get; set; }
    public string CategoryId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public decimal Price { get; set; }
    public string ImagePath { get; set; }
    public bool IsActive { get; set; }
}