import React, { useState } from 'react';
import { MdOutlineEdit, MdOutlineDelete, MdCheckCircle } from "react-icons/md";

const Task = ({ id, taskTitle, taskDescription, status, deadLines, priority }) => {
    let completedButton = false;
    completedButton = status === 'completed' ? true : false;

    return (
        <div className='bg-[#f0f6ff] py-3 px-4 rounded-lg space-y-4'>
            <div className='flex justify-between items-center'>
                <h5 className='text-lg font-medium tracking-widest'>{taskTitle}</h5>
                <div className='flex items-center gap-2 text-xl'>
                    <button><MdOutlineEdit className='text-green-500' /></button>
                    <button><MdOutlineDelete className='text-red-500' /></button>
                    <button disabled={completedButton} className={completedButton && '!scale-100'}><MdCheckCircle className={completedButton ? 'text-gray-400' : 'text-blue-400'} /></button>
                </div>
            </div>
            <p className='text-[#1f213b]'>{taskDescription}</p>
            <div className='flex items-center justify-between text-sm'>
                <p className='bg-[#383670] px-5 py-1 rounded-2xl text-white capitalize'>{status}</p>
                <p
                    className={`${priority === 'Low' ? 'bg-red-400' : priority === 'Medium' ? 'bg-red-600' : priority === 'High' ? 'bg-red-800' : ''} px-5 py-1 rounded-2xl text-white font-medium capitalize`}
                >
                    {priority}
                </p>
            </div>
        </div>
    );
};

export default Task;