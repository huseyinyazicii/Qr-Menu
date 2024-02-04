import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string()
        .email("Email formatında olmalıdır.")
        .max(100, "En fazla 100 karakter içermelidir.")
        .required("Zorunlu alan."),
    password: yup.string()
        .min(6, "En az 6 karakter içermelidir.")
        .max(100, "En fazla 100 karakter içermelidir.")
        .required("Zorunlu alan."),
});

export default validations;