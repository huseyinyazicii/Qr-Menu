import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import Dialog from '../../shared/Dialog';
import AddCompanyRequest from '../../../services/companiesService/requestModels/AddCompanyRequest';
import validationSchema from '../../../services/companiesService/validations/addCompanyValidator';
import * as CompaniesService from '../../../services/companiesService';
import * as Messages from '../../../utils/messages';

interface Props {
    open: boolean;
    userId: string;
    onClose: () => void;
    refreshPage: () => void;
}

const AddCompanyDialog: React.FC<Props> = ({ open, userId, onClose, refreshPage }) => {

    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<AddCompanyRequest>({
            validationSchema,
            initialValues: {
                name: '',
                isPay: false,
                userId,
            },
            onSubmit: async (values, actions) => {
                try {
                    await CompaniesService.addCompany(values);
                    Messages.successMessage('Şirket oluşturuldu');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Şirket oluşturulamadı');
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
                <FormControlLabel 
                    label='Ödeme yaptı mı?'
                    control={
                        <Checkbox 
                            name='isPay' 
                            checked={values.isPay} 
                            onChange={handleChange} 
                            disabled={isSubmitting}
                        />
                    }  
                />
                <Button variant='contained' onClick={() => handleSubmit()}>
                    Şirketi Ekle
                </Button>
            </Box>
        </Dialog>
    );
};

export default AddCompanyDialog;
