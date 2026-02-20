import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsMusicNoteBeamed, BsArrowLeft } from 'react-icons/bs';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Reset Password Data:', formData);
    alert('Password reset successfully (Simulated)');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="auth-card"
    >
      {/* Left Panel - Orange */}
      <div className="auth-left">
        <BsMusicNoteBeamed className="music-icon-large" />
        <h1>Recovery</h1>
        <p>Secure your music account</p>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-right">
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#888', textDecoration: 'none', marginBottom: '20px' }}>
          <BsArrowLeft /> Back to Login
        </Link>
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Reset Password</button>

        </form>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
