import React, { useState } from 'react';
import Task from '../../component/Task/Task';
import { useSelector } from 'react-redux';

const AllTasks = () => {
    const { tasks } = useSelector(state => state.tasks);
    const [showAllTasks, setShowAllTasks] = useState(3);

    return (
        <div className="bg-white rounded p-5 pt-8">
            <div className='flex flex-col lg:flex-row lg:justify-between items-center text-center px-2 mb-5'>
                <h5 className='text-center text-xl text-[#383670] font-medium tracking-wider'>All Tasks</h5>
                <p className='text-[#383670d5] font-medium tracking-wider'>
                    You have completed <span className='text-[#383670]'>{tasks.filter(task => task.status === 'completed').length}</span> tasks from <span className='text-[#383670]'>{tasks.length}</span> tasks
                </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tasks?.slice(0, showAllTasks).map(({ _id, taskTitle, taskDescription, status, deadLines, priority }) => (
                        <Task key={_id} id={_id} taskTitle={taskTitle} taskDescription={taskDescription} status={status} deadLines={deadLines} priority={priority} />
                    ))
                }
            </div>
            {!(tasks.length <= 3) &&
                <div className='flex justify-end'>
                    {
                        showAllTasks === 3 ?
                            <button
                                onClick={() => setShowAllTasks(tasks.length)}
                                className='mt-5 bg-blue-900 hover:bg-blue-700 px-5 py-1 rounded-lg text-white font-medium tracking-wider'
                            >
                                View All
                            </button>
                            :
                            <button
                                onClick={() => setShowAllTasks(3)}
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

export default AllTasks;