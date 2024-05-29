import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../../component/Task/Task';
import { fetchTasks } from '../../redux/features/taskSlice';

const IncompletedTask = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const [showIncompletedTask, setShowIncompletedTask] = useState(3)

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className="bg-white rounded p-5 pt-8">
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tasks.filter((task) => task.status === 'in-completed').slice(0, showIncompletedTask).map(({ id, taskTitle, taskDescription, status, deadLines, priority }) => (
                        <Task key={id} taskTitle={taskTitle} taskDescription={taskDescription} status={status} deadLines={deadLines} priority={priority} />
                    ))
                }
            </div>
            <div className='flex justify-end'>
                {
                    showIncompletedTask === 3 ?
                        <button
                            onClick={() => setShowIncompletedTask(tasks.filter((task) => task.status === 'in-completed').length)}
                            className='mt-5 bg-blue-900 hover:bg-blue-700 px-5 py-1 rounded-lg text-white font-medium tracking-wider'
                        >
                            View All
                        </button>
                        :
                        <button
                            onClick={() => setShowIncompletedTask(3)}
                            className='mt-5 bg-blue-900 hover:bg-blue-700 px-5 py-1 rounded-lg text-white font-medium tracking-wider'
                        >
                            View Less
                        </button>
                }
            </div>
        </div>
    );
};

export default IncompletedTask;