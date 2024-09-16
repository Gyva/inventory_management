import React, { useState } from 'react';
import { changePassword } from '../services/api';

function ChangePasswordForm() {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    changePassword(formData).then(response => console.log(response));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Old Password</label>
        <input type="password" className="form-control" name="oldPassword" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>New Password</label>
        <input type="password" className="form-control" name="newPassword" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Confirm New Password</label>
        <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Change Password</button>
    </form>
  );
}

export default ChangePasswordForm;
