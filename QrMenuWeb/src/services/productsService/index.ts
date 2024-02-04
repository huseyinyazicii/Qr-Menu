import { deleteRequest, postRequest, putRequest } from "../request";
import AddProductRequest from "./requestModels/AddProductRequest";
import UpdateProductRequest from "./requestModels/UpdateProductRequest";

export const addProduct = (data: AddProductRequest) =>
    postRequest<AddProductRequest, null>({
        url: '/Products/AddProduct',
        data,
        isFormData: true,
    });

export const deleteProduct = (productId: string) =>
    deleteRequest<null>({
        url: `/Products/DeleteProduct/${productId}`,
    });

export const updateProduct = (data: UpdateProductRequest) =>
    putRequest<UpdateProductRequest, null>({
        url: '/Products/UpdateProduct',
        data,
        isFormData: true,
    });