import React, { useEffect, useState } from "react";

export default function AppointmentTable({ setModelData, toggleModel }) {
    const [data, setData] = useState([]);
    function handelAppointmentDelete(appointment) {
        const type = "action";
        const data = {
            'message': `Would you like to cancel ${appointment['patient_name']}'s appointment?`,
            'url': `http://localhost:5000/appointment/${appointment.id}`
        }
        setModelData({ type, data })
        toggleModel();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/appointments');
                const data = await response.json()
                setData(data);
            } catch (error) {
                console.error('Error in fetch : ', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="mx-5">
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
                                    <a className="me-3 text-dark" href={`/add_appointment/${item.id}`}><i className="far fa-edit"></i></a>
                                    <span className="text-danger" onClick={() => { handelAppointmentDelete(item) }}><i className="fas fa-trash-alt"></i></span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}