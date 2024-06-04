import React from 'react';
import { MdOutlineEdit, MdOutlineDelete, MdCheckCircle, MdOutlineWatchLater, MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/features/modalSlice';
import { deleteTask, updateTask } from '../../redux/features/taskSlice';
import Swal from 'sweetalert2';

const Task = ({ id, taskTitle, taskDescription, status, deadLines, priority, createdAt, updatedAt }) => {
    let completedButton = status === 'completed' ? true : false;
    const dispatch = useDispatch();

    const handleShowTask = () => {
        Swal.fire({
            title: `<strong>${taskTitle}</strong>`,
            html: `
            <div class="text-left space-y-2">
                <p class=""><span class="font-medium">Description:</span> ${taskDescription}</p>
                <p><span class="font-medium">Status:</span> ${status}</p>
                <p><span class="font-medium">Priority:</span> ${priority}</p>
                <p><span class="font-medium">Deadline:</span> ${deadLines}</p>
                <p><span class="font-medium">Task Created on:</span> ${createdAt}</p>
                <p><span class="font-medium">Task Updated on:</span> ${updatedAt}</p>
            </div>
            `,
        });
    }

    const handleUpdateTask = (id) => {
        localStorage.removeItem('updateTaskInfo')
        dispatch(openModal('updateTask'))
        const taskInfo = { id, taskTitle, taskDescription, status, deadLines, priority }
        localStorage.setItem('updateTaskInfo', JSON.stringify(taskInfo))
    }

    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTask(id));
            }
        });
    }

    const handleCompleteTask = (id) => {
        const completeTask = {
            status: "completed"
        };
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Mark as complete"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateTask({ id, taskData: completeTask }));
            }
        });
    }

    return (
        <div className='bg-[#f0f6ff] py-3 px-4 rounded-lg space-y-4'>
            <div className='flex justify-between items-center'>
                <h5 className='text-lg font-medium tracking-widest'>{taskTitle.slice(0, 15)} {taskTitle.length > 15 && '...'}</h5>
                <div className='flex items-center gap-2 text-xl'>
                    <button onClick={handleShowTask}><MdOutlineRemoveRedEye className='text-emerald-500' /></button>
                    <button onClick={() => handleUpdateTask(id)}><MdOutlineEdit className='text-green-500' /></button>
                    <button onClick={() => handleDeleteTask(id)}><MdOutlineDelete className='text-red-500' /></button>
                    {!completedButton &&
                        <button onClick={() => handleCompleteTask(id)}>
                            <MdCheckCircle className='text-blue-400' />
                        </button>
                    }
                </div>
            </div>
            <p className='text-[#1f213b]'>{taskDescription.slice(0, 40)} {taskDescription.length > 40 && '...'}</p>
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