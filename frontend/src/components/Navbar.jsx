import React from "react";

export default function Navbar() {
    return (
        <div class="container-fluid px-5 py-3 bg-body-tertiary">
            <nav class="navbar navbar-expand-md">
                <a href="#" class="navbar-brand">
                    <span class="nav-brand">Patient Management</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Add Patient</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">List Appointments</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Schedule Appointment</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}