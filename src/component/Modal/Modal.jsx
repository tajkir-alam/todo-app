import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const Modal = () => {
    const optionsPriority = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
    ];

    const optionsStatus = [
        { value: 'Completed', label: 'Completed' },
        { value: 'In-Completed', label: 'In-Completed' },
    ];

    const { handleSubmit, handleChange, resetForm, errors, values, touched, setFieldValue } = useFormik({
        // const formik = useFormik({
        initialValues: {
            taskTitle: '',
            taskDescription: '',
            taskPriority: '',
            taskStatus: '',
        },
        validationSchema: Yup.object({
            taskTitle: Yup.string().required('Title is required'),
            taskDescription: Yup.string().required('Description is required'),
            taskPriority: Yup.string().oneOf(['Low', 'Medium', 'High']).required('Please chose task priority'),
            taskStatus: Yup.string().oneOf(['Completed', 'In-Completed']).required('Please chose task priority'),
        }),
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-[#0303037e] backdrop-blur-sm z-50'>
            <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-5/6 rounded-md p-5">
                <p className='text-[26px] text-center tracking-widest mb-5'>Add Task</p>
                <label htmlFor="taskTitle" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Title</label>
                <input
                    id='taskTitle'
                    type="text"
                    onChange={handleChange}
                    value={values.taskTitle}
                    className='px-2 py-3 w-full border-[1px] border-[#e5e5e5] focus:border-[#047CEB] mb-5 focus:outline-none rounded'
                />
                {touched.taskTitle && errors.taskTitle ? (
                    <div className='text-xs text-red-600 mb-5'>{errors.taskTitle}</div>
                ) : null}

                <label htmlFor="taskDescription" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Description</label>
                <input
                    id='taskDescription'
                    type="text"
                    onChange={handleChange}
                    value={values.taskDescription}
                    className='px-2 py-3 w-full border-[1px] border-[#e5e5e5] focus:border-[#047CEB] mb-5 focus:outline-none rounded'
                />
                {touched.taskDescription && errors.taskDescription ? (
                    <div className='text-xs text-red-600 mb-5'>{errors.taskDescription}</div>
                ) : null}

                <div className="flex gap-5 mb-5">
                    <div className='w-full'>
                        <label htmlFor="taskPriority" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Priority</label>
                        <Select
                            defaultValue={null}
                            onChange={(e) => setFieldValue('taskPriority', e.value)}
                            options={optionsPriority}
                            isSearchable={false}
                            className='mb-5'
                        />
                        {touched.taskPriority && errors.taskPriority ? (
                            <div className='text-xs text-red-600 mb-5'>{errors.taskPriority}</div>
                        ) : null}
                    </div>

                    <div className='w-full'>
                        <label htmlFor="taskStatus" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Status</label>
                        <Select
                            defaultValue={null}
                            onChange={(e) => setFieldValue('taskStatus', e.value)}
                            options={optionsStatus}
                            isSearchable={false}
                            className='mb-5'
                        />
                        {touched.taskStatus && errors.taskStatus ? (
                            <div className='text-xs text-red-600 mb-5'>{errors.taskStatus}</div>
                        ) : null}
                    </div>
                </div>

                {/* <p className='text-center text-sm text-red-500 mb-5'>{message}</p> */}

                <button type="submit" className='relative bg-[#047CEB] text-white w-full py-3 rounded-md mb-7 active:scale-95 duration-300'>
                    {/* {loading && */}
                    <span className="absolute left-44 w-6 h-6 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-white border-sky-400"></span>
                    {/* } */}
                    {/* {loading ? 'Submitting' : 'Submit'} */} Submit
                </button>
            </form>
        </div>
    );
};

export default Modal;