import { useNavigate } from 'react-router-dom';
import { Colors } from '../contexts/ThemeContext';
import { Button } from '@mui/material';
import Paths from '../constants/Paths';

const ErrorPage = () => {

    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: Colors.redAccent[600] }}>
                    <code>Beklenmeyen Hata</code>
                </h1>
                <hr style={{ margin: 'auto', width: '50%' }} />
                <h3>Beklenmeyen bir hata meydana geldi.</h3>
                <h3>🚫🚫🚫🚫</h3>
                <h6 style={{ color: Colors.redAccent[600] }}>
                    <strong>Error Code</strong>: 500 server error
                </h6>
                <Button size='small' onClick={() => navigate(Paths.base)}>
                    Geri dön..
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
