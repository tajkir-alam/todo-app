import React from 'react';
import { useSelector } from 'react-redux';

const Spinner = () => {
    const { loading } = useSelector((state) => state.tasks)

    return (
        loading && <div className="fixed top-1/2 inset-x-1/2 w-16 h-16 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-white border-sky-400 z-50"></div>
    );
};

export default Spinner;