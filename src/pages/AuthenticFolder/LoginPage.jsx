import React, { useState } from 'react'
import { HomeData } from '../../assets/assets'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../../config/api';

const LoginPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        if (error || success){
            setError(''); 
            setSuccess('');
        } 
    };

    const handleForms = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess(''); 
        setLoading(true);

        const { username, email, password, confirmPassword } = formData;

        // Frontend validation
        if (!email || !password || (!isLogin && (!username || !confirmPassword))) {
        return setError('Please fill all required fields.');
        }

        if (!validateEmail(email)) {
        return setError('Please enter a valid email address.');
        }

        if (password.length < 6) {
        return setError('Password must be at least 6 characters.');
        }

        if (!isLogin && password !== confirmPassword) {
        return setError('Passwords do not match.');
        }

        try {
        const endpoint = isLogin ? "/login" : "/register";
        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        const res = await axios.post(`${API_BASE}${endpoint}`, payload);

        if (!isLogin) {
            setSuccess("Registration successful. Please login.");
            setIsLogin(true);
            return;
        }

        // Login Success
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsAuthenticated(true);
        navigate("/");

        } catch (err) {
        setError(err.response?.data?.message || "Something went wrong.");
        } finally {
        setLoading(false);
        }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <div style={{
        backgroundImage: `url(${HomeData.RedRose})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    }}
    className="flex items-center justify-center min-h-screen p-4">
        <div className="hover:backdrop-blur-xs bg-black/60 border-black/30 mx-auto p-8 rounded-lg  w-full max-w-md relative overflow-hidden">
            <h2 className="text-2xl text-white font-bold mb-6 text-center">
                {isLogin ? 'Login to Your Account' : 'Create a New Account'}
            </h2>

            {/* {error && (
                <div className="mb-6 p-4 bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-xl text-white text-center font-medium">
                    {error}
                </div>
            )}
             {success && (
                <div className="mb-6 p-4 bg-green-500/90 backdrop-blur-sm border border-green-400 rounded-xl text-white text-center font-medium">
                    {success}
                </div>
            )} */}
            <form onSubmit={handleForms} className="space-y-6">
                {isLogin ? (
                    <>
                <div className="mb-4  flex flex-col justify-center">
                    <label htmlFor="email" className="block text-gray-100 mb-2">Email</label>
                    <input onChange={handleInputChange} value={formData.email} name='email' type="email" id="email" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
                    <input onChange={handleInputChange} value={formData.password} name='password' type="password" id="password" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" required />
                </div>
                </>

            ):(
                <>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-100 mb-2">Username</label>
                    <input onChange={handleInputChange} value={formData.username} name='username' type="text" id="name" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your username" required />
                </div>
                <div className="mb-4  flex flex-col justify-center">
                    <label htmlFor="email" className="block text-gray-100 mb-2">Email</label>
                    <input  onChange={handleInputChange} value={formData.email} name='email' type="email" id="email" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-100 mb-2">Password</label>
                    <input onChange={handleInputChange} value={formData.password} name='password' type="password" id="password" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your password" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-100 mb-2">Confirm Password</label>
                    <input onChange={handleInputChange} value={formData.confirmPassword} name='confirmPassword' type="password" id="confirmPassword" className="text-white w-full px-3 py-2 border border-white rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Confirm your password" required />
                </div>
                </>
            )}
                <button type="submit" className="w-full bg-rose-500 cursor-pointer text-white py-2 rounded hover:bg-rose-700 transition">{loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}</button>
            </form>
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
                {success && <p className="text-green-400 text-center mt-4">{success}</p>}
                <p className='flex flex-row justify-center text-gray-300 py-2 px-2'>
                    {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                    <button onClick={handleToggle} className="flex flex-row justify-end text-blue-700 text-sm hover:underline px-1">{isLogin ? <span>Register Now</span> : <span>Login Now</span>}</button>
                </p>
        </div>
    </div>
  )
}

export default LoginPage