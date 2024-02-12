import React from "react";
import { useNavigate } from "react-router-dom";

export default function Model({ modelData }) {
    const navigate = useNavigate();

    async function handelDelete(){
        try {
            let response = await fetch(modelData.data.url, {
                method: 'DELETE'
            });
            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error in delete : ', error)
        }
        
    }

    return (

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{modelData['data']['message']}</h1>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{modelData['type'] === "action" ? "Cancel" : "Ok"}</button>
                        {modelData['type'] === "action" &&
                            <button type="button" onClick={handelDelete} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}