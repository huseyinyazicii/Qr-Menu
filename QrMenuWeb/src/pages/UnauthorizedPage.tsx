import { Button } from '@mui/material';
import { Colors } from '../contexts/ThemeContext';
import Paths from '../constants/Paths';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {

    const navigate = useNavigate();

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{textAlign: 'center'}}>
                <h1 style={{color: Colors.redAccent[600]}}>
                    <code>Erişim Engellendi</code>
                </h1>
                <hr style={{ margin: 'auto', width: '50%' }} />
                <h3>Bu sayfaya erişmeye yetkiniz bulunmamaktadır.</h3>
                <h3>🚫🚫🚫🚫</h3>
                <h6 style={{color: Colors.redAccent[600]}}>
                    <strong>Error Code</strong>: 403 forbidden
                </h6>
                <Button size='small' onClick={() => navigate(Paths.base)}>
                    Geri dön..
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
