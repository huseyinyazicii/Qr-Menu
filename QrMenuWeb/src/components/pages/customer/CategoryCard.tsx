import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import ListCategoriesByUserIdResponse from '../../../services/categoriesService/responseModels/ListCategoriesByUserIdResponse';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Colors } from '../../../contexts/ThemeContext';
import * as CategoriesService from '../../../services/categoriesService';
import * as Messages from '../../../utils/messages';
import UpdateCategoryDialog from './UpdateCategoryDialog';

const storageUrl = import.meta.env.VITE_STORAGE_URL;

interface Props {
    category: ListCategoriesByUserIdResponse;
    refreshPage: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, refreshPage }) => {

    const [updateCategoryOpen, setUpdateCategoryOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await CategoriesService.deleteCategory(category.id);
            Messages.successMessage('Kategori silindi');
            await refreshPage();
        } catch (error) {
            Messages.errorMessage('Kategori silinemedi');
        }
    }

    return (
        <>
            <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component='div' variant='h5'>
                            {category.name}
                        </Typography>
                        <Typography variant='subtitle1' color='text.secondary' component='div'>
                            Toplam {category.products.length} ürün var.
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Tooltip title='Düzenle'>
                            <IconButton 
                                size='small'
                                color='warning'
                                sx={{mr: 1}}
                                onClick={() => setUpdateCategoryOpen(true)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Sil'>
                            <IconButton 
                                size='small'
                                color='error'
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                {category.imagePath ? (
                    <CardMedia
                        component='img'
                        sx={{ width: 151 }}
                        image={`${storageUrl}${category.imagePath}`}
                    />
                ) : (
                    <Box 
                        sx={{width: 151, backgroundColor: Colors.blueAccent[500]}}
                    />
                )}
            </Card>
            
            {updateCategoryOpen && (
                <UpdateCategoryDialog
                    open={updateCategoryOpen}
                    onClose={() => setUpdateCategoryOpen(false)}
                    refreshPage={refreshPage}
                    category={category}
                />
            )}
        </>
    );
};

export default CategoryCard;
