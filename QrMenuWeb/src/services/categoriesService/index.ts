import { deleteRequest, getRequest, postRequest, putRequest } from "../request";
import AddCategoryRequest from "./requestModels/AddCategoryRequest";
import UpdateCategoryRequest from "./requestModels/UpdateCategoryRequest";
import ListCategoriesByUserIdResponse from "./responseModels/ListCategoriesByUserIdResponse";

export const addCategory = (data: AddCategoryRequest) =>
    postRequest<AddCategoryRequest, null>({
        url: '/Categories/AddCategory',
        data,
        isFormData: true,
    });

export const updateCategory = (data: UpdateCategoryRequest) =>
    putRequest<UpdateCategoryRequest, null>({
        url: '/Categories/UpdateCategory',
        data,
        isFormData: true,
    });

export const listCategoriesByUserId = () =>
    getRequest<ListCategoriesByUserIdResponse[]>({
        url:  `/Categories/ListCategoriesByUserId`,
    });

export const listCategoriesByCompanyId = (companyId: string) =>
    getRequest<ListCategoriesByUserIdResponse[]>({
        url:  `/Categories/ListCategoriesByCompanyId/${companyId}`,
        isAuth: false,
    });

export const deleteCategory = (categoryId: string) =>
    deleteRequest<null>({
        url: `/Categories/DeleteCategory/${categoryId}`,
    });