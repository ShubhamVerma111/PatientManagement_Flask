import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AppointmentForm({ patientData, setModelData, toggleModel }) {
    const navigate = useNavigate();
    const { appointment_id } = useParams();
    const [formData, setFormData] = useState({ 'appointment_date': '', 'patient_id': '', 'slot': '' });
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
        if (formData['appointment_date'] == '' || formData['patient_id'] == '' || formData['slot'] == '') setIsMissing(true)
        else {
            setIsMissing(false);
            try {
                let response;
                if (appointment_id) {
                    console.log(formData);
                    response = await fetch(`http://localhost:5000/appointment/${appointment_id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                }
                else {
                    response = await fetch("http://localhost:5000/add_appointment", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                }
                if (response.ok) {
                    navigate('/appointments');
                } else {
                    let res = await response.json();
                    let message = res.message
                    setModelData({
                        'type': 'Error',
                        'data': {
                            message
                        }
                    })
                    toggleModel();
                }
            } catch (error) {
                console.error('Error posting data : ', error);
            }
        }
    }

    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    useEffect(() => {
        async function fetchData(appointment_id) {
            try {
                const response = await fetch(`http://localhost:5000/appointment/${appointment_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({ ...data, 'appointment_date': formatDate(data['appointment_date']) });
                } else {
                    console.error("error in fetch appointment");
                }
            } catch (error) {
                console.error('error in fetch', error);
            }
        }
        if (appointment_id) fetchData(appointment_id);
    }, [appointment_id])

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50">
                <div className="row mb-3">
                    <label htmlFor="date" className="col-sm-2 col-form-label">Date :</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" value={formData['appointment_date']} onChange={(e) => { updateFormData(e) }} name="date" id="appointment_date" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="patient" className="col-sm-2 col-form-label">Patient :</label>
                    <div className="col-sm-10">
                        <select name="patient_id" id="patient" value={formData['patient_id']} onChange={(e) => { updateFormData(e) }} className="form-select">
                            <option value=''>(Select Patient)</option>
                            {
                                patientData.map(patient => <option key={patient['id']} value={patient['id']}>{patient['name']}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="slot" className="col-sm-2 col-form-label">Slot :</label>
                    <div className="col-sm-10">
                        <select name="slot" id="slot" value={formData['slot']} onChange={(e) => { updateFormData(e) }} className="form-select">
                            <option value=''>(choose slot)</option>
                            <option value={1}>Slot 1</option>
                            <option value={2}>Slot 2</option>
                            <option value={3}>Slot 3</option>
                            <option value={4}>Slot 4</option>
                            <option value={5}>Slot 5</option>
                            <option value={6}>Slot 6</option>
                        </select>
                    </div>
                </div>
                {isMissing && <p className="text-danger text-center">Please fill all the fields</p>}
                <button type="button" onClick={handelSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}