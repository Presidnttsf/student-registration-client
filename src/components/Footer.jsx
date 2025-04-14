import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Institution Name</h5>
            <p>
              NaasTech<br />
              Nagpur, Maharashtra, India<br />
              Phone: +91 12345 67890<br />
              Email: naas@institution.edu
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About Us</a></li>
              <li><a href="/admissions" className="text-white">Admissions</a></li>
              <li><a href="/departments" className="text-white">Departments</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white me-2">Facebook</a>
            <a href="https://twitter.com" className="text-white me-2">Twitter</a>
            <a href="https://linkedin.com" className="text-white">LinkedIn</a>
          </Col>
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Institution Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
