import React, { useState } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import ProductModel from '../../../models/ProductModel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Colors } from '../../../contexts/ThemeContext';
import * as ProductsService from '../../../services/productsService';
import * as Messages from '../../../utils/messages';
import UpdateProductDialog from './UpdateProductDialog';

const storageUrl = import.meta.env.VITE_STORAGE_URL;

interface Props {
    product: ProductModel;
    refreshPage: () => void;
}

const CustomerProductCard: React.FC<Props> = ({ product, refreshPage }) => {
    
    const [updateProductOpen, setUpdateProductOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await ProductsService.deleteProduct(product.id);
            Messages.successMessage('Ürün silindi');
            await refreshPage();
        } catch (error) {
            Messages.errorMessage('Ürün silinemedi');
        }
    };

    return (
        <>
            <Card>
                {product.imagePath ? (
                    <CardMedia
                        component='img'
                        sx={{ height: 140 }}
                        image={`${storageUrl}${product.imagePath}`}
                    />
                ) : (
                    <Box sx={{ height: 140, backgroundColor: Colors.blueAccent[500] }} />
                )}
                <CardContent>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography gutterBottom variant='h5' component='div'>
                            {product.title}
                        </Typography>
                        <Typography gutterBottom variant='body1' component='div'>
                            {`${product.price} ₺`}
                        </Typography>
                    </Box>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                    >
                        {product.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title='Düzenle'>
                        <IconButton
                            size='small'
                            color='warning'
                            sx={{ mr: 1 }}
                            onClick={() => setUpdateProductOpen(true)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Sil'>
                        <IconButton size='small' color='error' onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

            {updateProductOpen && (
                <UpdateProductDialog
                    open={updateProductOpen}
                    onClose={() => setUpdateProductOpen(false)}
                    refreshPage={refreshPage}
                    product={product}
                />
            )}
        </>
    );
};

export default CustomerProductCard;
