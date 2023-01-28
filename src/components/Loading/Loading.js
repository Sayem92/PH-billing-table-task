import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className='block w-32 mx-auto h-[90vh]'>
            <div className="loader pt-32">
            <div className="scanner">
                <span className=' bg-slate-600 rounded'>Loading...</span>
            </div>
        </div>
        </div>
    );
};

export default Loading;