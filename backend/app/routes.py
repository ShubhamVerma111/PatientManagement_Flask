from app import app
from app.models import Patient
from flask import jsonify

@app.route('/')
def index():
    return jsonify({"message":"welcome to index page"})

@app.route('/list_patients')
def list_patients():
    patients = Patient.query.all()
    patients_list = [patient.format_to_json() for patient in patients]
    return jsonify(patients_list)
