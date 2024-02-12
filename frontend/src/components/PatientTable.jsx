import React, { useEffect, useState } from "react";

export default function PatientTable({ setModelData }) {
    const [data, setData] = useState([]);
    function handelPatientDelete(patient) {
        const type = "action";
        const data = {
            'message': `Do you want to delete ${patient['name']}?`,
            'url': `http://localhost:5000/patient/${patient.id}`
        }
        setModelData({ type, data })
    }

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/list_patients');
                const data = await response.json()
                setData(data);
            } catch (error) {
                console.error('Error in fetch : ', error);
            }
        };
        fetchData();
    },[])

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