import { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Paths from '../../constants/Paths';

interface Props {
    allowedRoles: Array<string>;
}

const RequiredAuth: FC<Props> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return allowedRoles.includes(auth.role) ? (
        <Outlet />
    ) : auth.isAuth ? (
        <Navigate to={Paths.unauthorized} state={{ from: location }} replace />
    ) : (
        <Navigate to={Paths.login} state={{ from: location }} replace />
    );
};

export default RequiredAuth;
