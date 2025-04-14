import React, { useEffect, useState } from 'react';
import { Container, Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import Footer from './Footer'; // Import Footer component
import StudentList from './StudentList';
import axios from 'axios';

const Layout = ({ isLoggedIn,  onLogin, onLogout, children }) => {


const username = localStorage.getItem('username') || 'Guest'; // Get username from localStorage or set default to 'Guest'


  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container fluid>
          {/* Project Name */}
          <Navbar.Brand className="fw-bold text-primary">
            Student Registration
          </Navbar.Brand>

          {/* Search Bar */}
          <Form className="d-flex mx-auto w-50">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          {/* Username and Button */}
          <Nav className="ms-auto align-items-center">
            {isLoggedIn && (
              <span className="me-3 fw-semibold text-secondary">{username}</span>
            )}
            <Button variant={isLoggedIn ? 'outline-danger' : 'primary'} onClick={isLoggedIn ? onLogout : onLogin}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <StudentList searchTerm={searchTerm} />
        {children}
      </Container>

      {/* Footer */}
      <Footer /> {/* Use the Footer component here */}
    </>
  );
};

export default Layout;
