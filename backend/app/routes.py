from app import app
from app.models import Patient
from flask import jsonify

@app.route('/')
def index():
    users = Patient.query.all()
    return jsonify({"message":"successfully"})