import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        alert('Logged in successfully (Simulated)');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="auth-card"
            style={{ position: 'relative' }}
        >
            {/* Top Right Logo */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                <BsMusicNoteBeamed size={30} color="#ff5e62" />
            </div>
            {/* Left Panel - Orange */}
            <div className="auth-left">
                <BsMusicNoteBeamed className="music-icon-large" />
                <h1>Welcome Back</h1>
                <p>Login to continue your music journey</p>
            </div>

            {/* Right Panel - Form */}
            <div className="auth-right">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                        <Link to="/forgot-password" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn-submit">Sign In</button>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register" className="link-highlight">Sign up here</Link></p>

                        <div style={{ margin: '20px 0', position: 'relative' }}>
                            <hr style={{ border: 'none', borderTop: '1px solid #333' }} />
                            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#232323', padding: '0 10px', color: '#555', fontSize: '0.8rem' }}>OR</span>
                        </div>

                        <button type="button" className="btn-google">
                            <FcGoogle size={22} /> Sign in with Google
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
