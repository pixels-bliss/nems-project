#!/usr/bin/env python3
"""
NEMS Backend API Testing Suite
Tests all endpoints for the National Examination Management System
"""

import requests
import sys
import json
from datetime import datetime

class NEMSAPITester:
    def __init__(self, base_url="https://fullstack-dbms.preview.emergentagent.com"):
        self.base_url = base_url
        self.admin_token = None
        self.student_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_result(self, test_name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}")
        else:
            print(f"❌ {test_name} - {details}")
            self.failed_tests.append({"test": test_name, "details": details})

    def make_request(self, method, endpoint, data=None, token=None, expected_status=200):
        """Make HTTP request with error handling"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if token:
            headers['Authorization'] = f'Bearer {token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            
            success = response.status_code == expected_status
            return success, response.status_code, response.json() if response.content else {}
        
        except requests.exceptions.RequestException as e:
            return False, 0, {"error": str(e)}
        except json.JSONDecodeError:
            return False, response.status_code, {"error": "Invalid JSON response"}

    def test_health_check(self):
        """Test health endpoint"""
        success, status, response = self.make_request('GET', 'api/health')
        if success and response.get('status') == 'UP':
            self.log_result("Health Check", True)
            return True
        else:
            self.log_result("Health Check", False, f"Status: {status}, Response: {response}")
            return False

    def test_admin_login(self):
        """Test admin login"""
        login_data = {
            "email": "admin@nems.com",
            "password": "admin123"
        }
        success, status, response = self.make_request('POST', 'api/auth/login', login_data)
        
        if success and 'token' in response and response.get('role') == 'ADMIN':
            self.admin_token = response['token']
            self.log_result("Admin Login", True)
            return True
        else:
            self.log_result("Admin Login", False, f"Status: {status}, Response: {response}")
            return False

    def test_student_login(self):
        """Test student login"""
        login_data = {
            "email": "student1@example.com",
            "password": "password123"
        }
        success, status, response = self.make_request('POST', 'api/auth/login', login_data)
        
        if success and 'token' in response and response.get('role') == 'STUDENT':
            self.student_token = response['token']
            self.log_result("Student Login", True)
            return True
        else:
            self.log_result("Student Login", False, f"Status: {status}, Response: {response}")
            return False

    def test_student_registration(self):
        """Test student registration"""
        timestamp = int(datetime.now().timestamp())
        register_data = {
            "email": f"newstudent{timestamp}@test.com",
            "password": "testpass123",
            "fullName": "Test Student",
            "phone": "9876543210",
            "dateOfBirth": "2000-01-01",
            "gender": "Male"
        }
        success, status, response = self.make_request('POST', 'api/auth/register', register_data)
        
        if success and 'token' in response and response.get('role') == 'STUDENT':
            self.log_result("Student Registration", True)
            return True
        else:
            self.log_result("Student Registration", False, f"Status: {status}, Response: {response}")
            return False

    def test_dashboard_stats(self):
        """Test dashboard stats endpoint"""
        success, status, response = self.make_request('GET', 'api/dashboard/stats', token=self.admin_token)
        
        expected_keys = ['students', 'exams', 'centers', 'schedules', 'results', 'grievances', 'invigilators', 'evaluators', 'malpracticeReports', 'payments']
        
        if success and all(key in response for key in expected_keys):
            # Check if we have 10 records per module as expected
            has_10_records = all(response.get(key, 0) == 10 for key in ['students', 'exams', 'schedules', 'results', 'grievances'])
            if has_10_records:
                self.log_result("Dashboard Stats (10 records per module)", True)
            else:
                self.log_result("Dashboard Stats", True, f"Records count: {response}")
            return True
        else:
            self.log_result("Dashboard Stats", False, f"Status: {status}, Response: {response}")
            return False

    def test_students_endpoint(self):
        """Test students endpoint"""
        success, status, response = self.make_request('GET', 'api/students', token=self.admin_token)
        
        if success and isinstance(response, list) and len(response) == 10:
            # Check if first student has required fields
            if response and all(key in response[0] for key in ['studentId', 'fullName', 'email']):
                self.log_result("Students Endpoint (10 records)", True)
                return True
        
        self.log_result("Students Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
        return False

    def test_exams_endpoint(self):
        """Test exams endpoint"""
        success, status, response = self.make_request('GET', 'api/exams')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Exams Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Exams Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_schedules_endpoint(self):
        """Test schedules endpoint"""
        success, status, response = self.make_request('GET', 'api/schedules')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Schedules Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Schedules Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_seat_allocations_endpoint(self):
        """Test seat allocations endpoint"""
        success, status, response = self.make_request('GET', 'api/seat-allocations')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Seat Allocations Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Seat Allocations Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_results_endpoint(self):
        """Test results endpoint"""
        success, status, response = self.make_request('GET', 'api/results')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Results Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Results Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_grievances_endpoint(self):
        """Test grievances endpoint"""
        success, status, response = self.make_request('GET', 'api/grievances')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Grievances Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Grievances Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_rooms_endpoint(self):
        """Test rooms endpoint"""
        success, status, response = self.make_request('GET', 'api/rooms')
        
        if success and isinstance(response, list) and len(response) == 10:
            self.log_result("Rooms Endpoint (10 records)", True)
            return True
        else:
            self.log_result("Rooms Endpoint", False, f"Status: {status}, Count: {len(response) if isinstance(response, list) else 'N/A'}")
            return False

    def test_grievance_creation(self):
        """Test creating a new grievance"""
        # First get an exam ID
        success, status, exams = self.make_request('GET', 'api/exams')
        if not success or not exams:
            self.log_result("Grievance Creation (No exams available)", False, "Cannot test without exams")
            return False

        grievance_data = {
            "examId": exams[0]['id'],
            "category": "RESULT",
            "description": "Test grievance for API testing"
        }
        
        success, status, response = self.make_request('POST', 'api/grievances', grievance_data, token=self.student_token)
        
        if success and 'grievanceNumber' in response:
            self.log_result("Grievance Creation", True)
            return True
        else:
            self.log_result("Grievance Creation", False, f"Status: {status}, Response: {response}")
            return False

    def test_crud_operations(self):
        """Test CRUD operations for admin modules"""
        print("\n🔧 Testing CRUD Operations...")
        
        # Get initial data for testing
        students_success, _, students = self.make_request('GET', 'api/students', token=self.admin_token)
        exams_success, _, exams = self.make_request('GET', 'api/exams', token=self.admin_token)
        centers_success, _, centers = self.make_request('GET', 'api/exam-centers', token=self.admin_token)
        rooms_success, _, rooms = self.make_request('GET', 'api/rooms', token=self.admin_token)
        schedules_success, _, schedules = self.make_request('GET', 'api/schedules', token=self.admin_token)
        
        if not all([students_success, exams_success, centers_success, rooms_success, schedules_success]):
            self.log_result("Get initial data for CRUD", False, "Failed to fetch required data")
            return
        
        if not all([students, exams, centers, rooms, schedules]):
            self.log_result("Verify initial data exists", False, "Missing required test data")
            return
        
        student_id = students[0]['id']
        exam_id = exams[0]['id']
        center_id = centers[0]['id']
        room_id = rooms[0]['id']
        schedule_id = schedules[0]['id']
        
        print(f"Using test IDs: Student={student_id[:8]}..., Exam={exam_id[:8]}..., Schedule={schedule_id[:8]}...")
        
        # Test Students UPDATE (Edit functionality)
        print("\n📚 Testing Students CRUD...")
        update_data = {"fullName": "Updated Test Student", "city": "Updated City", "gender": "Male"}
        success, status, _ = self.make_request('PUT', f'api/students/{student_id}', 
                                             data=update_data, token=self.admin_token)
        self.log_result("Update Student (Edit)", success, f"Status: {status}")
        
        # Test Students DELETE (but don't actually delete to preserve test data)
        # We'll test with a non-existent ID to verify the endpoint works
        success, status, _ = self.make_request('DELETE', f'api/students/nonexistent123', 
                                             token=self.admin_token, expected_status=404)
        self.log_result("Delete Student endpoint", success, f"Status: {status}")
        
        # Test Exams CREATE and DELETE
        print("\n📝 Testing Exams CRUD...")
        exam_data = {
            "examCode": f"TEST{int(datetime.now().timestamp())}",
            "examName": "Test Exam CRUD",
            "level": "National",
            "durationMinutes": 120,
            "description": "Test exam for CRUD operations"
        }
        success, status, response = self.make_request('POST', 'api/exams', 
                                                    data=exam_data, token=self.admin_token)
        self.log_result("Create Exam", success, f"Status: {status}")
        
        if success and 'id' in response:
            new_exam_id = response['id']
            success, status, _ = self.make_request('DELETE', f'api/exams/{new_exam_id}', 
                                                 token=self.admin_token)
            self.log_result("Delete Exam", success, f"Status: {status}")
        
        # Test Schedules CREATE and DELETE
        print("\n📅 Testing Schedules CRUD...")
        schedule_data = {
            "examId": exam_id,
            "centerId": center_id,
            "examDate": "2024-12-25",
            "startTime": "10:00",
            "endTime": "13:00",
            "subject": "Test Subject CRUD"
        }
        success, status, response = self.make_request('POST', 'api/schedules', 
                                                    data=schedule_data, token=self.admin_token)
        self.log_result("Create Schedule", success, f"Status: {status}")
        
        if success and 'id' in response:
            new_schedule_id = response['id']
            success, status, _ = self.make_request('DELETE', f'api/schedules/{new_schedule_id}', 
                                                 token=self.admin_token)
            self.log_result("Delete Schedule", success, f"Status: {status}")
        
        # Test Seat Allocations CREATE and DELETE
        print("\n🪑 Testing Seat Allocations CRUD...")
        alloc_data = {
            "scheduleId": schedule_id,
            "studentId": student_id,
            "roomId": room_id,
            "seatNumber": f"TEST{int(datetime.now().timestamp() % 1000)}"
        }
        success, status, response = self.make_request('POST', 'api/seat-allocations', 
                                                    data=alloc_data, token=self.admin_token)
        self.log_result("Create Seat Allocation", success, f"Status: {status}")
        
        if success and 'id' in response:
            new_alloc_id = response['id']
            success, status, _ = self.make_request('DELETE', f'api/seat-allocations/{new_alloc_id}', 
                                                 token=self.admin_token)
            self.log_result("Delete Seat Allocation", success, f"Status: {status}")
        
        # Test Results CREATE and DELETE
        print("\n🏆 Testing Results CRUD...")
        result_data = {
            "studentId": student_id,
            "examId": exam_id,
            "totalMarks": 100,
            "marksObtained": 85,
            "grade": "A",
            "status": "PASS",
            "rank": 10
        }
        success, status, response = self.make_request('POST', 'api/results', 
                                                    data=result_data, token=self.admin_token)
        self.log_result("Create Result", success, f"Status: {status}")
        
        if success and 'id' in response:
            new_result_id = response['id']
            success, status, _ = self.make_request('DELETE', f'api/results/{new_result_id}', 
                                                 token=self.admin_token)
            self.log_result("Delete Result", success, f"Status: {status}")

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting NEMS Backend API Tests")
        print("=" * 50)
        
        # Basic connectivity
        if not self.test_health_check():
            print("❌ Health check failed - stopping tests")
            return self.generate_report()
        
        # Authentication tests
        admin_login_success = self.test_admin_login()
        student_login_success = self.test_student_login()
        
        if not admin_login_success:
            print("❌ Admin login failed - some tests will be skipped")
        
        if not student_login_success:
            print("❌ Student login failed - some tests will be skipped")
        
        # Registration test
        self.test_student_registration()
        
        # Data endpoints (require admin token)
        if admin_login_success:
            self.test_dashboard_stats()
            self.test_students_endpoint()
        
        # Public endpoints
        self.test_exams_endpoint()
        self.test_schedules_endpoint()
        self.test_seat_allocations_endpoint()
        self.test_results_endpoint()
        self.test_grievances_endpoint()
        self.test_rooms_endpoint()
        
        # Functional tests
        if student_login_success:
            self.test_grievance_creation()
        
        # CRUD operations tests (require admin token)
        if admin_login_success:
            self.test_crud_operations()
        
        return self.generate_report()

    def generate_report(self):
        """Generate test report"""
        print("\n" + "=" * 50)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "0%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        return {
            "total": self.tests_run,
            "passed": self.tests_passed,
            "failed": len(self.failed_tests),
            "success_rate": (self.tests_passed/self.tests_run*100) if self.tests_run > 0 else 0,
            "failed_tests": self.failed_tests
        }

def main():
    """Main test execution"""
    tester = NEMSAPITester()
    results = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if results["failed"] == 0 else 1

if __name__ == "__main__":
    sys.exit(main())