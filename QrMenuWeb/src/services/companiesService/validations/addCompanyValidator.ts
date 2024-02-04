import * as yup from 'yup';
import AddCompanyRequest from '../requestModels/AddCompanyRequest';

const validations: yup.ObjectSchema<AddCompanyRequest> = yup.object().shape({
    name: yup
        .string()
        .min(3, 'En az 3 karakter içermelidir.')
        .max(100, 'En fazla 100 karakter içermelidir.')
        .required('Zorunlu alan.'),
    isPay: yup
        .boolean()
        .required('Zorunlu alan.'),
    userId: yup
        .string()
        .required('Zorunlu alan.'),
});

export default validations;
