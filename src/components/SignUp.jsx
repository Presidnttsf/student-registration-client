import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();



const baseURL = "https://studentregisteration.onrender.com"

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/addStudent`, data);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Error registering. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const password = watch('password');

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '450px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {/* Professional Heading */}
        <h2 className="text-center mb-4">
          Welcome to Student Registration
        </h2>
        <p className="text-center text-muted mb-4">
          Please fill in the details to create your account.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>

          {/* Name Field */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your name"
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              placeholder="Enter your email"
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </Form.Group>

          {/* Phone Field */}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' }
              })}
              placeholder="Enter your phone"
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </Form.Group>

          {/* City Field */}
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              {...register('city', { required: 'City is required' })}
              placeholder="Enter your city"
            />
            {errors.city && <small className="text-danger">{errors.city.message}</small>}
          </Form.Group>

          {/* Gender Field */}
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <div>
              {['Male', 'Female', 'Other'].map((g) => (
                <Form.Check
                  key={g}
                  inline
                  label={g}
                  value={g}
                  type="radio"
                  {...register('gender', { required: 'Gender is required' })}
                  name="gender"
                  id={`gender-${g}`}
                />
              ))}
            </div>
            {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
          </Form.Group>

          {/* Courses Field */}
          <Form.Group className="mb-3">
            <Form.Label>Courses</Form.Label>
            <Form.Control
              {...register('courses', { required: 'Courses are required' })}
              placeholder="Enter your courses"
            />
            {errors.courses && <small className="text-danger">{errors.courses.message}</small>}
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                placeholder="Enter your password"
              />
              <Button variant="outline-secondary" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === password || 'Passwords do not match'
                })}
                placeholder="Confirm your password"
              />
              <Button variant="outline-secondary" onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </Form>

        {/* Link to Login */}
        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </Container>
  );
};

export default Signup;




