import { useSignUp } from '@clerk/clerk-react';
import { ErrorMessage, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const inputsData = [
    {
        type: 'text',
        id: 'userName',
        name: 'name',
        label: 'Name',
        autoComplete: 'on',
        placeholder: 'Enter your name',
    },
    {
        type: 'email',
        id: 'userEmail',
        name: 'email',
        label: 'Email',
        autoComplete: 'on',
        placeholder: 'Enter your email',
    },
    {
        type: 'password',
        id: 'userPassword',
        name: 'password',
        label: 'Password',
        autoComplete: 'on',
        placeholder: 'Enter your password',
    }
];

const initialValues = {
    name: '',
    email: '',
    password: ''
};

const validationSchema = {
    name: Yup.string().min(2).max(32).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(32).required(),
};

const SignupPage = () => {
    const { signUp, isLoaded } = useSignUp();

    const navigate = useNavigate();

    const mySubmit = async (values, { setSubmitting, setErrors }) => {
        if (!isLoaded) return;

        try {
            const result = await signUp.create({
                firstName: values.name,
                emailAddress: values.email,
                password: values.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            console.log("User created, verify email sent:", result);

            // Redirect to signin page
            navigate(`/verify`);

        } catch (err) {
            if (err.errors) {
                const newErrors = {};
                err.errors.forEach(error => {
                    const field = error.meta?.paramName;
                    if (field) {
                        newErrors[field === 'email_address' ? 'email' : field] = error.message || "Something went wrong";
                    }
                });
                setErrors(newErrors)
            }
        }

        setSubmitting(false);
    };

    return (
        <div className="signup-page flex items-center min-h-screen">
            <div className='container'>
                {/* Welcome Text */}
                <h1 className='text-center mb-7 text-3xl leading-normal'>
                    <span>Create your account on</span>
                    {" "}
                    <Link to={`/`} className='text-green-color font-bold'>NestMart</Link>
                </h1>
                {/* Formik Wrapper */}
                <div className='formik-wrapper mx-auto md:max-w-[750px] bg-[#181818] shadow-md rounded-md p-5'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object(validationSchema)}
                        onSubmit={mySubmit}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            isSubmitting,
                            handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='inputs-wrapper space-y-3 mb-3'>
                                    {
                                        inputsData.map(({ label, ...input }, index) => (
                                            <div className='input-group' key={index}>
                                                <label htmlFor={input.id}>{label}</label>
                                                <input
                                                    {...{
                                                        ...input,
                                                        onChange: handleChange,
                                                        onBlur: handleBlur,
                                                    }}
                                                    className='p-2 rounded-md w-full mt-2 bg-black placeholder:transition-opacity focus:placeholder:opacity-0'
                                                />
                                                <ErrorMessage name={input.name} component='div' className='text-red-500 mt-2 first-letter:capitalize' />
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* Split Line */}
                                <hr className='my-5 opacity-30' />
                                <div className='submit-actions flex items-center justify-between gap-3 max-sm:flex-col'>
                                    {/* Signin */}
                                    <div className='signin'>
                                        <span className='text-gray-color'>Already have an account?</span>
                                        {" "}
                                        <Link
                                            to={`/signin`}
                                            className='text-green-color font-bold'
                                        >Signin</Link>
                                    </div>
                                    {/* Submit Btn */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className='bg-yellow-500 text-[#101010] font-semibold rounded-md py-2 px-4 max-sm:w-full'
                                    >
                                        {
                                            isSubmitting && <i className='fa-solid fa-spinner fa-fw me-2 animate-spin'></i>
                                        }
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;