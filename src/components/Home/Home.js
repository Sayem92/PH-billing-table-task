import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2015/01/28/22/20/bookkeeping-615384_960_720.jpg")` }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md ">
                        <h1 className="mb-10 text-5xl font-bold">Welcome to <span className='text-green-500'>The Online Billing Page</span> </h1>
                        <p className="mb-5"> The main purpose of billing is to help the company keep track of all the sale transactions that have taken place.</p>
                       <button className="btn btn-warning hover:bg-yellow-500">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;