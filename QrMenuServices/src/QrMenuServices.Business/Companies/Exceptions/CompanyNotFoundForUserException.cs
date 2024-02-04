using CorePackages.Exceptions;

namespace QrMenuServices.Business.Companies.Exceptions;

public class CompanyNotFoundForUserException : NotFoundException
{
    public CompanyNotFoundForUserException(string userId) : base($"The company with user id : {userId} could not found.")
    {

    }
}
