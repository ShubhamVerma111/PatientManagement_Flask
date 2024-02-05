from app import db


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    disease = db.Column(db.String(300), nullable=False)
    phone = db.Column(db.String(10), nullable=True)
    appointments = db.relationship('Appointment', backref="patient", lazy=True)
    
    def __repr__(self):
        return f'<Patient {self.name}>'

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.Date, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey(Patient.id), nullable=False)
    
    def __repr__(self):
        return f'<Appointment {self.id}>'
