import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import validationSchema from '../../../services/usersService/validations/updateUserValidator';
import * as UserService from '../../../services/usersService';
import * as Messages from '../../../utils/messages';
import ListUsersResponse from '../../../services/usersService/responseModels/ListUsersResponse';
import UpdateUserRequest from '../../../services/usersService/requestModels/UpdateUserRequest';
import Roles from '../../../constants/Roles';

interface Props {
    user: ListUsersResponse;
    onClose: () => void;
    refreshPage: () => void;
}

const UpdateUserDialog: React.FC<Props> = ({ user, onClose, refreshPage }) => {
    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<UpdateUserRequest>({
            validationSchema,
            initialValues: {
                id: user.id,
                name: user.name,
                roleName: user.role && user.role.length > 1 ? user.role[0].toUpperCase() + user.role.slice(1) : Roles.None,
            },
            onSubmit: async (values, actions) => {
                try {
                    await UserService.updateUser(values);
                    Messages.successMessage('Kullanıcı güncellendi');
                    actions.resetForm();
                    onClose();
                    refreshPage();
                } catch (error) {
                    Messages.errorMessage('Kullanıcı güncellenemedi');
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
                Güncelle
            </Button>
        </Box>
    );
};

export default UpdateUserDialog;
