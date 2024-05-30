import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../redux/features/taskSlice';
import IncompletedTasks from './IncompletedTasks';
import AllTasks from './AllTasks';
import Modal from '../../component/Modal/Modal';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <header className='border-b-2 py-2 px-2 flex justify-between items-center sticky top-0 bg-[#f0f6ff] z-40'>
                <h2 className='text-2xl tracking-widest'>Welcome to TODO'S</h2>
                <button className='bg-white px-5 py-2 rounded-lg text-[#486faa] font-medium tracking-widest'>Add Task</button>
            </header>
            <main className='mt-5 space-y-5'>
                {/* task card */}
                <IncompletedTasks />
                
                {/* All Tasks will show via this component */}
                <AllTasks />
            </main>
            <Modal />
        </>
    );
};

export default Home;