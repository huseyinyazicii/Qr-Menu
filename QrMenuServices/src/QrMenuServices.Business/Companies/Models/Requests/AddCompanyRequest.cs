using System.ComponentModel.DataAnnotations;

namespace QrMenuServices.Business.Companies.Models.Requests;

#nullable disable
public class AddCompanyRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Name { get; set; }


    public bool IsPay { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    public string UserId { get; set; }
}
