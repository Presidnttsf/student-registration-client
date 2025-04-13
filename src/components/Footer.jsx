import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 pt-4 pb-3">
      <Container>
        <div className="text-muted">
          <p>Student Registration Project</p>
          <p>Created to manage student registration, providing an easy interface for both students and admins.</p>
          <p>Built with React, React Bootstrap, and Node.js.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
