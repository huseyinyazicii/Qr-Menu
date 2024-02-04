import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { ToastContainer } from 'react-toastify';
import { CustomThemeProvider } from './contexts/ThemeContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CustomThemeProvider>
        <AuthProvider>
            <App />
            <ToastContainer />
        </AuthProvider>
    </CustomThemeProvider>
);
