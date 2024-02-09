import React from "react";

export default function PatientTable({ setModelData }) {
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
    function handelPatientDelete(patient) {
        const type = "action";
        const data = {
            'message': `Do you want to delete ${patient['name']}?`,
            'id': patient.id
        }
        setModelData({ type, data })
    }
    return (
        <div className="mx-5 mt-5">
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
                        data.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item['name']}</td>
                                <td>{item['disease']}</td>
                                <td>{item['age']}</td>
                                <td>
                                    <a className="me-3 text-dark" href=""><i className="far fa-edit"></i></a>
                                    <a className="me-3 text-dark" href=""><i className="far fa-address-book"></i></a>
                                    <span className="text-danger" onClick={() => { handelPatientDelete(item) }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fas fa-trash-alt"></i></span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}