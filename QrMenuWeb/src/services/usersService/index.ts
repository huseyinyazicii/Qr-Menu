import { deleteRequest, getRequest, postRequest, putRequest } from "../request";
import AddUserRequest from "./requestModels/AddUserRequest";
import LoginRequest from "./requestModels/LoginRequest";
import UpdateUserRequest from "./requestModels/UpdateUserRequest";
import GetUserInfoResponse from "./responseModels/GetUserInfoResponse";
import ListUsersResponse from "./responseModels/ListUsersResponse";
import LoginResponse from "./responseModels/LoginResponse";

export const login = (data: LoginRequest) =>
    postRequest<LoginRequest, LoginResponse>({
        url: '/users/Login',
        data,
        isAuth: false,
    });

export const getUserInfo = () =>
    getRequest<GetUserInfoResponse>({
        url: '/users/GetUserInfoById',
    });

export const listUsers = () =>
    getRequest<Array<ListUsersResponse>>({
        url: '/users/ListUsers',
    });

export const addUser = (data: AddUserRequest) =>
    postRequest<AddUserRequest, null>({
        url: '/users/AddUser',
        data,
    });

export const updateUser = (data: UpdateUserRequest) =>
    putRequest<UpdateUserRequest, null>({
        url: '/users/UpdateUser',
        data,
    });

export const deleteUser = (userId: string) =>
    deleteRequest<null>({
        url: `/users/DeleteUser/${userId}`,
    });