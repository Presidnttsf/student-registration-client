import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Alert, Container, Table, Button } from 'react-bootstrap';
import { Modal, Form } from 'react-bootstrap';
import EditStudentModal from './EditStudentModal';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    courses: '',
  });
  
console.log("checking formdata", formData)

  const baseURL = 'https://studentregisteration.onrender.com';


  async function getData  () {
    try {
      const res = await axios.get(`${baseURL}/getstudents`);
      
      setStudents(res.data);
      console.log("fetching data", res.data)
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch students");
      setLoading(false);
    }
  };

  useEffect(() => {
        getData();
    }, []);

// This function handles the edit action for a student

  const handleEdit = (student) => {
    // You can navigate to another page or open a modal here
    setSelectedStudent(student)
    alert(`Edit clicked for: ${student.name}`);
    setFormData({...student});
    setShowModal(true);
  };

function handleChange (event) {
const {name, value} = event.target;
setFormData((prevData) => ({
  ...prevData,
  [name]: value,
}));
}

async function handleUpdate () {
try {
  await axios.put(`${baseURL}/updatestudent/${selectedStudent._id}`, formData);
  setShowModal(false);
  getData(); // Refresh list after update
} catch (error) {
  alert("Failed to update student");
  console.error("Error updating student:", error);
}

}

  async function handleDelete  (id) {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (!confirm) return;

    try {
      await axios.delete(`${baseURL}/deletestudent/${id}`);
      getData(); // Refresh list
    } catch (err) {
      console.error("checking", err)
      alert("Failed to delete student");
    }
  };

  if (loading) return <div className="text-center mt-4"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Student List {students.length}</h2>
{/* // Modal for editing student */}
<EditStudentModal 
 show={showModal}
 onHide={() => setShowModal(false)}
 formData={formData}
 handleChange={handleChange}
 handleUpdate={handleUpdate}
/>

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
            <tr key={student._id}>
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
