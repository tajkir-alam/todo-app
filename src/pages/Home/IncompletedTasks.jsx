import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from '../../component/Task/Task';

const IncompletedTasks = () => {
    const { tasks } = useSelector(state => state.tasks);
    const [showIncompletedTasks, setShowIncompletedTasks] = useState(3);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        return `${day}/${month}/${year}`;
    }

    // giving value for sorting priority.
    const priorityMap = {
        'high': 1,
        'medium': 2,
        'low': 3
    };

    // * sorting data according the priority Higher > Medium > Low
    const sortByPriority = (tasks) => {
        return [...tasks].sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    };

    const sortedTasks = Array.isArray(tasks) ? sortByPriority(tasks) : [];

    return (
        <div className="bg-white rounded p-5">
            <h5 className='text-center text-lg text-[#383670] font-medium tracking-wider mb-5'>In-completed Tasks</h5>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    sortedTasks?.filter((task) => task.status === 'in-completed').slice(0, showIncompletedTasks).map(({ _id, taskTitle, taskDescription, status, deadLines, priority, createdAt, updatedAt }) => (
                        <Task
                            key={_id}
                            id={_id}
                            taskTitle={taskTitle}
                            taskDescription={taskDescription}
                            status={status}
                            deadLines={deadLines}
                            priority={priority}
                            createdAt={formatDate(createdAt)}
                            updatedAt={formatDate(updatedAt)}
                        />
                    ))
                }
            </div>
            {
                !(tasks.filter((task) => task.status === 'in-completed').length <= 3) &&
                <div className='flex justify-end'>
                    {
                        showIncompletedTasks === 3 ?
                            <button
                                onClick={() => setShowIncompletedTasks(tasks.filter((task) => task.status === 'in-completed').length)}
                                className='mt-5 bg-blue-900 hover:bg-blue-700 px-5 py-1 rounded-lg text-white font-medium tracking-wider'
                            >
                                View All
                            </button>
                            :
                            <button
                                onClick={() => setShowIncompletedTasks(3)}
                                className='mt-5 bg-blue-900 hover:bg-blue-700 px-5 py-1 rounded-lg text-white font-medium tracking-wider'
                            >
                                View Less
                            </button>
                    }
                </div>
            }
        </div>
    );
};

export default IncompletedTasks;