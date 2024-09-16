// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// function Sidebar() {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem('token');

//   return (
//     <>
//       {isAuthenticated && location.pathname !== '/login' && (
//         <div className="bg-light border-right" id="sidebar-wrapper">
//           <div className="list-group list-group-flush">
//             <Link to="/equipment" className="list-group-item list-group-item-action bg-light">Manage Equipment</Link>
//             <Link to="/requests" className="list-group-item list-group-item-action bg-light">Manage Requests</Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Sidebar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Sidebar.css'; // Import custom CSS for background color

// function Sidebar() {
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem('token');
//   const userPermissions = JSON.parse(localStorage.getItem('permissions')); // Assuming backend sends user permissions

//   return (
//     <>
//       {isAuthenticated && location.pathname !== '/login' && (
//         <div className="bg-sidebar" id="sidebar-wrapper">
//           <div className="list-group list-group-flush">
//             {userPermissions.includes('view_dashboard') && (
//               <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
//             )}
//             {userPermissions.includes('manage_equipment') && (
//               <Link to="/equipment" className="list-group-item list-group-item-action bg-light">Manage Equipment</Link>
//             )}
//             {userPermissions.includes('manage_requests') && (
//               <Link to="/requests" className="list-group-item list-group-item-action bg-light">Manage Requests</Link>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import custom CSS for background color

function Sidebar() {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage after login
  const username = localStorage.getItem('username');
  console.log('Token:', isAuthenticated);
  console.log('Role:', userRole);
  console.log('Username:', username);


  return (
    <>
      {isAuthenticated && (
        <div className="bg-sidebar" id="sidebar-wrapper">
          <div className="list-group list-group-flush">
            {/* Logistic Officer Activities */}
            {userRole === 'LogisticOfficer' && (
              <>
                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action bg-light">Change Password</Link>
                <Link to="/equipment/register" className="list-group-item list-group-item-action bg-light">Register New Equipment</Link>
                <Link to="/equipment" className="list-group-item list-group-item-action bg-light">View Equipment</Link>
              </>
            )}

            {/* Coordinator Activities */}
            {userRole === 'Coordinator' && (
              <>
                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action bg-light">Change Password</Link>
                <Link to="/requests/new" className="list-group-item list-group-item-action bg-light">Request New Equipment</Link>
                <Link to="/equipment" className="list-group-item list-group-item-action bg-light">View Equipment</Link>
              </>
            )}

            {/* HoD Activities */}
            {userRole === 'HoD' && (
              <>
                <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action bg-light">Change Password</Link>
                <Link to="/requests/" className="list-group-item list-group-item-action bg-light">Approve/Reject Requests</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
  
}

export default Sidebar;
