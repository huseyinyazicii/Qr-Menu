import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Loader from '../components/shared/Loader';
import * as UserService from '../services/usersService';
import Roles from '../constants/Roles';
import LocalStorageVariables from '../constants/LocalStorageVariables';
import { encryptData } from '../utils/cryptoToken';

const deafultAuthType = {
    email: '',
    token: '',
    name: '',
    role: Roles.None,
    isAuth: false,
};

interface AuthType {
    name: string;
    email: string;
    token: string;
    role: string;
    isAuth: boolean;
}

export interface AuthContextType {
    auth: AuthType;
    login: (name: string, email: string, token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    auth: deafultAuthType,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<AuthType>(deafultAuthType);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await UserService.getUserInfo();
                if (!response?.data.success) throw new Error();

                setAuth({
                    isAuth: true,
                    email: response.data.data?.email || '',
                    name: response.data.data?.name || '',
                    token: response.data.data?.accessToken || '',
                    role: response.data.data?.role.toLowerCase() || Roles.None,
                });
            } catch (error) {
                localStorage.removeItem(LocalStorageVariables.token);
            }
            setLoading(false);
        };

        localStorage.getItem(LocalStorageVariables.token) !== null
            ? getUserInfo()
            : setLoading(false);
    }, []);

    const login = useCallback((name: string, email: string, token: string, role: string) => {
        setAuth({ name, email, token, role: role.toLowerCase(), isAuth: true });
        encryptData(LocalStorageVariables.token, token);
    }, []);

    const logout = useCallback(() => {
        setAuth(deafultAuthType);
        localStorage.removeItem(LocalStorageVariables.token);
    }, []);

    const values = useMemo(
        () => ({
            auth,
            login,
            logout,
        }),
        
        [auth]
    );

    return (
        <AuthContext.Provider value={values}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
