import React from 'react';

const Modal = () => {
    const { handleSubmit, handleChange, resetForm, errors, values, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            dispatch(login(values));
        },
    });

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-[#0303037e] z-50'>
            <form className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-5/6 rounded-md p-5">
                <label htmlFor="taskTitle">Task Title</label>
                <input type="text" placeholder='Please Enter the task title' />
            </form>
        </div>
    );
};

export default Modal;