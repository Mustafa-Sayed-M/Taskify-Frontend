import { useSignIn } from '@clerk/clerk-react';
import { ErrorMessage, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const inputsData = [
    {
        type: 'email',
        id: 'userEmail',
        name: 'email',
        label: 'Email',
        autoComplete: 'on',
        placeholder: 'Enter your email'
    },
    {
        type: 'password',
        id: 'userPassword',
        name: 'password',
        label: 'Password',
        autoComplete: 'on',
        placeholder: 'Enter your password'
    }
];
const initialValues = {
    email: '',
    password: ''
};
const validationSchema = {
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(32).required(),
};

function SigninPage() {

    const { signIn, setActive, isLoaded } = useSignIn();

    const navigate = useNavigate();

    const mySubmit = async (values, { setSubmitting, setErrors }) => {
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: values.email,
                password: values.password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                // Redirect to home page
                navigate(`/`);
            } else {
                console.log('Multi-factor authentication might be required.');
            }
        } catch (err) {
            console.error('Sign in error:', err.errors);
            const message = err.errors?.[0]?.message || 'Something went wrong';
            const errorParamName = err.errors?.[0]?.meta?.paramName;
            if (errorParamName === 'identifier') {
                setErrors({ email: message });
            } else if (errorParamName === 'password') {
                setErrors({ password: message });
            }
        }

        setSubmitting(false);
    };

    return (
        <div className='signin-page flex items-center min-h-screen'>
            <div className='container'>
                {/* Welcome Text */}
                <h1 className='text-center mb-7 text-3xl leading-normal'>
                    <span>Welcome Back, Signin to</span>
                    {" "}
                    <Link to={`/`} className='text-green-color font-bold'>Taskify</Link>
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
                                {/* Inputs Wrapper */}
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
                                                {/* Error Message */}
                                                <ErrorMessage name={input.name} component={'div'} className='text-red-500 mt-2 first-letter:capitalize' />
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* Auth Methods */}
                                <div className='auth-method'>

                                </div>
                                {/* Split Line */}
                                <hr className='my-5 opacity-30' />
                                {/* Submit Actions */}
                                <div className='submit-actions flex items-center justify-between gap-3 max-sm:flex-col'>
                                    {/* Signup */}
                                    <div className='signup'>
                                        <span className='text-gray-color'>Don't have an account?</span>
                                        {" "}
                                        <Link
                                            to={`/signup`}
                                            className='text-green-color font-bold'
                                        >Signup</Link>
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
    )
}

export default SigninPage;