using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace QrMenuServices.Business.Categories.Models.Requests;

#nullable disable
public class AddCategoryRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Name { get; set; }


    public IFormFile? ImageFile { get; set; }
}
