import React, { useState } from 'react';

function BannerSubscribeSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
    };

    return (
        <>
        <div className="bg-cs-gray-900 text-white p-9 rounded flex gap-3">
            <div className='flex flex-col gap-6 flex-1'>
                <div className='flex justify-end items-start md:flex-row flex-col'>
                    <h2 className="text-5xl font-manrope font-extrabold">Subscribe to CS Growth Digest</h2>
                    <p className="text-lg font-medium">Get the best, coolest, and latest in the dental industry delivered to your inbox each week.</p>
                </div>

                <div className='flex md:flex-row flex-col py-6 px-8 items-center m rounded border-2 justify-between border-cs-gray-800 bg-cs-black'>

                    <input id="default-search"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="block  flex-1   max-w-2xl p-4 ps-10
                 text-cs-gray-600  font-medium text-2x   bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent  dark:placeholder-gray-400 dark:text-cs-gray-600 dark:focus:border-blue-500"
                        required />
                    <button type="submit" className="bg-cs-gray-500 hover:bg-cs-gray-600 text-white px-4 py-2 rounded-sm flex items-center"><span className='text-base font-medium'>Submit</span></button>
                </div>
            </div>
        </div>
        <p className="mt-4 text-base font-semibold text-cs-lightGray-900">You can unsubscribe at any time, no hard feelings. <span className='underline underline-offset-2'>{ `Privacy policy.`} </span></p>

        </>
    );
}

export default BannerSubscribeSection;