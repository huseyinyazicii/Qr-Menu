namespace CorePackages.Utilities.Results;

#nullable disable
public abstract class BaseResponseModel
{
    public bool Success { get; set; }
    public string Message { get; set; }
}
