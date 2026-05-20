import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center mt-10'>
        <h1 className='text-3xl font-bold text-gray-900'>Login Page</h1>
        <p className='mt-3 text-gray-600'>This is the login page. You can add your login form here.</p>
        <div className='mt-6 max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg'>
            <input type="text" placeholder='Username' className='border border-gray-300 rounded-md px-4 py-2 mt-4 w-full' />
            <input type="password" placeholder='Password' className='border border-gray-300 rounded-md px-4 py-2 mt-4 w-full' />
            <button className='mt-4 px-6 py-3 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700'>Login</button>
            <NavLink to="/register" className='block mt-4 text-indigo-600 font-medium'>
                Don't have an account? Register
            </NavLink>
        </div>
    </div>
  )
}

export default Login