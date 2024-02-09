import React from "react";

export default function AppointmentTable() {
    const data = [
        {
            "appointment_date": "15/02/24",
            "id": 1,
            "patient_id": 2,
            "patient_name": "Krishna Yadav",
            "slot": 1
        },
        {
            "appointment_date": "20/02/24",
            "id": 2,
            "patient_id": 1,
            "patient_name": "Swati Sharma",
            "slot": 1
        }
    ]
    return (
        <div className="mx-5 mt-5">
            <div className="fs-1 text-center mb-2">Appointments</div>
            <table className="table table-striped border ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th>Patient</th>
                        <th>Appointment Date</th>
                        <th>Slot</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item['patient_name']}</td>
                                <td>{item['appointment_date']}</td>
                                <td>{item['slot']}</td>
                                <td>
                                    <a className="me-3 text-dark" href=""><i class="far fa-edit"></i></a>
                                    <a className="me-3 text-dark" href=""><i class="far fa-address-book"></i></a>
                                    <a className="text-danger" href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-trash-alt"></i></a>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}