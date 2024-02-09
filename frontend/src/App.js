import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PatientTable from './components/PatientTable';
import AppointmentTable from './components/AppointmentTable';
import Model from './components/Model';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<PatientTable />} />
          <Route path="/appointments" element={<AppointmentTable />} />
        </Routes>
        
        <Model />
      </Router>
    </div>
  );
}

export default App;
