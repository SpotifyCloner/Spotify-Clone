import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Register Data:', formData);
    alert(`Registered successfully as ${formData.username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="auth-card"
      style={{ flexDirection: 'row-reverse', position: 'relative' }}
    >
      {/* Top Right Logo */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
        <BsMusicNoteBeamed size={30} color="#ff5e62" />
      </div>

      {/* Left Panel - Orange Gradient */}
      <div className="auth-left">
        <BsMusicNoteBeamed className="music-icon-large" />
        <h1>Join us</h1>
        <p>The only music that matters</p>
        <div style={{ marginTop: '2rem' }}>
          {/* Decorative elements if needed */}
        </div>
      </div>

      {/* Right Panel - Form (Dark) */}
      <div className="auth-right">
        <h2 className="form-title">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="mobile"
              className="form-input"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
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

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              style={{ marginRight: '10px', accentColor: '#ff5e62' }}
            />
            <label htmlFor="agreeTerms" style={{ fontSize: '0.9rem', color: '#888' }}>
              I agree to <span className="link-highlight">Terms & Conditions</span>
            </label>
          </div>

          <button type="submit" className="btn-submit">Sign up</button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="link-highlight">Click here to login</Link></p>

            <div style={{ margin: '20px 0', position: 'relative' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #333' }} />
              <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#232323', padding: '0 10px', color: '#555', fontSize: '0.8rem' }}>OR</span>
            </div>

            <button type="button" className="btn-google">
              <FcGoogle size={22} /> Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
