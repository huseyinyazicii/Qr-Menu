import CryptoJS from 'crypto-js';

const SECRET_KEY = 'secretkey';

export const encryptData = (name: string, data: string) => {
    const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();

    localStorage.setItem(name, encrypted);
};

export const decryptData = (name: string) => {
    const encrypted = localStorage.getItem(name) || '';
    return CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};
