import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryCard from '../../components/pages/customer/CategoryCard';
import * as CategoriesService from '../../services/categoriesService';
import * as Messages from '../../utils/messages';
import ListCategoriesByUserIdResponse from '../../services/categoriesService/responseModels/ListCategoriesByUserIdResponse';
import Loader from '../../components/shared/Loader';
import AddCategoryDialog from '../../components/pages/customer/AddCategoryDialog';

const CategoryPage = () => {

    const [categories, setCategories] = useState<ListCategoriesByUserIdResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);

    useEffect(() => {
        listCategories();
    }, []);

    const listCategories = async () => {
        setLoading(true);
        try {
            const response = await CategoriesService.listCategoriesByUserId();
            setCategories(response.data.data ?? []);
        } catch (error) {
            Messages.errorMessage('Kategoriler listelenemedi');
        }
        setLoading(false);
    };

    return (
        <>
            {loading && <Loader />}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        onClick={() => setAddCategoryOpen(true)}
                    >
                        Kategori Ekle
                    </Button>
                </Grid>
                {categories.map(category => (
                    <Grid key={category.id} item xs={12} sm={6} lg={4} xl={3}>
                        <CategoryCard category={category} refreshPage={listCategories} />
                    </Grid>
                ))}
            </Grid>

            {addCategoryOpen && (
                <AddCategoryDialog
                    open={addCategoryOpen}
                    onClose={() => setAddCategoryOpen(false)}
                    refreshPage={listCategories}
                />
            )}
        </>
    );
};

export default CategoryPage;
