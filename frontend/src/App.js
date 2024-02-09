import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PatientTable from './components/PatientTable';
import AppointmentTable from './components/AppointmentTable';

function App() {

  return (
    <div className="App">
      <Navbar />
      {/* <PatientTable /> */}
      <AppointmentTable />
    </div>
  );
}

export default App;
