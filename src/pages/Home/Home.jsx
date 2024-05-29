import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../redux/features/taskSlice';
import IncompletedTasks from './IncompletedTasks';
import AllTasks from './AllTasks';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <header className='border-b-2 pb-2 px-2'>
                <h2 className='text-2xl tracking-widest'>Welcome to TODO'S</h2>
            </header>
            <main className='mt-5 space-y-3'>
                {/* task card */}
                <IncompletedTasks />
                
                {/* All Tasks will show via this component */}
                <AllTasks />
            </main>
        </>
    );
};

export default Home;