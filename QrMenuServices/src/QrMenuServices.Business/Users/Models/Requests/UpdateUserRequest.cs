using System.ComponentModel.DataAnnotations;

namespace QrMenuServices.Business.Users.Models.Requests;

#nullable disable
public class UpdateUserRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    public string Id { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Name { get; set; }


    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string? RoleName { get; set; }
}
