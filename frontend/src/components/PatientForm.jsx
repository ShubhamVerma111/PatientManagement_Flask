import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function PatientForm() {
    const navigate = useNavigate();
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
                const response = await fetch("http://localhost:5000/add_patient", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error posting data : ', error);
            }

        }
    }

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