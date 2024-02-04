import { useEffect, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as CategoriesService from '../../services/categoriesService';
import * as Messages from '../../utils/messages';
import ListCategoriesByUserIdResponse from '../../services/categoriesService/responseModels/ListCategoriesByUserIdResponse';
import Loader from '../../components/shared/Loader';
import CustomerProductCard from '../../components/pages/customer/CustomerProductCard';
import AddProductDialog from '../../components/pages/customer/AddProductDialog';

const ProductsPage = () => {

    const [categories, setCategories] = useState<ListCategoriesByUserIdResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [addProductOpen, setAddProductOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    
    const products = categories.find(category => category.id === selectedCategoryId)?.products || [];

    useEffect(() => {
        listCategories();
    }, []);

    const listCategories = async () => {
        setLoading(true);
        try {
            const response = await CategoriesService.listCategoriesByUserId();
            setCategories(response.data.data ?? []);
            if(Array.isArray(response.data.data) && response.data.data.length > 0)
                setSelectedCategoryId(response.data.data[0].id)
        } catch (error) {
            Messages.errorMessage('Ürünler listelenemedi');
        }
        setLoading(false);
    };

    return (
        <>
            {loading && <Loader />}
            {categories.length > 0 ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            sx={{ mr: 2 }}
                            onClick={() => setAddProductOpen(true)}
                        >
                            Ürün Ekle
                        </Button>
                        <FormControl size='small' sx={{ minWidth: 200 }}>
                            <InputLabel>Kategori</InputLabel>
                            <Select
                                label='Kategori'
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {products.map(product => (
                        <Grid key={product.id} item xs={12} sm={6} lg={4} xl={3}>
                            <CustomerProductCard product={product} refreshPage={listCategories} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>
                    Herhangi bir kategori bulunamadı. Lütfen ilk başta kategori ekleyiniz.
                </Typography> 
            )}

            {addProductOpen && (
                <AddProductDialog
                    open={addProductOpen}
                    categoryId={selectedCategoryId}
                    onClose={() => setAddProductOpen(false)}
                    refreshPage={listCategories}
                />
            )}
        </>
    );
};

export default ProductsPage;
