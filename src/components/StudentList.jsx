import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, Container, Table, Button } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseURL = 'http://localhost:5000/getstudents';

  const getData = async () => {
    try {
      const res = await axios.get(baseURL);
      setStudents(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch students");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (student) => {
    // You can navigate to another page or open a modal here
    alert(`Edit clicked for: ${student.name}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/deletestudent/${id}`);
      getData(); // Refresh list
    } catch (err) {
      alert("Failed to delete student");
    }
  };

  if (loading) return <div className="text-center mt-4"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Student List</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>City</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id || index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{student.phone}</td>
              <td>{student.city}</td>
              <td>{student.courses}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentList;
