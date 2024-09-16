import React, { useState } from 'react';
import { registerUser } from '../services/api';

function RegistrationForm() {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      registerUser(formData).then(response => console.log(response));
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" name="username" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
}

export default RegistrationForm;
