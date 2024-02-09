import { useState } from 'react';
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
  const [modelData, setModelData] = useState(initialModelData)
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<PatientTable setModelData={setModelData} />} />
          <Route path="/appointments" element={<AppointmentTable setModelData={setModelData} />} />
          <Route exact path="/add_patient" element={<PatientForm />} />
          <Route exact path="/add_appointment" element={<AppointmentForm />} />
        </Routes>

        <Model modelData={modelData} />
      </Router>
    </div>
  );
}

export default App;
