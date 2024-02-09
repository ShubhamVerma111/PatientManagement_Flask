import React, { useState } from "react";

export default function PatientForm() {
    const [formData, setFormData] = useState({
        'name': '', 'age': '', 'disease': ''
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

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50">
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
                        <input type="text" className="form-control" name="disease" value={formData['disease']} onChange={(e) => { updateFormData(e) }} id="disease" required />
                    </div>
                </div>
                <button type="button" onClick={handelSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}