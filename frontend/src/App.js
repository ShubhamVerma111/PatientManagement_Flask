import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PatientTable from './components/PatientTable';

function App() {

  return (
    <div className="App">
      <Navbar />
      <PatientTable />
    </div>
  );
}

export default App;
