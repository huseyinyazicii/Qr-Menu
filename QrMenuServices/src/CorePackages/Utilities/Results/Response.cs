namespace CorePackages.Utilities.Results;

#nullable disable
public static class Response
{
    public static ResponseModel Success(string message = "")
    {
        return new ResponseModel
        {
            Data = default,
            Message = message,
            Success = true
        };
    }

    public static ResponseModel Error(string message = "")
    {
        return new ResponseModel
        {
            Data = default,
            Message = message,
            Success = false
        };
    }

    public static ResponseModel<T> Success<T>(T data, string message = "")
    {
        return new ResponseModel<T>
        {
            Data = data,
            Message = message,
            Success = true
        };
    }

    public static ResponseModel<T> Error<T>(T data = default, string message = "")
    {
        return new ResponseModel<T>
        {
            Data = data,
            Message = message,
            Success = false
        };
    }
}
