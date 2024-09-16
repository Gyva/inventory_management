// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // function Header() {
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
// //         headers: { Authorization: `Token ${localStorage.getItem('token')}` }
// //       });

// //       localStorage.removeItem('token');
// //       navigate('/login');
// //     } catch (error) {
// //       console.error('Logout failed', error);
// //     }
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
// //       <Link className="navbar-brand" to="/dashboard">Inventory Management</Link>
// //       <div className="collapse navbar-collapse">
// //         <ul className="navbar-nav ml-auto">
// //           <li className="nav-item">
// //             <Link className="nav-link" to="/login">Login</Link>
// //           </li>
// //           <li className="nav-item">
// //             <Link className="nav-link" to="/register">Register</Link>
// //           </li>
// //           <li className="nav-item">
// //             <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
// //           </li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // }

// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// function Header() {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem('token');
//   const navigate = useNavigate();

//   // Handle logout logic
//   const handleLogout = () => {
//     localStorage.removeItem('token');  // Remove token from localStorage
//     navigate('/login');  // Redirect to login page
//     window.history.replaceState(null, null, '/login');  // Prevent back navigation
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <Link className="navbar-brand" to="/">Inventory Management</Link>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav ml-auto">
//           {!isAuthenticated && location.pathname !== '/dashboard' && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/login">Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/register">Register</Link>
//               </li>
//             </>
//           )}
//           {isAuthenticated && location.pathname !== '/login' && (
//             <li className="nav-item">
//               <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Header;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css'; // Import custom CSS for positioning

function Header() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
      window.history.pushState(null, null, '/login'); // Prevent back navigation
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Inventory Management</Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {!isAuthenticated && location.pathname !== '/dashboard' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && location.pathname !== '/login' && (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
