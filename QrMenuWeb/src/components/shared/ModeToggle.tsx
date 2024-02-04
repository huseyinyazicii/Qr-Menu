import React, { CSSProperties } from 'react';
import { Box, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useCustomTheme } from '../../contexts/ThemeContext';

interface Props {
    isAbsolute?: boolean;
}

const ModeToggle: React.FC<Props> = (props) => {
    const { isAbsolute = false } = props;

    const { mode, changeMode } = useCustomTheme();

    const style: CSSProperties = isAbsolute ? {
        display: 'flex',
        position: isAbsolute ? 'absolute' : 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        right: '20px',
        top: '20px',
    } : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Box style={style}>
            <LightModeIcon />
            <Switch checked={mode === 'dark'} onChange={changeMode} />
            <DarkModeIcon />
        </Box>
    );
};

export default ModeToggle;
