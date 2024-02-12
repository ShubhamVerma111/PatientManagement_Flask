from app import app, db
from app.models import Patient, Appointment
from flask import jsonify, request

@app.route('/')
def index():
    return jsonify({"message":"welcome to index page"})

@app.route('/list_patients')
def list_patients():
    patients = Patient.query.all()
    patients_list = [patient.format_to_json() for patient in patients]
    return jsonify(patients_list)

@app.route("/patient/<int:patient_id>", methods=['get', 'delete', 'patch'])
def getPatient(patient_id):
    patient = Patient.query.get(patient_id)
    if patient is None:
        return jsonify({'message':"patient not fount"}), 404
    elif request.method == "GET" :
        return jsonify(patient.format_to_json())
    elif request.method == "DELETE" :
        ifPatientHasAppointment = Appointment.query.filter_by(patient_id=patient_id).first()
        if ifPatientHasAppointment:
            return jsonify({'message':"patient has appointment", 'data':ifPatientHasAppointment.format_to_json()}), 409
    
        db.session.delete(patient)
        db.session.commit()
        return {"message":"successfully deleted"}
    elif request.method == "PATCH":
        data = request.get_json()
        patient.name = data["name"]
        patient.age = data["age"]
        patient.disease = data["disease"]
        db.session.commit()
        return {"message":"successfully Updated"}


@app.route('/add_patient', methods=["post"])
def add_patient():
    data = request.get_json()
    newPatient = Patient(data["name"], data["age"], data["disease"])
    db.session.add(newPatient)
    db.session.commit()
    if newPatient is None:
        return jsonify({'message':"patient not fount"}), 404
    return {"message":"successfully added", 'newPatient':newPatient.format_to_json()}

@app.route('/appointments')
def list_appointments():
    appointments = Appointment.query.all()
    appointments_list = [appointment.format_to_json() for appointment in appointments]
    return jsonify(appointments_list)

@app.route('/add_appointment', methods=["post"])
def add_appointment():
    data = request.get_json()
    patient_id = data.get('patient_id')
    slot = data.get('slot')
    date = data.get('date')

    if not patient_id or not date or not slot:
        return jsonify({'message':'missing patient id or date or slot'}), 404
    
    patient = Patient.query.get(patient_id)
    if patient is None:
        return jsonify({'message':"patient not fount"}), 404

    ifPatientHasAppointment = Appointment.query.filter_by(patient_id=patient_id).first()
    if ifPatientHasAppointment:
        return jsonify({'message':"patient appointment already scheduled", 'data':ifPatientHasAppointment.format_to_json()}), 409
    
    ifAppointmentSlotBooked = Appointment.query.filter_by(appointment_date=date, slot=slot).all()
    if ifAppointmentSlotBooked:
        return jsonify({'message':"appointment slot Booked"}), 409

    appointment = Appointment(appointment_date=date, slot=slot, patient=patient)
    db.session.add(appointment)
    db.session.commit()
    return jsonify({"message":"appointment successfully added"}), 201

@app.route('/appointment/<int:appointment_id>', methods=["get","patch", "delete"])
def update_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
       return jsonify({'message':"appointment not fount"}), 404

    if request.method == "GET":
        return jsonify(appointment.format_to_json())
 
    elif request.method == "PATCH":
        new_date = request.get_json().get('appointment_date')
        new_slot = request.get_json().get('slot')
        if not new_date or not new_slot:
            return jsonify({'message':'missing new date or slot'}), 404
        appointment.appointment_date = new_date
        appointment.slot = new_slot
        db.session.commit()
        return {"message":"successfully resechudeled appointment"}

    elif request.method == "DELETE":
        db.session.delete(appointment)
        db.session.commit()
        return {"message":"successfully canceled appointment"}