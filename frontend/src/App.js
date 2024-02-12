import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PatientTable from './components/PatientTable';
import AppointmentTable from './components/AppointmentTable';
import Model from './components/Model';
import PatientForm from './components/PatientForm';
import AppointmentForm from './components/AppointmentForm';

function App() {
  const initialModelData = {
    'type': 'Error',
    'data': {
      'message': "some Error Message"
    }
  }
  const [modelData, setModelData] = useState(initialModelData);
  const [patientData, setPatientData] = useState([]);
  const [showModel, setShowModel] = useState(false)

  const toggleModel = () => {
    setShowModel(!showModel);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/list_patients');
        const data = await response.json()
        setPatientData(data);
      } catch (error) {
        console.error('Error in fetch : ', error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<PatientTable patientData={patientData} setModelData={setModelData} toggleModel={toggleModel}/>} />
          <Route path="/appointments" element={<AppointmentTable setModelData={setModelData} toggleModel={toggleModel}/>} />
          <Route exact path="/add_patient" element={<PatientForm />} />
          <Route exact path="/add_appointment" element={<AppointmentForm patientData={patientData} setModelData={setModelData} toggleModel={toggleModel}/>} />
        </Routes>

        {showModel && <Model modelData={modelData} onCloseModel={toggleModel}/>}
      </Router>
    </div>
  );
}

export default App;
