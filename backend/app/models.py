from app import db


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    disease = db.Column(db.String(300), nullable=False)
    appointments = db.relationship('Appointment', backref="patient", lazy=True)

    def __init__(self, name, age, disease):
        self.name = name
        self.age = age
        self.disease =disease
    
    def __repr__(self):
        return f'<Patient {self.name}>'

    def format_to_json(self):
        return { 'id' : self.id,
            'name' : self.name,
            'age' : self.age,
            'disease' : self.disease }

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.Date, nullable=False)
    slot = db.Column(db.Integer, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey(Patient.id), nullable=False)
    
    def __repr__(self):
        return f'<Appointment {self.id}>'

    def format_to_json(self):
        patient = Patient.query.get(self.patient_id)
        return { 'id' : self.id,
            'appointment_date' : self.appointment_date.strftime("%d/%m/%y"),
            'slot' : self.slot,
            'patient_name' : patient.name,
            'patient_id' : self.patient_id }
