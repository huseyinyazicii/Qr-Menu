using CorePackages.Utilities.Results;
using Microsoft.AspNetCore.Http;

namespace CorePackages.Utilities.LocalStorage;

public interface ILocalStorage
{
    ResponseModel Delete(string filePath);
    ResponseModel DeleteRange(ICollection<string> filePaths);
    ResponseModel<string> Upload(string directoryPath, IFormFile file);
    ResponseModel<ICollection<string>> UploadRange(string directoryPath, IFormFileCollection files);
}
