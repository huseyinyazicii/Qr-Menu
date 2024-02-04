using CorePackages.Utilities.Results;
using Microsoft.AspNetCore.Http;

namespace CorePackages.Utilities.LocalStorage;

public class LocalStorage : ILocalStorage
{
    private readonly string fullPath = Path.Combine(Environment.CurrentDirectory, "wwwroot");

    public ResponseModel Delete(string filePath)
    {
        var isExist = File.Exists(filePath);

        if (!isExist)
            return Response.Error("File not found!");

        File.Delete(Path.Combine(fullPath, filePath));

        return Response.Success();
    }

    public ResponseModel DeleteRange(ICollection<string> filePaths)
    {
        foreach (var filePath in filePaths)
        {
            var isExist = File.Exists(filePath);

            if (!isExist)
                return Response.Error("Some files not found!");
        }

        foreach (var filePath in filePaths)
        {
            File.Delete(Path.Combine(fullPath, filePath));
        }

        return Response.Success();
    }

    public ResponseModel<string> Upload(string directoryPath, IFormFile file)
    {
        FolderControl(directoryPath);

        if (file == null || file.Length <= 0)
            return Response.Error<string>();

        string fileName = Guid.NewGuid().ToString("D") + Path.GetExtension(file.FileName).ToLower();
        var filePath = Path.Combine(fullPath, directoryPath, fileName);
        using var stream = File.Create(filePath);
        file.CopyTo(stream);
        stream.Flush();
        return Response.Success(data: Path.Combine(directoryPath, fileName));
    }

    public ResponseModel<ICollection<string>> UploadRange(string directoryPath, IFormFileCollection files)
    {
        foreach (var file in files)
        {
            if (file == null || file.Length <= 0)
                return Response.Error<ICollection<string>>(message: "An error occured While uploading some files!");
        }

        ICollection<string> data = new List<string>();

        foreach (var file in files)
        {
            var result = Upload(directoryPath, file);
            data.Add(result.Data);
        }

        return Response.Success(data);
    }

    private void FolderControl(string directoryPath)
    {
        if (!Directory.Exists(Path.Combine(fullPath, directoryPath)))
        {
            Directory.CreateDirectory(Path.Combine(fullPath, directoryPath));
        }
    }
}