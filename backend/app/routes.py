from app import app, db
from app.models import Patient
from flask import jsonify, request, abort

@app.route('/')
def index():
    return jsonify({"message":"welcome to index page"})

@app.route('/list_patients')
def list_patients():
    patients = Patient.query.all()
    patients_list = [patient.format_to_json() for patient in patients]
    return jsonify(patients_list)

@app.route("/patient/<int:patientId>", methods=['get', 'delete', 'patch'])
def getPatient(patientId):
    patient = Patient.query.get(patientId)
    if patient is None:
        return abort(404, description="patient not fount")
    elif request.method == "GET" :
        return jsonify(patient.format_to_json())
    elif request.method == "DELETE" :
        db.session.delete(patient)
        db.session.commit()
        return {"message":"successfully deleted"}
    elif request.method == "PATCH":
        data = request.get_json()
        patient.name = data["name"]
        patient.gender = data["gender"]
        patient.age = data["age"]
        patient.disease = data["disease"]
        patient.phone = data["phone"]
        db.session.commit()
        return {"message":"successfully Updated"}


@app.route('/add_patient', methods=["post"])
def add_patient():
    data = request.get_json()
    newPatient = Patient(data["name"], data["gender"], data["age"], data["disease"], data["phone"])
    db.session.add(newPatient)
    db.session.commit()
    if newPatient is None:
        abort(404, description="patient not fount")
    return {"message":"successfully added", 'newPatient':newPatient.format_to_json()}