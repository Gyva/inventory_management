// // import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import EquipmentPage from './pages/EquipmentPage';
// import RequestPage from './pages/RequestPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ChangePassword from './pages/ChangePassword';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <div className="d-flex">
//         <Sidebar />
//         <div className="container-fluid mt-3">
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/equipment" element={<EquipmentPage />} />
//             <Route path="/requests" element={<RequestPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/change-password" element={<ChangePassword />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </Router>
//   );
// }
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import EquipmentPage from './pages/EquipmentPage';
// import RequestPage from './pages/RequestPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ChangePassword from './pages/ChangePassword';

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Sidebar />
//       <div className="container mt-3">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/equipment" element={<EquipmentPage />} />
//           <Route path="/requests" element={<RequestPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import EquipmentPage from './pages/EquipmentPage';
// import RequestPage from './pages/RequestPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ChangePassword from './pages/ChangePassword';

// function App() {
//   const isAuthenticated = localStorage.getItem('token');

//   return (
//     <Router>
//       <Header />
//       <div className="d-flex">
//         <Sidebar />
//         <div className="container-fluid mt-3">
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//             <Route path="/equipment" element={isAuthenticated ? <EquipmentPage /> : <Navigate to="/login" />} />
//             <Route path="/requests" element={isAuthenticated ? <RequestPage /> : <Navigate to="/login" />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EquipmentPage from './pages/EquipmentPage';
import RequestPage from './pages/RequestPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Header />
      <div className="d-flex">
        {isAuthenticated && <Sidebar />}
        <div className={`container-fluid mt-3 ${isAuthenticated ? 'content' : ''}`}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/equipment" element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>} />
            <Route path="/requests" element={<ProtectedRoute><RequestPage /></ProtectedRoute>} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
