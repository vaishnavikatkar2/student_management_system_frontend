import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const BASE_URL = 'http://127.0.0.1:8000'
  const [students, setStudents] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  async function getAllStudents() {
    const response = await axios.get(`${BASE_URL}/students`)
    setStudents(response.data)
  }

  useEffect(() => {
    getAllStudents()
  }, [])

  function storeId(event) {
    setId(event.target.value)
  }
  function storeName(event) {
    setName(event.target.value)
  }
  function storeCourse(event) {
    setCourse(event.target.value)
  }

  async function sendData() {
    if(isEdit === false) {
      const response = await axios.post(`${BASE_URL}/students`, {
        id: id,
        name: name,
        course: course
      })
      window.alert(response.data.detail)
    } else {
       
      const response = await axios.put(`${BASE_URL}/students/${id}`, {
        id: id,
        name: name,
        course: course
      })
      window.alert(response.data.detail)
    }
  }

  function edit(student) {
    setId(student.id)
    setName(student.name)
    setCourse(student.course)
    setIsEdit(true)
  }

 async function deleteRecord(id) {
    const response = await axios.delete(`${BASE_URL}/students/${id}`)
    getAllStudents()
    window.alert(response.data.detail)
    }
  

  return(
    <div className="container">
      <h1>Student Management System</h1>
      <form className='student-form'>
        <input type="number" placeholder='ID' onChange={storeId} value={id} />
        <input type="text" placeholder='Name' onChange={storeName} value={name} />
        <input type="text" placeholder='Course' onChange={storeCourse} value={course} />
        <button onClick={sendData}>{ isEdit ? 'Update' : 'Submit' }</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { students.map((student) => {
            return(
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td><button className='edit-btn' onClick={() => {edit(student)}}>Edit</button></td>
                <td><button className='delete-btn' onClick={() =>{deleteRecord(student.id)}}>Delete</button></td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </div>
  )
}

export default App