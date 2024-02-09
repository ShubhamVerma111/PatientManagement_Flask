import React from "react";

export default function Model({ modelData }) {
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
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}