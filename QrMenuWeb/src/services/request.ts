import { AxiosResponse } from 'axios';
import baseInstance from './baseInstance';
import BaseResponse from './BaseResponse';

interface RequestParams<TRequest> {
    url: string;
    isAuth?: boolean;
    data?: TRequest;
    isFormData?: boolean;
}

export const getRequest = <TResponse>({
    isAuth = true,
    isFormData = false,
    url,
}: RequestParams<null>) => {
    const newInstance = baseInstance(isFormData, isAuth);

    return newInstance.get<TResponse, AxiosResponse<BaseResponse<TResponse>>, null>(url);
};

export const postRequest = <TRequest, TResponse>({
    isAuth = true,
    isFormData = false,
    url,
    data,
}: RequestParams<TRequest>) => {
    const newInstance = baseInstance(isFormData, isAuth);

    return newInstance.post<TResponse, AxiosResponse<BaseResponse<TResponse>>, TRequest>(url, data);
};

export const putRequest = <TRequest, TResponse>({
    isAuth = true,
    isFormData = false,
    url,
    data,
}: RequestParams<TRequest>) => {
    const newInstance = baseInstance(isFormData, isAuth);

    return newInstance.put<TResponse, AxiosResponse<BaseResponse<TResponse>>, TRequest>(url, data);
};

export const deleteRequest = <TResponse>({
    isAuth = true,
    isFormData = false,
    url,
}: RequestParams<null>) => {
    const newInstance = baseInstance(isFormData, isAuth);

    return newInstance.delete<TResponse, AxiosResponse<BaseResponse<TResponse>>, null>(url);
};