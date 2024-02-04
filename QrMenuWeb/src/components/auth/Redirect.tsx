import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

interface RedirectProps {
    to: string;
}

const Redirect: FC<RedirectProps> = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    }, []);

    return <Loader />;
};

export default Redirect;
