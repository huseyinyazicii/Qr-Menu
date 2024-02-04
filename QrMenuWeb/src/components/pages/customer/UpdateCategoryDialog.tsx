import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import Dialog from '../../shared/Dialog';
import validationSchema from '../../../services/categoriesService/validations/addCategoryValidator';
import * as CategoriesService from '../../../services/categoriesService';
import * as Messages from '../../../utils/messages';
import { MuiFileInput } from 'mui-file-input';
import UpdateCategoryRequest from '../../../services/categoriesService/requestModels/UpdateCategoryRequest';
import ListCategoriesByUserIdResponse from '../../../services/categoriesService/responseModels/ListCategoriesByUserIdResponse';

interface Props {
    open: boolean;
    onClose: () => void;
    refreshPage: () => void;
    category: ListCategoriesByUserIdResponse;
}

const UpdateCategoryDialog: React.FC<Props> = ({ open, onClose, refreshPage, category }) => {

    const [image, setImage] = useState<File | null>(null);

    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<UpdateCategoryRequest>({
            validationSchema,
            initialValues: {
                id: category.id,
                name: category.name,
            },
            onSubmit: async (values, actions) => {
                try {
                    values.imageFile = image;
                    await CategoriesService.updateCategory(values);
                    Messages.successMessage('Kategori güncellendi');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Kategori güncellenemedi');
                }
            },
        });

    return (
        <Dialog open={open} onClose={onClose} width={400}>
            <Box display='flex' flexDirection='column' gap='16px'>
                <TextField
                    name='name'
                    label='İsim'
                    size='small'
                    fullWidth
                    value={values.name}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name ? true : false}
                    helperText={touched.name && errors.name}
                />
                <MuiFileInput
                    size='small'
                    placeholder='Resim seçiniz..'
                    value={image}
                    onChange={(newFile) => {
                        setImage(newFile);
                    }}
                    inputProps={{
                        accept: '.png, .jpeg, .jpg',
                    }}
                    getInputText={(value) => (value ? 'Resim seçildi' : 'Resim seçiniz..')}
                />
                <Button variant='contained' onClick={() => handleSubmit()}>
                    Kategori Güncelle
                </Button>
            </Box>
        </Dialog>
    );
};

export default UpdateCategoryDialog;
