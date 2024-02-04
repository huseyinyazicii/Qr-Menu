using System.ComponentModel.DataAnnotations;

namespace QrMenuServices.Business.Users.Models.Requests;

#nullable disable
public class AddUserRequest
{
    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Name { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string UserName { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    [EmailAddress(ErrorMessage = "Email Tipinde Olmalı")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Email { get; set; }


    [Required(ErrorMessage = "Zorunlu Alan")]
    [MinLength(6,ErrorMessage = "En az 6 karakter içermelidir")]
    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string Password { get; set; }


    [MaxLength(100, ErrorMessage = "En fazla 100 karakter içermelidir")]
    public string? RoleName { get; set; }
}
