import React, { useState } from "react";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        'date': '', 'patient': 3, 'slot': ''
    })
    function updateFormData(e) {
        setFormData(pre => { 
            return {
                ...pre,
                [e.target.name] : e.target.value,
            }
        });
    }

    function handelSubmit(){
        console.log(formData)
    }

    const data = [
        {
            "age": 32,
            "disease": "fever",
            "gender": "male",
            "id": 2,
            "name": "Karan Yadav",
            "phone": "948435"
        },
        {
            "age": 20,
            "disease": "low bp",
            "gender": "female",
            "id": 3,
            "name": "Swati Singh",
            "phone": "900235"
        },
        {
            "age": 23,
            "disease": "dengue",
            "gender": "Male",
            "id": 4,
            "name": "Rohit Dale",
            "phone": "453213"
        }
    ]

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50">
                <div className="row mb-3">
                    <label htmlFor="date" className="col-sm-2 col-form-label">Date :</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" value={formData['date']} onChange={(e) => { updateFormData(e) }} name="date" id="date" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="patient" className="col-sm-2 col-form-label">Patient :</label>
                    <div className="col-sm-10">
                        <select name="patient" id="patient" value={formData['patient']} onChange={(e) => { updateFormData(e) }} className="form-select">
                            {
                                data.map(patient => <option key={patient['id']} value={patient['id']}>{patient['name']}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="slot" className="col-sm-2 col-form-label">Slot :</label>
                    <div className="col-sm-10">
                        <select name="slot" id="slot" value={formData['slot']} onChange={(e) => { updateFormData(e) }} className="form-select">
                            <option value={1}>Slot 1</option>
                            <option value={2}>Slot 2</option>
                            <option value={3}>Slot 3</option>
                            <option value={4}>Slot 4</option>
                            <option value={5}>Slot 5</option>
                            <option value={6}>Slot 6</option>
                        </select>
                    </div>
                </div>
                <button type="button" onClick={handelSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}