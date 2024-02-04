import { getRequest, postRequest } from "../request";
import AddCompanyRequest from "./requestModels/AddCompanyRequest";
import GetCompanyByUserIdResponse from "./responseModels/GetCompanyByUserIdResponse";

export const addCompany = (data: AddCompanyRequest) =>
    postRequest<AddCompanyRequest, null>({
        url: '/Companies/AddCompany',
        data,
    });

export const getCompanyByUserId = (userId: string) =>
    getRequest<GetCompanyByUserIdResponse>({
        url:  `/Companies/GetCompanyByUserId/${userId}`,
    });

export const getCompanyByUser = () =>
    getRequest<GetCompanyByUserIdResponse>({
        url:  `/Companies/GetCompanyByUser`,
    });

export const getCompanyName = (companyId: string) =>
    getRequest<string>({
        url:  `/Companies/GetCompanyName/${companyId}`,
        isAuth: false,
    });