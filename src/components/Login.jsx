import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // make sure Link is imported
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();


const baseURL = "https://studentregisteration.onrender.com"

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/loginstudent`, {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);

        const decoded = jwtDecode(token);
        const username = decoded.username || decoded.name || decoded.email;
        localStorage.setItem('username', username);

        onLogin(username);
        navigate('/students');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
          {/* Professional Heading */}
          <h2 className="text-center mb-4">
          Welcome to Student Registration
        </h2>
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>

        {/* Create Account Link */}
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/">Create one</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
