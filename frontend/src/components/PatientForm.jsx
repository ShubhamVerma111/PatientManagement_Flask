import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

export default function PatientForm() {
    const navigate = useNavigate();
    const { patient_id } = useParams();
    const [formData, setFormData] = useState({
        'name': '', 'age': '', 'disease': ''
    })
    const [isMissing, setIsMissing] = useState(false)
    function updateFormData(e) {
        setFormData(pre => {
            return {
                ...pre,
                [e.target.name]: e.target.value,
            }
        });
    }

    async function handelSubmit(e) {
        e.preventDefault();
        if (formData['name'] == '' || formData['age'] == '' || formData['disease'] == '') setIsMissing(true)
        else {
            setIsMissing(false)
            try {
                let response;
                if (patient_id) {
                    response = await fetch(`http://localhost:5000/patient/${patient_id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                } else {
                    response = await fetch("http://localhost:5000/add_patient", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                }
                if (response.ok) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error posting data : ', error);
            }

        }
    }

    useEffect(() => {
        async function fetchData(patient_id) {
            try {
                const response = await fetch(`http://localhost:5000/patient/${patient_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error("error in fetch patient");
                }
            } catch (error) {
                console.error('error in fetch', error);
            }
        }
        if (patient_id) fetchData(patient_id);
    }, [patient_id])

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50" onSubmit={handelSubmit}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="name" value={formData['name']} onChange={(e) => { updateFormData(e) }} id="name" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="age" className="col-sm-2 col-form-label">Age :</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" name="age" value={formData['age']} onChange={(e) => { updateFormData(e) }} id="age" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="disease" className="col-sm-2 col-form-label">Disease :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="disease" value={formData['disease']} onChange={(e) => { updateFormData(e) }} id="disease" />
                    </div>
                </div>
                {isMissing && <p className="text-danger text-center">Please fill all the fields</p>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}