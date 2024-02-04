import MenuDefination from '../models/shared/MenuDefination';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paths from './Paths';

const CustomerMenus: Array<MenuDefination> = [
    {
        id: 1,
        title: 'Anasayfa',
        path: `${Paths.customer.base}${Paths.customer.home}`,
        icon: <HomeIcon />,
    },
    {
        id: 2,
        title: 'Kategoriler',
        path: `${Paths.customer.base}${Paths.customer.categories}`,
        icon: <CategoryIcon />,
    },
    {
        id: 3,
        title: 'Ürünler',
        path: `${Paths.customer.base}${Paths.customer.products}`,
        icon: <RestaurantIcon />,
    },
    {
        id: 4,
        title: 'Önizleme',
        path: `${Paths.customer.base}${Paths.customer.preview}`,
        icon: <VisibilityIcon />,
    },
];

export default CustomerMenus;
