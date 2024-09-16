// import React, { useState } from 'react';
// import { loginUser } from '../services/api';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);  // Reset error message
//     setSuccess(null);  // Reset success message
  
//     try {
//       const response = await loginUser(formData.username, formData.password); // Correctly pass values
//       setSuccess(`Login successful! Welcome, ${response.username}.`);
  
//       // Store token and user details (for future requests)
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('username', response.username);
  
//       // Redirect to dashboard after successful login
//       navigate('/dashboard'); // Ensure this is correct and you have a dashboard route
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.non_field_errors || 'Login failed.');
//       } else {
//         setError('Login failed due to a network error.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Username</label>
//         <input type="text" className="form-control" name="username" onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Password</label>
//         <input type="password" className="form-control" name="password" onChange={handleChange} />
//       </div>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {success && <div style={{ color: 'green' }}>{success}</div>}
//       <button type="submit" className="btn btn-primary">Login</button>
//     </form>
//   );
// }

// export default LoginForm;

import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error message

    try {
      const response = await loginUser(formData.username, formData.password);
      
      // Store token and user details after login
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);  // Assuming role is returned in response

      // Redirect to dashboard after login
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.non_field_errors || 'Invalid login credentials.');
      } else {
        setError('Network error, please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" name="username" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" name="password" onChange={handleChange} required />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default LoginForm;
