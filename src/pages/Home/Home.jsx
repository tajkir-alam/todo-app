import React from 'react';
import Task from '../../component/Task/Task';

const Home = () => {
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
                        <Task />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;