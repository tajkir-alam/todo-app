import React from 'react';
import { MdOutlineEdit, MdOutlineDelete, MdCheckCircle, MdOutlineWatchLater } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/features/modalSlice';
import { deleteTask, updateTask } from '../../redux/features/taskSlice';

const Task = ({ id, taskTitle, taskDescription, status, deadLines, priority, createdAt, updatedAt }) => {
    let completedButton = status === 'completed' ? true : false;
    const dispatch = useDispatch();

    const handleUpdateTask = (id) => {
        localStorage.removeItem('updateTaskInfo')
        dispatch(openModal('updateTask'))
        const taskInfo = { id, taskTitle, taskDescription, status, deadLines, priority }
        localStorage.setItem('updateTaskInfo', JSON.stringify(taskInfo))
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    }

    const handleCompleteTask = (id) => {
        const completeTask = {
            status: "completed"
        };
        dispatch(updateTask({ id, taskData: completeTask }));
    }

    return (
        <div className='bg-[#f0f6ff] py-3 px-4 rounded-lg space-y-4'>
            <div className='flex justify-between items-center'>
                <h5 className='text-lg font-medium tracking-widest'>{taskTitle}</h5>
                <div className='flex items-center gap-2 text-xl'>
                    <button onClick={() => handleUpdateTask(id)}><MdOutlineEdit className='text-green-500' /></button>
                    <button onClick={() => handleDeleteTask(id)}><MdOutlineDelete className='text-red-500' /></button>
                    {!completedButton &&
                        <button onClick={() => handleCompleteTask(id)}>
                            <MdCheckCircle className='text-blue-400' />
                        </button>
                    }
                </div>
            </div>
            <p className='text-[#1f213b]'>{taskDescription}</p>
            <div className='flex items-center justify-between text-sm'>
                <p className={`${status === 'completed' ? 'bg-[#383670]' : 'bg-[#545199]'} px-5 py-1 rounded-2xl text-white capitalize`}>{status}</p>
                <p
                    className={`${priority === 'low' ? 'bg-red-400' : priority === 'medium' ? 'bg-red-600' : priority === 'high' ? 'bg-red-800' : ''} px-5 py-1 rounded-2xl text-white font-medium capitalize`}
                >
                    {priority}
                </p>
            </div>
            <div className='flex items-center gap-2'>
                <MdOutlineWatchLater className='text-slate-500' />
                <p className='text-sm'>{deadLines}</p>
            </div>
            <div className='flex items-center justify-between'>
                <p>created: {createdAt}</p>
                <p>updated: {updatedAt}</p>
            </div>
        </div>
    );
};

export default Task;