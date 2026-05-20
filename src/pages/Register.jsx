import React from 'react'

const Register = () => {
  return (
    <div>
        <div className='min-h-[60vh] flex flex-col items-center justify-center text-center mt-10'>
        <h1 className='text-3xl font-bold text-gray-900'>Register Page</h1>
        <p className='mt-3 text-gray-600'>This is the register page. You can add your registration form here.</p>
        <div className='mt-6 max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg'>
            <input type="text" placeholder='Username' className='border border-gray-300 rounded-md px-4 py-2 mt-4 w-full' />
            <input type="email" placeholder='Email' className='border border-gray-300 rounded-md px-4 py-2 mt-4 w-full' />
            <input type="password" placeholder='Password' className='border border-gray-300 rounded-md px-4 py-2 mt-4 w-full' />
            <button className='mt-4 px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700'>Register</button>
        </div>
        <div/>
    </div>
    </div>
  );
};

export default Register;