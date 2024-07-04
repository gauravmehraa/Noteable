import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin';
import { MdPerson, MdPassword } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, login } = useLogin();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div className='flex flex-col items-center justify-center w-76 sm:w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-900'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="mt-6 input input-bordered flex items-center gap-2 focus:outline-none">
              <MdPerson/>
              <input
                type='text'
                placeholder='Username'
                className='grow'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <IoEye/>: <IoEyeOff/>}
              </div>
            </label>
          </div>

          <Link to='/register' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block hover:text-red'>
           {" Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm h-10 mt-2'>
              { loading ? <span className='loading loading-spinner'></span>: "Login" }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login