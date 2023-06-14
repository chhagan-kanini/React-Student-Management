import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './student1.css'

export default function Student1() {
  const [students, setStu] = useState([]);
  const [filtersClass, setFiltersClass] = useState('');

  useEffect(() => {
    fetchstud();
  }, []);

  const fetchstud = async () => {
    try {
      const response = await axios.get('https://localhost:7083/api/Students');
      console.log(response.data);
      setStu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletestud = async (sId) => {
    try {
      await axios.delete(`https://localhost:7083/api/Students/${sId}`);
      fetchstud();
    } catch (error) {
      console.log(error);
    }
  };

  const updatestud = async (sId) => {
    try {
      const studToUpdate = students.find((student) => student.sId === sId);
      if (!studToUpdate) return;

      const sName = prompt('Enter the updated Student name:', studToUpdate.sName);
      const sClass = prompt('Enter the updated class:', studToUpdate.sClass);
      const sDivision = prompt('Enter the updated Division:', studToUpdate.sDivision);

      if (sName && sClass && sDivision) {
        await axios.put(`https://localhost:7083/api/Students/${sId}`, {
          sName,
          sClass,
          sDivision,
        });
        fetchstud();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addStudent = async () => {
    const sName = prompt('Enter the Student name:');
    const sClass = prompt('Enter the Student Class:');
    const sDivision = prompt('Enter the Student Division:');

    if (sName && sClass && sDivision) {
      try {
        await axios.post('https://localhost:7083/api/Students', {
          sName,
          sClass,
          sDivision,
        });
        fetchstud();
      } catch (error) {
        console.log(error);
      }
    }
  };

 
  const handlesClassFilterChange = (event) => {
    setFiltersClass(event.target.value);
  };

  const filteredstudent = filtersClass
    ? students.filter((student) =>
        student.sClass.toLowerCase().includes(filtersClass.toLowerCase())
      )
    : students;

  return (

    
    <div className="container">
         <h2> Student Management System</h2>
      <div className="mb-3">
        <label className="form-label">Filter by class:</label>
        <input
          type="text"
          className="form-control"
          value={filtersClass}
          onChange={handlesClassFilterChange}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Class</th>
            <th scope="col">Division</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredstudent.map((student, index) => (
            <tr key={index}>
              <th scope="row">{student.sId}</th>
              <td>{student.sName}</td>
              <td>{student.sClass}</td>
              <td>{student.sDivision}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletestud(student.sId)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => updatestud(student.sId)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={addStudent}>
        Add
      </button>
    </div>
  );
}
