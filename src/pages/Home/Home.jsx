import React, { useEffect, useState } from 'react';
import Task from '../../component/Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/features/taskSlice';

const Home = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const [showIncompletedTask, setShowIncompletedTask] = useState(3)

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <header className='border-b-2 pb-2 px-2'>
                <h2 className='text-2xl tracking-widest'>Welcome to TODO'S</h2>
            </header>
            <main className='mt-5 space-y-3'>
                <h5 className='text-center text-lg text-[#383670] font-medium tracking-wider'>In-completed Task</h5>
                <div className="bg-white rounded p-5">
                    {/* task card */}
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
            </main>
        </>
    );
};

export default Home;