import React from 'react';
import IncompletedTask from './IncompletedTask';

const Home = () => {
   

    return (
        <>
            <header className='border-b-2 pb-2 px-2'>
                <h2 className='text-2xl tracking-widest'>Welcome to TODO'S</h2>
            </header>
            <main className='mt-5 space-y-3'>
                <h5 className='text-center text-lg text-[#383670] font-medium tracking-wider'>In-completed Task</h5>
                <div className="bg-white rounded p-5 pt-8">
                    {/* task card */}
                   <IncompletedTask />
                </div>
            </main>
        </>
    );
};

export default Home;