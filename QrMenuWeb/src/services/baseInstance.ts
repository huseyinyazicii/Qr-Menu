import axios from 'axios';
import { decryptData } from '../utils/cryptoToken';
import LocalStorageVariables from '../constants/LocalStorageVariables';

const baseApiUrl = import.meta.env.VITE_BASE_URL;

const baseInstance = (isFormData: boolean, isAuth: boolean) => {
    const axiosInstance = axios.create({
        baseURL: baseApiUrl,
        timeout: 10000,
        headers: {
            'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
    });

    if (!isAuth) return axiosInstance;

    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${decryptData(LocalStorageVariables.token)}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosInstance;
};

export default baseInstance;
