import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import StudentList from './components/StudentList';
import Login from './components/Login';
import Signup from './components/SignUp';  // Import Signup component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username'); // Remove the username from localStorage as well
    setIsLoggedIn(false);
    
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
     // Set the username from the API response
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Signup />} /> {/* Signup Route landing page */}

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout isLoggedIn={isLoggedIn}  onLogout={handleLogout} />}>
            <Route path="/students" element={<StudentList />} />
          </Route>
        </Route>

        {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
