import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from '../../component/Task/Task';

const IncompletedTasks = () => {
    const tasks = useSelector(state => state.tasks.tasks);
    const [showIncompletedTasks, setShowIncompletedTasks] = useState(3)

    return (
        <div className="bg-white rounded p-5">
            <h5 className='text-center text-lg text-[#383670] font-medium tracking-wider mb-5'>In-completed Tasks</h5>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tasks.filter((task) => task.status === 'in-completed').slice(0, showIncompletedTasks).map(({ id, taskTitle, taskDescription, status, deadLines, priority }) => (
                        <Task key={id} taskTitle={taskTitle} taskDescription={taskDescription} status={status} deadLines={deadLines} priority={priority} />
                    ))
                }
            </div>
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
        </div>
    );
};

export default IncompletedTasks;