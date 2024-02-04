import { Box, Modal } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4,
    maxWidth: 'calc(100% - 16px)',
    maxHeight: 'calc(100vh - 24px)',
    borderRadius: 4,
};

interface Props {
    open: boolean;
    onClose: () => void;
    width?: number;
    children: JSX.Element;
}

const Dialog: React.FC<Props> = ({ open, onClose, children, width=450, }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} width={width}>
                {children}
            </Box>
        </Modal>
    );
};

export default Dialog;
