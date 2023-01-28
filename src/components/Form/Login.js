import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');




    // user login-------------------
    const handleLogin = data => {
       const user = {
        email: data.email,
        password: data.password
       }


       console.log(user);



    };



    return (
        <div className='h-[800px] flex justify-center items-center '>
            <div className='w-96 p-7 shadow-xl mx-2 rounded-md'>
                <h2 className='text-4xl py-4 text-center text-yellow-400 font-bold'>Login</h2>
                
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-x">
                        <label className="label"> <span className="label-text ">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" placeholder="Your email" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text ">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" placeholder="********" />

                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                    </div>

                    <input className='btn mt-5 bg-green-500 border-none hover:bg-green-400 text-white w-full max-w-xs' type="submit" value='Login' />
                    <div>
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                    </div>
                </form>
                <p className='my-2 '>Don't have an account? <Link to='/register' className='text-primary underline'>Create an account</Link></p>

            </div>
        </div>
    );
};

export default Login;