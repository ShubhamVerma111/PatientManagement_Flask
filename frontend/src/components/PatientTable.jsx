import React, { useEffect, useState } from "react";

export default function PatientTable({ patientData, setModelData, toggleModel }) {

    function handelPatientDelete(patient) {
        const type = "action";
        const data = {
            'message': `Do you want to delete ${patient['name']}?`,
            'url': `http://localhost:5000/patient/${patient.id}`
        }
        setModelData({ type, data });
        toggleModel();
    }

    return (
        <div className="mx-5">
            <div className="fs-1 text-center mb-2">Our Patients</div>
            <table className="table table-striped border ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Name</th>
                        <th>Disease</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patientData.map((patient, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{patient['name']}</td>
                                <td>{patient['disease']}</td>
                                <td>{patient['age']}</td>
                                <td>
                                    <a className="me-3 text-dark" href={`/add_patient/${patient.id}`}><i className="far fa-edit"></i></a>
                                    <span className="text-danger" onClick={() => { handelPatientDelete(patient) }}><i className="fas fa-trash-alt"></i></span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}