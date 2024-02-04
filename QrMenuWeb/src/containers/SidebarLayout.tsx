import React, { CSSProperties, useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet, useNavigate } from 'react-router-dom';
import ModeToggle from '../components/shared/ModeToggle';
import MenuDefination from '../models/shared/MenuDefination';
import LayoutVariables from '../constants/LayoutVariables';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

interface Props {
    menus: Array<MenuDefination>;
}

const SidebarLayout: React.FC<Props> = ({menus}) => {
    const theme = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:900px)');

    const [open, setOpen] = useState(!isMobile);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const styles = {
        appbar: {
            position: 'fixed',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: LayoutVariables.headerHeight,
            borderRadius: 0,
            width: `calc(100% - ${open ? drawerWidth : 0}px)`,
            marginLeft: `${open ? drawerWidth : 0}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        } as CSSProperties,
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        } as CSSProperties,
        main: {
            width: `calc(100% - ${open && !isMobile ? drawerWidth : 0}px)`,
            minHeight: `calc(100vh - ${LayoutVariables.headerHeight}px)`,
            marginLeft: `${open || isMobile ? 0 : drawerWidth * -1}px`,
            marginTop: `${LayoutVariables.headerHeight}px`,
            padding: '16px 32px',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        } as CSSProperties,
        closeDrawer: {
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            height: LayoutVariables.headerHeight,
        } as CSSProperties,
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box style={styles.appbar} component={Paper}>
                <ModeToggle />
                <IconButton
                    color='inherit'
                    onClick={handleDrawerOpen}
                    edge='start'
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            <Drawer
                variant={isMobile ? 'temporary' : 'persistent'}
                anchor='left'
                open={open}
                onClose={handleDrawerClose}
                sx={styles.drawer}
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.grey[theme.palette.mode == 'dark' ? 700 : 100],
                    }
                }}
            >
                <Box style={styles.closeDrawer}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {menus.map(menu => (
                        <ListItem key={menu.id} disablePadding onClick={() => navigate(menu.path)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding onClick={logout}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Çıkış Yap' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box component='main' style={styles.main}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default SidebarLayout;
