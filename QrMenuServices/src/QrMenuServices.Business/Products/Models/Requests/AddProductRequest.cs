using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace QrMenuServices.Business.Products.Models.Requests;

#nullable disable
public class AddProductRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Title { get; set; }
    
    
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Content { get; set; }
    
    
    [Range(0.0, Double.MaxValue, ErrorMessage = "0'dan büyük bir değer girmelisiniz")]
    public decimal Price { get; set; }


    public IFormFile ImageFile { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    public string CategoryId { get; set; }
}
