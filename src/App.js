import DetailsCardComponent from "./components/DetailsCardComponent";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    phoneNumber: ""
  });
  const [recordData, setRecordData] = useState([]);

  // console.log("process.env:", process.env);
  // console.log("process.env.REACT_APP_NODE_ENV:", process.env.REACT_APP_NODE_ENV);
  // console.log("process.env.REACT_APP_SERVER_BASE_URL:", process.env.REACT_APP_SERVER_BASE_URL);
  // const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${base_url}/getusers`)
      .then(res => { setRecordData(res.data); })
      .catch(err => alert(`Some error occurred ==> ${err}`));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${base_url}/adduser`, formData)
      .then(res => {
        setFormData({ name: "", email: "", age: "", address: "", phoneNumber: "" });
        alert("User created successfully");
      })
      .catch(err => alert(`Some error occurred ==> ${err}`));
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light mb-2">
        <h2 className="navbar-brand" style={{textAlign: "center"}}>
          USERS LIST 
        </h2>
      </nav>
      <div className='container'>
        <div className="row">
          <div className="col">
            <h3 className="text-center">Users List</h3>
            <ul>
              {recordData.map((r, i) => (
                <li key={i}>
                  <DetailsCardComponent email={r.email} sn={i + 1} userN={r.name} />
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h2>Add Users</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputUser">User Name</label>
                <input type="text" name="name" className="form-control" id="exampleInputUser" value={formData.name} onChange={handleChange} placeholder="Enter user name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail" value={formData.email} onChange={handleChange} placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAge">Age</label>
                <input type="number" name="age" className="form-control" id="exampleInputAge" value={formData.age} onChange={handleChange} placeholder="Enter age" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAddress">Address</label>
                <input type="text" name="address" className="form-control" id="exampleInputAddress" value={formData.address} onChange={handleChange} placeholder="Enter address" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPhoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" className="form-control" id="exampleInputPhoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
