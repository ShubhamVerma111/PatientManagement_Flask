import React from "react";

export default function Model({ modelData, setModelData, onCloseModel }) {

    async function handelDelete() {
        try {
            let response = await fetch(modelData.data.url, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.reload();
            } else if (response.status === 409) {
                let res = await response.json();
                let message = res.message;
                setModelData({
                    'type': 'Error',
                    'data': {
                        message
                    }
                })
            }
        } catch (error) {
            console.error('Error in delete : ', error)
        }

    }

    return (
        <div className="modal fade show bg-dark bg-opacity-50" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{modelData['data']['message']}</h1>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCloseModel}>{modelData['type'] === "action" ? "Cancel" : "Ok"}</button>
                        {modelData['type'] === "action" &&
                            <button type="button" onClick={handelDelete} className="btn btn-danger">Delete</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}