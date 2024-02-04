import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import loginImage from '../assets/images/loginPage.svg';
import { useFormik } from 'formik';
import validationSchema from '../services/usersService/validations/loginValidator';
import ModeToggle from '../components/shared/ModeToggle';
import LoginRequest from '../services/usersService/requestModels/LoginRequest';
import * as UsersService from '../services/usersService';
import * as Messages from '../utils/messages';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {

    const {login} = useAuth();

    const { handleChange, handleSubmit, values, handleBlur, errors, touched, isSubmitting } =
        useFormik<LoginRequest>({
            validationSchema,
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: async (values, actions) => {
                try {
                    const response = await UsersService.login(values);
                    const data = response.data.data
                    if(!data) throw new Error();
                    login(data.name, data.email, data.accessToken, data.role) // todo buradasın
                    actions.resetForm();
                } catch (error) {
                    Messages.errorMessage('Giriş yaparken bir hata meydana geldi.')
                }
            },
        });

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <Grid
                item
                md={7}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img src={loginImage} alt='login' style={{ height: '100vh', maxHeight: '500px' }} />
            </Grid>
            <Grid item xs={12} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        py: 8,
                        px: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon sx={{ color: 'common.white' }} />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Giriş Yap
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: '500px' }}>
                        <TextField
                            name='email'
                            label='Email'
                            margin='normal'
                            required
                            fullWidth
                            autoFocus
                            value={values.email}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email && touched.email ? true : false}
                            helperText={errors.email}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Şifre'
                            type='password'
                            value={values.password}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password && touched.password ? true : false}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2, height: '50px' }}
                            disabled={isSubmitting}
                        >
                            Giriş Yap
                        </Button>
                        <Box>
                            <Link href='#' variant='body2'>
                                Şifremi unuttum?
                            </Link>
                        </Box>
                        <Typography variant='body2' color='text.secondary' align='center'>
                            {`Copyright © QrMenu ${new Date().getFullYear()}.`}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <ModeToggle isAbsolute />
        </Grid>
    );
};

export default LoginPage;
