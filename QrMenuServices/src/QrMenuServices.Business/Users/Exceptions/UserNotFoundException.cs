using CorePackages.Exceptions;

namespace QrMenuServices.Business.Users.Exceptions;

public class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string email) : base($"The user with email : {email} could not found.")
    {

    }
}