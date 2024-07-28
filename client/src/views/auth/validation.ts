import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Mininum 2 characters')
    .max(15, 'Maximum 15 characters')
    .required('First name is required.'),
  email: Yup.string().email('Invalid email format').required('Email is required.'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required!'),
  lastName: Yup.string().required('Last name is required.'),
});
