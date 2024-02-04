import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import Dialog from '../../shared/Dialog';
import validationSchema from '../../../services/productsService/validations/addProductValidator';
import * as ProductsService from '../../../services/productsService';
import * as Messages from '../../../utils/messages';
import { MuiFileInput } from 'mui-file-input';
import AddProductRequest from '../../../services/productsService/requestModels/AddProductRequest';

interface Props {
    open: boolean;
    categoryId: string;
    onClose: () => void;
    refreshPage: () => void;
}

const AddProductDialog: React.FC<Props> = ({ open, categoryId, onClose, refreshPage }) => {
    const [image, setImage] = useState<File | null>(null);

    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<AddProductRequest>({
            validationSchema,
            initialValues: {
                title: '',
                categoryId,
                content: '',
                price: 0,
            },
            onSubmit: async (values, actions) => {
                try {
                    values.imageFile = image;
                    await ProductsService.addProduct(values);
                    Messages.successMessage('Ürün oluşturuldu');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Ürün oluşturulamadı');
                }
            },
        });

    return (
        <Dialog open={open} onClose={onClose} width={400}>
            <Box display='flex' flexDirection='column' gap='16px'>
                <TextField
                    name='title'
                    label='Başlık'
                    size='small'
                    fullWidth
                    value={values.title}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title && touched.title ? true : false}
                    helperText={touched.title && errors.title}
                />
                <TextField
                    name='content'
                    label='İçerik'
                    size='small'
                    fullWidth
                    value={values.content}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.content && touched.content ? true : false}
                    helperText={touched.content && errors.content}
                />
                <TextField
                    name='price'
                    label='Fiyat'
                    size='small'
                    type='number'
                    fullWidth
                    value={values.price}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.price && touched.price ? true : false}
                    helperText={touched.price && errors.price}
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
                    Ürün Ekle
                </Button>
            </Box>
        </Dialog>
    );
};

export default AddProductDialog;
