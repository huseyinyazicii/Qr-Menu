import * as yup from 'yup';

const validations = yup.object().shape({
    name: yup.string()
        .min(3, "En az 3 karakter içermelidir.")
        .max(100, "En fazla 100 karakter içermelidir.")
        .required("Zorunlu alan."),
    roleName: yup.string()
        .required("Zorunlu alan."),
});

export default validations;