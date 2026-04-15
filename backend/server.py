from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone, date, time
from bson import ObjectId
import os
import hashlib
import secrets
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NEMS API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
if DB_NAME and DB_NAME.startswith('"') and DB_NAME.endswith('"'):
    DB_NAME = DB_NAME.strip('"')
if MONGO_URL and MONGO_URL.startswith('"') and MONGO_URL.endswith('"'):
    MONGO_URL = MONGO_URL.strip('"')
client = MongoClient(MONGO_URL)
db = client[DB_NAME]

# Collections
users_col = db["users"]
students_col = db["students"]
regions_col = db["regions"]
exams_col = db["exams"]
exam_centers_col = db["exam_centers"]
rooms_col = db["rooms"]
registrations_col = db["registrations"]
payments_col = db["payments"]
schedules_col = db["exam_schedules"]
seat_allocations_col = db["seat_allocations"]
invigilators_col = db["invigilators"]
invigilator_assignments_col = db["invigilator_assignments"]
attendance_col = db["attendance"]
evaluators_col = db["evaluators"]
evaluations_col = db["evaluations"]
results_col = db["results"]
grievances_col = db["grievances"]
malpractice_col = db["malpractice_reports"]
audit_logs_col = db["audit_logs"]

# ============ HELPERS ============
def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{hashed}"

def verify_password(password: str, stored: str) -> bool:
    salt, hashed = stored.split(":")
    return hashlib.sha256((password + salt).encode()).hexdigest() == hashed

def serialize_doc(doc):
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    return doc

def serialize_list(cursor):
    return [serialize_doc(doc) for doc in cursor]

# Simple token auth
active_tokens = {}

def get_current_user(token: str = None):
    if token and token in active_tokens:
        return active_tokens[token]
    return None

# ============ MODELS ============
class AuthRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    fullName: str
    phone: Optional[str] = ""
    dateOfBirth: Optional[str] = ""
    gender: Optional[str] = "Male"

class GrievanceRequest(BaseModel):
    examId: str
    category: str
    description: str

class StudentUpdateRequest(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    category: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    address: Optional[str] = None

class ExamRequest(BaseModel):
    examCode: str
    examName: str
    level: Optional[str] = "National"
    durationMinutes: Optional[int] = 180
    description: Optional[str] = ""

class ScheduleRequest(BaseModel):
    examId: str
    centerId: str
    examDate: str
    startTime: str
    endTime: str
    subject: str

class RoomAssignRequest(BaseModel):
    scheduleId: str
    studentId: str
    roomId: str
    seatNumber: str

class ResultRequest(BaseModel):
    studentId: str
    examId: str
    totalMarks: int
    marksObtained: int
    grade: str
    status: str
    rank: Optional[int] = None

# ============ SEED DATA ============
def seed_data():
    # Only seed if empty
    if users_col.count_documents({}) > 0:
        return

    # Admin user
    users_col.insert_one({
        "email": "admin@nems.com",
        "password": hash_password("admin123"),
        "fullName": "System Administrator",
        "phone": "9999999999",
        "role": "ADMIN",
        "active": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    })

    # 10 Student Users
    student_names = [
        ("Rahul Sharma", "student1@example.com", "9876543210"),
        ("Priya Patel", "student2@example.com", "9876543211"),
        ("Amit Kumar", "student3@example.com", "9876543212"),
        ("Sneha Reddy", "student4@example.com", "9876543213"),
        ("Vikram Singh", "student5@example.com", "9876543214"),
        ("Anjali Gupta", "student6@example.com", "9876543215"),
        ("Karthik Nair", "student7@example.com", "9876543216"),
        ("Divya Menon", "student8@example.com", "9876543217"),
        ("Arjun Verma", "student9@example.com", "9876543218"),
        ("Neha Joshi", "student10@example.com", "9876543219"),
    ]

    for i, (name, email, phone) in enumerate(student_names, 1):
        user_id = users_col.insert_one({
            "email": email,
            "password": hash_password("password123"),
            "fullName": name,
            "phone": phone,
            "role": "STUDENT",
            "active": True,
            "createdAt": datetime.now(timezone.utc).isoformat()
        }).inserted_id

        students_col.insert_one({
            "userId": str(user_id),
            "studentId": f"STD2024{i:03d}",
            "fullName": name,
            "email": email,
            "dateOfBirth": f"200{5 if i%2==0 else 4}-{i:02d}-{15+i}",
            "gender": "Male" if i % 2 != 0 else "Female",
            "category": ["GEN", "OBC", "SC", "ST", "GEN"][i % 5],
            "address": f"{i*100} Main Street",
            "city": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"][i-1],
            "state": ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal", "Telangana", "Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh"][i-1],
            "pincode": f"{100001 + i*50000}",
            "isPwd": i == 10,
            "createdAt": datetime.now(timezone.utc).isoformat()
        })

    # 10 Regions
    region_data = [
        ("REG001", "North Delhi Region", "Delhi"),
        ("REG002", "Mumbai Central Region", "Maharashtra"),
        ("REG003", "Bangalore South Region", "Karnataka"),
        ("REG004", "Chennai Metro Region", "Tamil Nadu"),
        ("REG005", "Kolkata East Region", "West Bengal"),
        ("REG006", "Hyderabad Tech Region", "Telangana"),
        ("REG007", "Pune Education Region", "Maharashtra"),
        ("REG008", "Ahmedabad West Region", "Gujarat"),
        ("REG009", "Jaipur Heritage Region", "Rajasthan"),
        ("REG010", "Lucknow Central Region", "Uttar Pradesh"),
    ]
    for code, name, state in region_data:
        regions_col.insert_one({"regionCode": code, "regionName": name, "state": state, "active": True})

    # 10 Exams
    exam_data = [
        ("JEE2024", "Joint Entrance Examination", "National", 180),
        ("NEET2024", "National Eligibility Entrance Test", "National", 180),
        ("GATE2024", "Graduate Aptitude Test Engineering", "National", 180),
        ("CAT2024", "Common Admission Test", "National", 180),
        ("UPSC2024", "Civil Services Examination", "National", 120),
        ("SSC2024", "Staff Selection Commission", "National", 60),
        ("IBPS2024", "Banking Personnel Selection", "National", 120),
        ("NET2024", "National Eligibility Test", "National", 180),
        ("CLAT2024", "Common Law Admission Test", "National", 120),
        ("AIIMS2024", "AIIMS Entrance Exam", "National", 210),
    ]
    exam_ids = []
    for code, name, level, duration in exam_data:
        eid = exams_col.insert_one({"examCode": code, "examName": name, "level": level, "durationMinutes": duration, "active": True}).inserted_id
        exam_ids.append(str(eid))

    # 10 Exam Centers
    center_data = [
        ("CTR001", "Delhi Public School", "New Delhi", "Delhi", 500),
        ("CTR002", "IIT Bombay Campus", "Mumbai", "Maharashtra", 1000),
        ("CTR003", "Bangalore University", "Bangalore", "Karnataka", 800),
        ("CTR004", "Anna University", "Chennai", "Tamil Nadu", 750),
        ("CTR005", "Jadavpur University", "Kolkata", "West Bengal", 600),
        ("CTR006", "JNTU Hyderabad", "Hyderabad", "Telangana", 900),
        ("CTR007", "SPPU Pune", "Pune", "Maharashtra", 700),
        ("CTR008", "Gujarat University", "Ahmedabad", "Gujarat", 650),
        ("CTR009", "Rajasthan University", "Jaipur", "Rajasthan", 550),
        ("CTR010", "Lucknow University", "Lucknow", "Uttar Pradesh", 600),
    ]
    center_ids = []
    for code, name, city, state, cap in center_data:
        cid = exam_centers_col.insert_one({"centerCode": code, "centerName": name, "city": city, "state": state, "totalCapacity": cap, "active": True}).inserted_id
        center_ids.append(str(cid))

    # 10 Rooms
    room_ids = []
    for i in range(10):
        rid = rooms_col.insert_one({
            "centerId": center_ids[i],
            "centerName": center_data[i][1],
            "roomNumber": f"R{(i+1)*100+1}",
            "capacity": 50 + i * 10,
            "floor": ["Ground Floor", "First Floor", "Second Floor"][i % 3],
            "active": True
        }).inserted_id
        room_ids.append(str(rid))

    # 10 Registrations
    all_students = list(students_col.find({}, {"_id": 1, "studentId": 1, "fullName": 1}))
    for i, student in enumerate(all_students):
        registrations_col.insert_one({
            "studentId": str(student["_id"]),
            "studentName": student["fullName"],
            "examId": exam_ids[i],
            "examName": exam_data[i][1],
            "registrationNumber": f"REG2024{i+1:03d}",
            "status": ["CONFIRMED", "CONFIRMED", "CONFIRMED", "CONFIRMED", "PENDING", "CONFIRMED", "CONFIRMED", "CONFIRMED", "CANCELLED", "CONFIRMED"][i],
            "amount": [1500, 1600, 1750, 2000, 1200, 850, 950, 1100, 1400, 1800][i],
            "paymentCompleted": i not in [4, 8],
            "createdAt": datetime.now(timezone.utc).isoformat()
        })

    # 10 Payments
    for i in range(10):
        payments_col.insert_one({
            "registrationNumber": f"REG2024{i+1:03d}",
            "transactionId": f"TXN2024{i+1:03d}",
            "amount": [1500, 1600, 1750, 2000, 1200, 850, 950, 1100, 1400, 1800][i],
            "paymentMode": ["UPI", "CARD", "NET_BANKING"][i % 3],
            "status": ["SUCCESS", "SUCCESS", "SUCCESS", "SUCCESS", "PENDING", "SUCCESS", "SUCCESS", "SUCCESS", "FAILED", "SUCCESS"][i],
            "paymentDate": datetime.now(timezone.utc).isoformat()
        })

    # 10 Exam Schedules
    subjects = ["Mathematics", "Biology", "Computer Science", "Quantitative Aptitude", "General Studies", "Reasoning", "Banking Awareness", "Research Methodology", "Legal Aptitude", "Physics Chemistry Biology"]
    schedule_ids = []
    for i in range(10):
        sid = schedules_col.insert_one({
            "examId": exam_ids[i],
            "examName": exam_data[i][1],
            "centerId": center_ids[i],
            "centerName": center_data[i][1],
            "examDate": f"2024-05-{15+i}",
            "startTime": f"0{9+i%3}:00",
            "endTime": f"{12+i%2}:00",
            "subject": subjects[i],
            "active": True
        }).inserted_id
        schedule_ids.append(str(sid))

    # 10 Seat Allocations
    for i, student in enumerate(all_students):
        seat_allocations_col.insert_one({
            "scheduleId": schedule_ids[i],
            "examName": exam_data[i][1],
            "examDate": f"2024-05-{15+i}",
            "startTime": f"0{9+i%3}:00",
            "endTime": f"{12+i%2}:00",
            "subject": subjects[i],
            "studentId": str(student["_id"]),
            "studentName": student["fullName"],
            "roomId": room_ids[i],
            "roomNumber": f"R{(i+1)*100+1}",
            "centerName": center_data[i][1],
            "seatNumber": f"S{i+1:03d}",
        })

    # 10 Invigilators
    inv_names = ["Dr. Rajesh Kumar", "Prof. Meena Iyer", "Dr. Suresh Babu", "Prof. Lakshmi Devi", "Dr. Anil Deshmukh",
                  "Prof. Kavita Rao", "Dr. Prakash Joshi", "Prof. Sunita Mehta", "Dr. Ramesh Pillai", "Prof. Pooja Sharma"]
    for i, name in enumerate(inv_names):
        uid = users_col.insert_one({
            "email": f"invigilator{i+1}@nems.com",
            "password": hash_password("inv123"),
            "fullName": name, "phone": f"912345678{i+1}", "role": "INVIGILATOR", "active": True
        }).inserted_id
        invigilators_col.insert_one({
            "userId": str(uid), "invigilatorId": f"INV2024{i+1:03d}", "fullName": name,
            "qualification": ["Ph.D.", "M.Sc.", "Ph.D.", "M.A.", "Ph.D.", "M.Sc.", "Ph.D.", "M.Com.", "Ph.D.", "M.Sc."][i],
            "institution": center_data[i][1], "experienceYears": 6 + i, "active": True
        })

    # 10 Invigilator Assignments
    all_invs = list(invigilators_col.find({}, {"_id": 1, "fullName": 1}))
    for i in range(10):
        invigilator_assignments_col.insert_one({
            "invigilatorId": str(all_invs[i]["_id"]), "invigilatorName": all_invs[i]["fullName"],
            "scheduleId": schedule_ids[i], "roomId": room_ids[i],
            "role": "CHIEF" if i % 2 == 0 else "ASSISTANT"
        })

    # 10 Attendance Records
    for i, student in enumerate(all_students):
        attendance_col.insert_one({
            "studentId": str(student["_id"]), "studentName": student["fullName"],
            "scheduleId": schedule_ids[i], "seatNumber": f"S{i+1:03d}",
            "status": ["PRESENT", "PRESENT", "LATE", "PRESENT", "ABSENT", "PRESENT", "PRESENT", "PRESENT", "LATE", "PRESENT"][i],
            "checkInTime": f"2024-05-{15+i} 08:{45+i}:00" if i != 4 else None,
            "remarks": ["On time", "On time", "15 min late", "On time", "Did not appear", "On time", "On time", "On time", "20 min late", "On time"][i]
        })

    # 10 Evaluators
    eval_names = ["Dr. Ashok Verma", "Prof. Shalini Das", "Dr. Vijay Rathore", "Prof. Nandini Kulkarni", "Dr. Manoj Tiwari",
                   "Prof. Rekha Nair", "Dr. Sandeep Gupta", "Prof. Usha Rani", "Dr. Deepak Malhotra", "Prof. Geeta Bose"]
    for i, name in enumerate(eval_names):
        uid = users_col.insert_one({
            "email": f"evaluator{i+1}@nems.com",
            "password": hash_password("eval123"),
            "fullName": name, "phone": f"923456789{i+1}", "role": "EVALUATOR", "active": True
        }).inserted_id
        evaluators_col.insert_one({
            "userId": str(uid), "evaluatorId": f"EVAL2024{i+1:03d}", "fullName": name,
            "specialization": subjects[i], "institution": center_data[i][1],
            "experienceYears": 12 + i, "active": True
        })

    # 10 Evaluations
    marks = [85, 92, 78, 88, 0, 75, 82, 90, 0, 95]
    for i, student in enumerate(all_students):
        evaluations_col.insert_one({
            "studentId": str(student["_id"]), "studentName": student["fullName"],
            "examId": exam_ids[i], "examName": exam_data[i][1],
            "evaluatorName": eval_names[i], "subject": subjects[i],
            "marksObtained": marks[i], "totalMarks": 100,
            "status": "COMPLETED" if marks[i] > 0 else "PENDING",
            "remarks": ["Good", "Excellent", "Average", "Very good", "Absent", "Satisfactory", "Good knowledge", "Outstanding", "Cancelled", "Excellent"][i]
        })

    # 10 Results
    percentages = [85.0, 92.0, 78.0, 88.0, 0.0, 75.0, 82.0, 90.0, 0.0, 95.0]
    grades = ["A", "A+", "B+", "A", "F", "B", "A-", "A+", "F", "A+"]
    ranks = [45, 12, 89, 34, None, 156, 67, 23, None, 5]
    for i, student in enumerate(all_students):
        results_col.insert_one({
            "studentId": str(student["_id"]), "studentName": student["fullName"],
            "examId": exam_ids[i], "examName": exam_data[i][1],
            "totalMarks": [300, 360, 300, 300, 200, 100, 200, 300, 200, 360][i],
            "marksObtained": [255, 331, 234, 264, 0, 75, 164, 270, 0, 342][i],
            "percentage": percentages[i], "grade": grades[i],
            "status": "PASS" if percentages[i] > 0 else "FAIL",
            "rank": ranks[i],
            "publishedAt": datetime.now(timezone.utc).isoformat() if ranks[i] else None
        })

    # 10 Grievances
    grv_data = [
        ("RESULT", "Marks mismatch in mathematics section", "RESOLVED", "Marks recalculated"),
        ("EVALUATION", "Request for answer script review", "UNDER_REVIEW", None),
        ("ATTENDANCE", "Marked absent but was present", "RESOLVED", "Corrected after verification"),
        ("OTHER", "Issue with admit card download", "RESOLVED", "Technical issue fixed"),
        ("RESULT", "Result not published", "PENDING", None),
        ("EVALUATION", "Question paper had printing error", "RESOLVED", "Grace marks awarded"),
        ("ATTENDANCE", "Biometric system failure", "UNDER_REVIEW", None),
        ("RESULT", "Grade calculation incorrect", "REJECTED", "Found correct after review"),
        ("OTHER", "Refund request for cancelled exam", "PENDING", None),
        ("EVALUATION", "Request for re-evaluation", "UNDER_REVIEW", None),
    ]
    for i, (cat, desc, status, resolution) in enumerate(grv_data):
        grievances_col.insert_one({
            "studentId": str(all_students[i]["_id"]), "studentName": all_students[i]["fullName"],
            "examId": exam_ids[i], "examName": exam_data[i][1],
            "grievanceNumber": f"GRV2024{i+1:03d}", "category": cat,
            "description": desc, "status": status, "resolution": resolution,
            "createdAt": datetime.now(timezone.utc).isoformat()
        })

    # 10 Malpractice Reports
    incident_types = ["MOBILE_PHONE", "IMPERSONATION", "CHEATING", "SUSPICIOUS_BEHAVIOR", "MOBILE_PHONE",
                       "CHEATING", "SUSPICIOUS_BEHAVIOR", "MOBILE_PHONE", "IMPERSONATION", "CHEATING"]
    for i in range(10):
        malpractice_col.insert_one({
            "studentName": all_students[i]["fullName"],
            "scheduleId": schedule_ids[i],
            "reportedBy": inv_names[i],
            "incidentType": incident_types[i],
            "description": f"Malpractice incident #{i+1}",
            "status": ["ACTION_TAKEN", "UNDER_INVESTIGATION", "ACTION_TAKEN", "REPORTED", "ACTION_TAKEN"][i % 5],
            "reportedAt": datetime.now(timezone.utc).isoformat()
        })

    # 10 Audit Logs
    for i in range(10):
        audit_logs_col.insert_one({
            "action": ["LOGIN", "CREATE", "UPDATE", "CREATE", "CREATE", "UPDATE", "CREATE", "CREATE", "UPDATE", "CREATE"][i],
            "entityType": ["USER", "REGISTRATION", "STUDENT", "EXAM", "ATTENDANCE", "EVALUATION", "RESULT", "GRIEVANCE", "GRIEVANCE", "MALPRACTICE"][i],
            "details": f"Action #{i+1} performed",
            "ipAddress": f"192.168.1.{i+1}",
            "timestamp": datetime.now(timezone.utc).isoformat()
        })

    print("Database seeded with 10 records per module!")

# Run seed on startup
seed_data()

# ============ ROUTES ============

@app.get("/api/health")
def health():
    return {"status": "UP", "application": "NEMS", "message": "All services running"}

# Auth
@app.post("/api/auth/login")
def login_user(req: AuthRequest):
    user = users_col.find_one({"email": req.email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(req.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = secrets.token_hex(32)
    active_tokens[token] = {"email": user["email"], "fullName": user["fullName"], "role": user["role"]}
    return {"token": token, "email": user["email"], "fullName": user["fullName"], "role": user["role"]}

@app.post("/api/auth/register")
def register_user(req: RegisterRequest):
    if users_col.find_one({"email": req.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    user_data = {
        "email": req.email, "password": hash_password(req.password),
        "fullName": req.fullName, "phone": req.phone, "role": "STUDENT", "active": True,
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
    uid = users_col.insert_one(user_data).inserted_id
    sid = f"STD{int(datetime.now(timezone.utc).timestamp())}"
    students_col.insert_one({
        "userId": str(uid), "studentId": sid, "fullName": req.fullName, "email": req.email,
        "dateOfBirth": req.dateOfBirth, "gender": req.gender, "category": "GEN",
        "createdAt": datetime.now(timezone.utc).isoformat()
    })
    token = secrets.token_hex(32)
    active_tokens[token] = {"email": req.email, "fullName": req.fullName, "role": "STUDENT"}
    return {"token": token, "email": req.email, "fullName": req.fullName, "role": "STUDENT"}

# Module 1: Master Reference Data
@app.get("/api/regions")
def get_regions():
    return serialize_list(regions_col.find())

@app.get("/api/exams")
def get_exams():
    return serialize_list(exams_col.find())

@app.get("/api/exam-centers")
def get_exam_centers():
    return serialize_list(exam_centers_col.find())

@app.get("/api/rooms")
def get_rooms():
    return serialize_list(rooms_col.find())

# Module 2: Students & Registrations
@app.get("/api/students")
def get_students():
    return serialize_list(students_col.find())

@app.get("/api/students/{student_id}")
def get_student(student_id: str):
    s = students_col.find_one({"studentId": student_id})
    if not s:
        raise HTTPException(status_code=404, detail="Student not found")
    return serialize_doc(s)

@app.get("/api/registrations")
def get_registrations():
    return serialize_list(registrations_col.find())

@app.get("/api/payments")
def get_payments():
    return serialize_list(payments_col.find())

# Module 3: Exam Scheduling
@app.get("/api/schedules")
def get_schedules():
    return serialize_list(schedules_col.find())

@app.get("/api/seat-allocations")
def get_seat_allocations():
    return serialize_list(seat_allocations_col.find())

# Module 4: Invigilators
@app.get("/api/invigilators")
def get_invigilators():
    return serialize_list(invigilators_col.find())

@app.get("/api/invigilator-assignments")
def get_invigilator_assignments():
    return serialize_list(invigilator_assignments_col.find())

# Module 5: Attendance
@app.get("/api/attendance")
def get_attendance():
    return serialize_list(attendance_col.find())

@app.get("/api/attendance/stats")
def get_attendance_stats():
    total = attendance_col.count_documents({})
    present = attendance_col.count_documents({"status": "PRESENT"})
    absent = attendance_col.count_documents({"status": "ABSENT"})
    late = attendance_col.count_documents({"status": "LATE"})
    return {"total": total, "present": present, "absent": absent, "late": late}

# Module 6: Evaluation
@app.get("/api/evaluators")
def get_evaluators():
    return serialize_list(evaluators_col.find())

@app.get("/api/evaluations")
def get_evaluations():
    return serialize_list(evaluations_col.find())

# Module 7: Results
@app.get("/api/results")
def get_results():
    return serialize_list(results_col.find())

# Module 8: Grievances
@app.get("/api/grievances")
def get_grievances():
    return serialize_list(grievances_col.find())

@app.post("/api/grievances")
def create_grievance(req: GrievanceRequest):
    grv = {
        "examId": req.examId, "category": req.category, "description": req.description,
        "grievanceNumber": f"GRV{int(datetime.now(timezone.utc).timestamp())}",
        "status": "PENDING", "resolution": None,
        "createdAt": datetime.now(timezone.utc).isoformat()
    }
    grievances_col.insert_one(grv)
    grv.pop("_id", None)
    return {"message": "Grievance submitted successfully", "grievanceNumber": grv["grievanceNumber"]}

# Module 9: Security & Monitoring
@app.get("/api/malpractice-reports")
def get_malpractice_reports():
    return serialize_list(malpractice_col.find())

@app.get("/api/audit-logs")
def get_audit_logs():
    return serialize_list(audit_logs_col.find())

# Dashboard Stats
@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    return {
        "students": students_col.count_documents({}),
        "exams": exams_col.count_documents({}),
        "centers": exam_centers_col.count_documents({}),
        "schedules": schedules_col.count_documents({}),
        "results": results_col.count_documents({}),
        "grievances": grievances_col.count_documents({}),
        "invigilators": invigilators_col.count_documents({}),
        "evaluators": evaluators_col.count_documents({}),
        "malpracticeReports": malpractice_col.count_documents({}),
        "payments": payments_col.count_documents({})
    }

# ============ ADMIN CRUD OPERATIONS ============

# --- Students CRUD ---
@app.put("/api/students/{doc_id}")
def update_student(doc_id: str, req: StudentUpdateRequest):
    update_data = {k: v for k, v in req.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = students_col.update_one({"_id": ObjectId(doc_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Student not found")
    # Also update user fullName/email if changed
    student = students_col.find_one({"_id": ObjectId(doc_id)})
    if student and student.get("userId"):
        user_update = {}
        if req.fullName:
            user_update["fullName"] = req.fullName
        if req.email:
            user_update["email"] = req.email
        if user_update:
            users_col.update_one({"_id": ObjectId(student["userId"])}, {"$set": user_update})
    return {"message": "Student updated successfully"}

@app.delete("/api/students/{doc_id}")
def delete_student(doc_id: str):
    student = students_col.find_one({"_id": ObjectId(doc_id)})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    students_col.delete_one({"_id": ObjectId(doc_id)})
    if student.get("userId"):
        users_col.delete_one({"_id": ObjectId(student["userId"])})
    return {"message": "Student deleted successfully"}

# --- Exams CRUD ---
@app.post("/api/exams")
def create_exam(req: ExamRequest):
    exam = {
        "examCode": req.examCode, "examName": req.examName,
        "level": req.level, "durationMinutes": req.durationMinutes,
        "description": req.description, "active": True
    }
    result = exams_col.insert_one(exam)
    exam["id"] = str(result.inserted_id)
    exam.pop("_id", None)
    return exam

@app.put("/api/exams/{doc_id}")
def update_exam(doc_id: str, req: ExamRequest):
    update_data = {k: v for k, v in req.dict().items() if v is not None}
    result = exams_col.update_one({"_id": ObjectId(doc_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Exam not found")
    return {"message": "Exam updated successfully"}

@app.delete("/api/exams/{doc_id}")
def delete_exam(doc_id: str):
    result = exams_col.delete_one({"_id": ObjectId(doc_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Exam not found")
    return {"message": "Exam deleted successfully"}

# --- Schedules CRUD ---
@app.post("/api/schedules")
def create_schedule(req: ScheduleRequest):
    exam = exams_col.find_one({"_id": ObjectId(req.examId)})
    center = exam_centers_col.find_one({"_id": ObjectId(req.centerId)})
    schedule = {
        "examId": req.examId, "examName": exam["examName"] if exam else "Unknown",
        "centerId": req.centerId, "centerName": center["centerName"] if center else "Unknown",
        "examDate": req.examDate, "startTime": req.startTime, "endTime": req.endTime,
        "subject": req.subject, "active": True
    }
    result = schedules_col.insert_one(schedule)
    schedule["id"] = str(result.inserted_id)
    schedule.pop("_id", None)
    return schedule

@app.delete("/api/schedules/{doc_id}")
def delete_schedule(doc_id: str):
    result = schedules_col.delete_one({"_id": ObjectId(doc_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return {"message": "Schedule deleted successfully"}

# --- Seat Allocations CRUD ---
@app.post("/api/seat-allocations")
def create_seat_allocation(req: RoomAssignRequest):
    student = students_col.find_one({"_id": ObjectId(req.studentId)})
    schedule = schedules_col.find_one({"_id": ObjectId(req.scheduleId)})
    room = rooms_col.find_one({"_id": ObjectId(req.roomId)})
    alloc = {
        "scheduleId": req.scheduleId,
        "examName": schedule["examName"] if schedule else "Unknown",
        "examDate": schedule["examDate"] if schedule else "",
        "startTime": schedule["startTime"] if schedule else "",
        "endTime": schedule["endTime"] if schedule else "",
        "subject": schedule["subject"] if schedule else "",
        "studentId": req.studentId,
        "studentName": student["fullName"] if student else "Unknown",
        "roomId": req.roomId,
        "roomNumber": room["roomNumber"] if room else "Unknown",
        "centerName": room["centerName"] if room else "Unknown",
        "seatNumber": req.seatNumber
    }
    result = seat_allocations_col.insert_one(alloc)
    alloc["id"] = str(result.inserted_id)
    alloc.pop("_id", None)
    return alloc

@app.delete("/api/seat-allocations/{doc_id}")
def delete_seat_allocation(doc_id: str):
    result = seat_allocations_col.delete_one({"_id": ObjectId(doc_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Allocation not found")
    return {"message": "Allocation deleted successfully"}

# --- Results CRUD ---
@app.post("/api/results")
def create_result(req: ResultRequest):
    student = students_col.find_one({"_id": ObjectId(req.studentId)})
    exam = exams_col.find_one({"_id": ObjectId(req.examId)})
    pct = round((req.marksObtained / req.totalMarks) * 100, 2) if req.totalMarks > 0 else 0
    r = {
        "studentId": req.studentId, "studentName": student["fullName"] if student else "Unknown",
        "examId": req.examId, "examName": exam["examName"] if exam else "Unknown",
        "totalMarks": req.totalMarks, "marksObtained": req.marksObtained,
        "percentage": pct, "grade": req.grade, "status": req.status,
        "rank": req.rank, "publishedAt": datetime.now(timezone.utc).isoformat()
    }
    result = results_col.insert_one(r)
    r["id"] = str(result.inserted_id)
    r.pop("_id", None)
    return r

@app.delete("/api/results/{doc_id}")
def delete_result(doc_id: str):
    result = results_col.delete_one({"_id": ObjectId(doc_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Result not found")
    return {"message": "Result deleted successfully"}

# --- Grievance Update ---
@app.put("/api/grievances/{doc_id}/resolve")
def resolve_grievance(doc_id: str):
    result = grievances_col.update_one(
        {"_id": ObjectId(doc_id)},
        {"$set": {"status": "RESOLVED", "resolution": "Resolved by admin", "resolvedAt": datetime.now(timezone.utc).isoformat()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Grievance not found")
    return {"message": "Grievance resolved"}
