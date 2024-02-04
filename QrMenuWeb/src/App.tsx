import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Redirect from './components/auth/Redirect';
import IsAuth from './components/auth/IsAuth';
import RequiredAuth from './components/auth/RequiredAuth';
import LoginPage from './pages/LoginPage';
import RestaurantPage from './pages/RestaurantPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CustomerHomePage from './pages/customer/CustomerHomePage';
import AdminHomePage from './pages/admin/AdminHomePage';
import UsersPage from './pages/admin/UsersPage';
import Paths from './constants/Paths';
import Roles from './constants/Roles';
import SidebarLayout from './containers/SidebarLayout';
import AdminMenus from './constants/AdminMenus';
import CustomerMenus from './constants/CustomerMenus';
import CategoryPage from './pages/customer/CategoryPage';
import ProductsPage from './pages/customer/ProductsPage';
import PreviewPage from './pages/customer/PreviewPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={Paths.admin.all} element={<AdminRoutes />} />
                <Route path={Paths.customer.all} element={<CustomerRoutes />} />

                <Route element={<IsAuth />}>
                    <Route path={Paths.login} element={<LoginPage />} />
                </Route>

                <Route path={Paths.restaurant} element={<RestaurantPage />} />

                <Route path={Paths.unauthorized} element={<UnauthorizedPage />} />
                <Route path={Paths.error} element={<ErrorPage />} />
                <Route path='*' element={<Redirect to={Paths.login} />} />
            </Routes>
        </BrowserRouter>
    );
};

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<RequiredAuth allowedRoles={[Roles.Admin]} />}>
                <Route element={<SidebarLayout menus={AdminMenus} />}>
                    <Route index element={<AdminHomePage />} />
                    <Route path={Paths.admin.home} element={<AdminHomePage />} />
                    <Route path={Paths.admin.users} element={<UsersPage />} />
                    <Route path='*' element={<Redirect to={Paths.admin.base} />} />
                </Route>
            </Route>
        </Routes>
    );
};

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route element={<RequiredAuth allowedRoles={[Roles.Customer]} />}>
                <Route element={<SidebarLayout menus={CustomerMenus} />}>
                    <Route index element={<CustomerHomePage />} />
                    <Route path={Paths.customer.home} element={<CustomerHomePage />} />
                    <Route path={Paths.customer.categories} element={<CategoryPage />} />
                    <Route path={Paths.customer.products} element={<ProductsPage />} />
                    <Route path={Paths.customer.preview} element={<PreviewPage />} />
                    <Route path='*' element={<Redirect to={Paths.customer.base} />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
