import axios from 'axios';
import React, { useEffect } from 'react';
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/features/taskSlice';

const Task = ({ id, taskTitle, taskDescription, status, deadLines, priority }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className='bg-[#f0f6ff] py-3 px-4 rounded-lg space-y-4'>
            <div className='flex justify-between items-center'>
                <h5 className='text-lg font-medium tracking-widest'>{taskTitle}</h5>
                <div className='flex items-center gap-2 text-xl'>
                    <button><MdOutlineEdit className='text-green-500' /></button>
                    <button><MdOutlineDelete className='text-red-500' /></button>
                </div>
            </div>
            <p className='text-[#1f213b]'>{taskDescription}</p>
            <div className='flex items-center justify-between'>
                <p className='bg-[#383670] px-5 py-1 rounded-2xl text-white capitalize'>{status}</p>
                <p className='bg-red-400 px-5 py-1 rounded-2xl text-white font-medium capitalize'>{priority}</p>
            </div>
        </div>
    );
};

export default Task;