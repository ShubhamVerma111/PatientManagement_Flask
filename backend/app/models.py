from app import db


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    disease = db.Column(db.String(300), nullable=False)
    phone = db.Column(db.String(10), nullable=True)
    appointments = db.relationship('Appointment', backref="patient", lazy=True)

    def __init__(self, name, gender, age, disease, phone):
        self.name = name
        self.gender = gender
        self.age = age
        self.disease =disease
        self.phone = phone
    
    def __repr__(self):
        return f'<Patient {self.name}>'

    def format_to_json(self):
        return { 'id' : self.id,
            'name' : self.name,
            'age' : self.age,
            'gender' : self.gender,
            'disease' : self.disease,
            'phone' : self.phone }

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.Date, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey(Patient.id), nullable=False)
    
    def __repr__(self):
        return f'<Appointment {self.id}>'
