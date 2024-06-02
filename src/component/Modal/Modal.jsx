import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { closeModal } from '../../redux/features/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, updateTask } from '../../redux/features/taskSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const { isOpen, modalFor } = useSelector((state) => state.modal)
    const { loading } = useSelector((state) => state.tasks);

    const optionsPriority = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    const optionsStatus = [
        { value: 'completed', label: 'completed' },
        { value: 'in-completed', label: 'in-completed' },
    ];

    // getting the data which have to be update
    const getInfoFromLocalStorage = JSON.parse(localStorage.getItem('updateTaskInfo'));
    let initialValues = {
        taskTitle: '',
        taskDescription: '',
        priority: '',
        status: '',
        deadLines: '',
    };
    if (getInfoFromLocalStorage && modalFor === 'updateTask') {
        initialValues = {
            taskTitle: getInfoFromLocalStorage.taskTitle || '',
            taskDescription: getInfoFromLocalStorage.taskDescription || '',
            status: getInfoFromLocalStorage.status || '',
            priority: getInfoFromLocalStorage.priority || '',
            deadLines: getInfoFromLocalStorage.deadLines || '',
        };
    };

    const { handleSubmit, handleChange, resetForm, errors, values, touched, setFieldValue } = useFormik({
        initialValues,
        validationSchema: Yup.object({
            taskTitle: Yup.string().required('Title is required'),
            taskDescription: Yup.string().required('Description is required'),
            priority: Yup.string().oneOf(['low', 'medium', 'high']).required('Please chose task priority'),
            status: Yup.string().oneOf(['completed', 'in-completed']).required('Please chose task priority'),
            deadLines: Yup.date().required('Please select a dead-line for the task'),
        }),
        onSubmit: async (values) => {
            // Submitting form conditionally 
            if (modalFor === 'addTask') {
                try {
                    dispatch(addNewTask(values));
                    dispatch(closeModal());
                    resetForm()
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            } else if (modalFor === 'updateTask') {
                dispatch(updateTask({ id: getInfoFromLocalStorage.id, taskData: values }));
                dispatch(closeModal());
                resetForm()
            }
        },
    });


    return (
        <div onClick={() => dispatch(closeModal())} className={`fixed top-0 left-0 w-full h-full bg-[#0303037e] backdrop-blur-sm z-50 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} duration-200`}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-5/6 rounded-md p-5">
                <p className='text-[26px] text-center tracking-widest mb-5'>{modalFor === 'addTask' ? 'Add' : modalFor === 'updateTask' ? 'Update' : null} Task</p>
                <label htmlFor="taskTitle" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Title</label>
                <input
                    id='taskTitle'
                    type="text"
                    onChange={handleChange}
                    defaultValue={initialValues.taskTitle}
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
                    defaultValue={initialValues.taskDescription}
                    className='px-2 py-3 w-full border-[1px] border-[#e5e5e5] focus:border-[#047CEB] mb-5 focus:outline-none rounded'
                />
                {touched.taskDescription && errors.taskDescription ? (
                    <div className='text-xs text-red-600 mb-5'>{errors.taskDescription}</div>
                ) : null}

                <div className="flex gap-5 mb-5">
                    <div className='w-full'>
                        <label htmlFor="priority" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Priority</label>
                        <Select
                            defaultValue={null}
                            onChange={(e) => setFieldValue('priority', e.value)}
                            options={optionsPriority}
                            isSearchable={false}
                            className='mb-5'
                        />
                        {touched.priority && errors.priority ? (
                            <div className='text-xs text-red-600 mb-5'>{errors.priority}</div>
                        ) : null}
                    </div>

                    <div className='w-full'>
                        <label htmlFor="status" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Status</label>
                        <Select
                            defaultValue={null}
                            onChange={(e) => setFieldValue('status', e.value)}
                            options={optionsStatus}
                            isSearchable={false}
                            className='mb-5'
                        />
                        {touched.status && errors.status ? (
                            <div className='text-xs text-red-600 mb-5'>{errors.status}</div>
                        ) : null}
                    </div>
                </div>

                <label htmlFor="deadLines" className='text-sm block mb-2 font-medium text-slate-800 tracking-widest'>Task Dead Line</label>
                <input
                    id='deadLines'
                    type="date"
                    name='deadLines'
                    onChange={handleChange}
                    defaultValue={initialValues.deadLines}
                    className='px-2 py-3 w-full border-[1px] border-[#e5e5e5] focus:border-[#047CEB] mb-5 focus:outline-none rounded'
                />
                {touched.deadLines && errors.deadLines ? (
                    <div className='text-xs text-red-600 mb-5'>{errors.deadLines}</div>
                ) : null}

                <button type="submit" className='relative bg-[#047CEB] text-white w-full py-3 rounded-md mb-7 active:scale-95 duration-300'>
                    {loading ?
                        <span className="absolute right-1/2 w-6 h-6 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-white border-sky-400"></span>
                        :
                        'Submit'
                    }
                </button>
            </form>
        </div>
    );
};

export default Modal;