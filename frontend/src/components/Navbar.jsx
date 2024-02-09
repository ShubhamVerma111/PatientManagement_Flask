import React from "react";

export default function Navbar() {
    
    return (
        <div className="container-fluid px-5 py-3 bg-body-tertiary">
            <nav className="navbar navbar-expand-md">
                <a href="/" className="navbar-brand">
                    <span className="nav-brand">Patient Management</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Add Patient</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/appointments">List Appointments</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Schedule Appointment</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}