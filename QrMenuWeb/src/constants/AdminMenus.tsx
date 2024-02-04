import MenuDefination from '../models/shared/MenuDefination';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import Paths from './Paths';

const AdminMenus: Array<MenuDefination> = [
    {
        id: 1,
        title: 'Anasayfa',
        path: `${Paths.admin.base}${Paths.admin.home}`,
        icon: <HomeIcon />,
    },
    {
        id: 2,
        title: 'Kullanıcılar',
        path: `${Paths.admin.base}${Paths.admin.users}`,
        icon: <PeopleIcon />,
    },
];

export default AdminMenus;
