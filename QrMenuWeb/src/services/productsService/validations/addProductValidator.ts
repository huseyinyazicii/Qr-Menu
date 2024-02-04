import * as yup from 'yup';

const validations = yup.object().shape({
    title: yup
        .string()
        .min(3, 'En az 3 karakter içermelidir.')
        .max(100, 'En fazla 100 karakter içermelidir.')
        .required('Zorunlu alan.'),
    content: yup.string(),
    price: yup.number().min(0, 'Girdiğiniz değer 0 dan büyük olmalıdır.'),
    categoryId: yup.string(),
});

export default validations;
