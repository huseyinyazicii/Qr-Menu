import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import Dialog from '../../shared/Dialog';
import validationSchema from '../../../services/categoriesService/validations/addCategoryValidator';
import * as CategoriesService from '../../../services/categoriesService';
import * as Messages from '../../../utils/messages';
import AddCategoryRequest from '../../../services/categoriesService/requestModels/AddCategoryRequest';
import { MuiFileInput } from 'mui-file-input';

interface Props {
    open: boolean;
    onClose: () => void;
    refreshPage: () => void;
}

const AddCategoryDialog: React.FC<Props> = ({ open, onClose, refreshPage }) => {

    const [image, setImage] = useState<File | null>(null);

    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<AddCategoryRequest>({
            validationSchema,
            initialValues: {
                name: '',
            },
            onSubmit: async (values, actions) => {
                try {
                    values.imageFile = image;
                    await CategoriesService.addCategory(values);
                    Messages.successMessage('Kategori oluşturuldu');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Kategori oluşturulamadı');
                }
            },
        });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            width={400}
        >
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
                        setImage(newFile)
                    }} 
                    inputProps={{ 
                        accept: '.png, .jpeg, .jpg', 
                    }}
                    getInputText={(value) => value ? 'Resim seçildi' : 'Resim seçiniz..'}
                />
                <Button variant='contained' onClick={() => handleSubmit()}>
                    Kategori Ekle
                </Button>
            </Box>
        </Dialog>
    );
};

export default AddCategoryDialog;
