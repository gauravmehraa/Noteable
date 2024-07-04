import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useRegister from '../hooks/useRegister';
import { MdPerson, MdPassword } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
  const [data, setData] =  useState({
    name: '', username: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, register } = useRegister();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await register(data);
  }

  return (
    <div className='flex flex-col items-center justify-center w-76 sm:w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-900'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Register
        </h1>

        <form onSubmit={handleSubmit}>
        <div>
            <label className="mt-6 input input-bordered flex items-center gap-2 focus:outline-none">
              <MdPerson/>
              <input
                type='text'
                placeholder='Name'
                className='grow'
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
              />
            </label>
          </div>
          <div>
            <label className="mt-6 input input-bordered flex items-center gap-2 focus:outline-none">
              <MdPerson/>
              <input
                type='text'
                placeholder='Username'
                className='grow'
                value={data.username}
                onChange={(e) => setData({...data, username: e.target.value})}
              />
            </label>
          </div>
          <div>
            <label className="mt-4 input input-bordered flex items-center gap-2 focus:outline-none">
              <MdPassword/>
              <input
                type={`${ showPassword? 'text' : 'password'}`}
                placeholder='Password'
                className='grow'
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <IoEye/>: <IoEyeOff/>}
              </div>
            </label>
          </div>
          <div>
            <label className="mt-4 input input-bordered flex items-center gap-2 focus:outline-none">
              <MdPassword/>
              <input
                type={`${ showConfirmPassword? 'text' : 'password'}`}
                placeholder='Confirm Password'
                className='grow'
                value={data.confirmPassword}
                onChange={(e) => setData({...data, confirmPassword: e.target.value})}
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                { showConfirmPassword ? <IoEye/>: <IoEyeOff/>}
              </div>
            </label>
          </div>

          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block hover:text-green'>
           Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm h-10 mt-2' disabled={loading}>
              {loading? <span className='loading loading-spinner'></span>: "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Register;