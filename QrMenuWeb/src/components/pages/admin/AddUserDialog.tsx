import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import AddUserRequest from '../../../services/usersService/requestModels/AddUserRequest';
import validationSchema from '../../../services/usersService/validations/addUserValidator';
import * as UserService from '../../../services/usersService';
import * as Messages from '../../../utils/messages';
import Roles from '../../../constants/Roles';

interface Props {
    onClose: () => void;
    refreshPage: () => void;
}

const AddUserDialog: React.FC<Props> = ({ onClose, refreshPage }) => {
    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<AddUserRequest>({
            validationSchema,
            initialValues: {
                name: '',
                userName: '',
                email: '',
                password: '',
                roleName: Roles.None,
            },
            onSubmit: async (values, actions) => {
                try {
                    await UserService.addUser(values);
                    Messages.successMessage('Kullanıcı oluşturuldu');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Kullanıcı oluşturulamadı');
                }
            },
        });

    return (
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
            <TextField
                name='userName'
                label='Kullanıcı İsmi'
                size='small'
                fullWidth
                value={values.userName}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.userName && touched.userName ? true : false}
                helperText={touched.userName && errors.userName}
            />
            <TextField
                name='email'
                label='Email'
                size='small'
                fullWidth
                value={values.email}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? true : false}
                helperText={touched.email && errors.email}
            />
            <TextField
                name='password'
                label='Şifre'
                type='password'
                size='small'
                fullWidth
                value={values.password}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password ? true : false}
                helperText={touched.password && errors.password}
            />
            <FormControl fullWidth>
                <InputLabel id='roleName'>Rol</InputLabel>
                <Select
                    id='roleName'
                    name='roleName'
                    label='Rol'
                    size='small'
                    fullWidth
                    value={values.roleName}
                    disabled={isSubmitting}
                    onChange={handleChange}
                >
                    {Object.keys(Roles).map((keyName) => (
                        <MenuItem key={keyName} value={Roles[keyName]}>
                            {Roles[keyName]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant='contained' onClick={() => handleSubmit()}>
                Kullanıcıyı Ekle
            </Button>
        </Box>
    );
};

export default AddUserDialog;
