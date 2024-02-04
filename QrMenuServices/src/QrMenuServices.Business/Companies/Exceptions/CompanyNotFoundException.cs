using CorePackages.Exceptions;

namespace QrMenuServices.Business.Companies.Exceptions;

public class CompanyNotFoundException : NotFoundException
{
    public CompanyNotFoundException(string companyId) : base($"The company with id : {companyId} could not found.")
    {

    }
}
