import React from 'react';

const Home = () => {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1>11:39</h1>
                    <p>Wednesday, May 1, 2024</p>
                </div>
            </div>
        </section>
    );
};

export default Home;
