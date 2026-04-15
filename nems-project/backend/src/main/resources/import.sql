-- ============================================================================
-- NEMS DATABASE - SAMPLE DATA (10+ RECORDS PER MODULE)
-- National Examination Management System
-- ============================================================================

-- ============================================================================
-- MODULE 1: MASTER REFERENCE DATA
-- ============================================================================

-- Insert 10 Regions
INSERT INTO regions (id, region_code, region_name, state, description, active, created_at, updated_at) VALUES
(1, 'REG001', 'North Delhi Region', 'Delhi', 'Covers North Delhi examination centers', true, NOW(), NOW()),
(2, 'REG002', 'Mumbai Central Region', 'Maharashtra', 'Covers Mumbai and Navi Mumbai centers', true, NOW(), NOW()),
(3, 'REG003', 'Bangalore South Region', 'Karnataka', 'Covers Bangalore South centers', true, NOW(), NOW()),
(4, 'REG004', 'Chennai Metro Region', 'Tamil Nadu', 'Covers Chennai metropolitan centers', true, NOW(), NOW()),
(5, 'REG005', 'Kolkata East Region', 'West Bengal', 'Covers Kolkata East centers', true, NOW(), NOW()),
(6, 'REG006', 'Hyderabad Tech Region', 'Telangana', 'Covers Hyderabad centers', true, NOW(), NOW()),
(7, 'REG007', 'Pune Education Region', 'Maharashtra', 'Covers Pune university centers', true, NOW(), NOW()),
(8, 'REG008', 'Ahmedabad West Region', 'Gujarat', 'Covers Ahmedabad centers', true, NOW(), NOW()),
(9, 'REG009', 'Jaipur Heritage Region', 'Rajasthan', 'Covers Jaipur centers', true, NOW(), NOW()),
(10, 'REG010', 'Lucknow Central Region', 'Uttar Pradesh', 'Covers Lucknow centers', true, NOW(), NOW());

-- Insert 10 Exams
INSERT INTO exams (id, exam_code, exam_name, description, level, duration_minutes, active, created_at, updated_at) VALUES
(1, 'JEE2024', 'Joint Entrance Examination', 'Engineering entrance exam', 'National', 180, true, NOW(), NOW()),
(2, 'NEET2024', 'National Eligibility Entrance Test', 'Medical entrance exam', 'National', 180, true, NOW(), NOW()),
(3, 'GATE2024', 'Graduate Aptitude Test Engineering', 'Post graduation entrance', 'National', 180, true, NOW(), NOW()),
(4, 'CAT2024', 'Common Admission Test', 'MBA entrance exam', 'National', 180, true, NOW(), NOW()),
(5, 'UPSC2024', 'Civil Services Examination', 'Administrative services exam', 'National', 120, true, NOW(), NOW()),
(6, 'SSC2024', 'Staff Selection Commission', 'Government job exam', 'National', 60, true, NOW(), NOW()),
(7, 'IBPS2024', 'Banking Personnel Selection', 'Banking sector exam', 'National', 120, true, NOW(), NOW()),
(8, 'NET2024', 'National Eligibility Test', 'Lecturer eligibility test', 'National', 180, true, NOW(), NOW()),
(9, 'CLAT2024', 'Common Law Admission Test', 'Law entrance exam', 'National', 120, true, NOW(), NOW()),
(10, 'AIIMS2024', 'All India Institute Medical Sciences', 'Medical entrance exam', 'National', 210, true, NOW(), NOW());

-- Insert 10 Exam Centers
INSERT INTO exam_centers (id, center_code, center_name, address, city, state, pincode, region_id, total_capacity, active, created_at, updated_at) VALUES
(1, 'CTR001', 'Delhi Public School', 'Mathura Road, New Delhi', 'New Delhi', 'Delhi', '110025', 1, 500, true, NOW(), NOW()),
(2, 'CTR002', 'IIT Bombay Campus', 'Powai, Mumbai', 'Mumbai', 'Maharashtra', '400076', 2, 1000, true, NOW(), NOW()),
(3, 'CTR003', 'Bangalore University', 'Jnana Bharathi Campus', 'Bangalore', 'Karnataka', '560056', 3, 800, true, NOW(), NOW()),
(4, 'CTR004', 'Anna University', 'Guindy Campus', 'Chennai', 'Tamil Nadu', '600025', 4, 750, true, NOW(), NOW()),
(5, 'CTR005', 'Jadavpur University', 'Raja SC Mullick Road', 'Kolkata', 'West Bengal', '700032', 5, 600, true, NOW(), NOW()),
(6, 'CTR006', 'JNTU Hyderabad', 'Kukatpally', 'Hyderabad', 'Telangana', '500085', 6, 900, true, NOW(), NOW()),
(7, 'CTR007', 'SPPU Pune', 'Ganeshkhind Road', 'Pune', 'Maharashtra', '411007', 7, 700, true, NOW(), NOW()),
(8, 'CTR008', 'Gujarat University', 'Navrangpura', 'Ahmedabad', 'Gujarat', '380009', 8, 650, true, NOW(), NOW()),
(9, 'CTR009', 'Rajasthan University', 'JLN Marg', 'Jaipur', 'Rajasthan', '302004', 9, 550, true, NOW(), NOW()),
(10, 'CTR010', 'Lucknow University', 'Badshah Bagh', 'Lucknow', 'Uttar Pradesh', '226007', 10, 600, true, NOW(), NOW());

-- Insert 10 Rooms
INSERT INTO rooms (id, center_id, room_number, capacity, floor, active, created_at, updated_at) VALUES
(1, 1, 'R101', 50, 'Ground Floor', true, NOW(), NOW()),
(2, 2, 'R201', 100, 'First Floor', true, NOW(), NOW()),
(3, 3, 'R301', 80, 'Second Floor', true, NOW(), NOW()),
(4, 4, 'R401', 75, 'Ground Floor', true, NOW(), NOW()),
(5, 5, 'R501', 60, 'First Floor', true, NOW(), NOW()),
(6, 6, 'R601', 90, 'Ground Floor', true, NOW(), NOW()),
(7, 7, 'R701', 70, 'Second Floor', true, NOW(), NOW()),
(8, 8, 'R801', 65, 'First Floor', true, NOW(), NOW()),
(9, 9, 'R901', 55, 'Ground Floor', true, NOW(), NOW()),
(10, 10, 'R1001', 60, 'First Floor', true, NOW(), NOW());

-- ============================================================================
-- MODULE 2: STUDENT REGISTRATION
-- ============================================================================

-- Insert 1 Admin User
INSERT INTO users (id, email, password, full_name, phone, role, active, created_at, updated_at) VALUES
(1, 'admin@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'System Administrator', '9999999999', 'ADMIN', true, NOW(), NOW());

-- Insert 10 Student Users (password: password123)
INSERT INTO users (id, email, password, full_name, phone, role, active, created_at, updated_at) VALUES
(2, 'student1@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Rahul Sharma', '9876543210', 'STUDENT', true, NOW(), NOW()),
(3, 'student2@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Priya Patel', '9876543211', 'STUDENT', true, NOW(), NOW()),
(4, 'student3@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Amit Kumar', '9876543212', 'STUDENT', true, NOW(), NOW()),
(5, 'student4@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Sneha Reddy', '9876543213', 'STUDENT', true, NOW(), NOW()),
(6, 'student5@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Vikram Singh', '9876543214', 'STUDENT', true, NOW(), NOW()),
(7, 'student6@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Anjali Gupta', '9876543215', 'STUDENT', true, NOW(), NOW()),
(8, 'student7@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Karthik Nair', '9876543216', 'STUDENT', true, NOW(), NOW()),
(9, 'student8@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Divya Menon', '9876543217', 'STUDENT', true, NOW(), NOW()),
(10, 'student9@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Arjun Verma', '9876543218', 'STUDENT', true, NOW(), NOW()),
(11, 'student10@example.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Neha Joshi', '9876543219', 'STUDENT', true, NOW(), NOW());

-- Insert 10 Students
INSERT INTO students (id, user_id, student_id, date_of_birth, gender, category, address, city, state, pincode, aadhar_number, is_pwd, created_at, updated_at) VALUES
(1, 2, 'STD2024001', '2005-03-15', 'Male', 'GEN', '123 MG Road', 'Delhi', 'Delhi', '110001', '123456789012', false, NOW(), NOW()),
(2, 3, 'STD2024002', '2005-07-22', 'Female', 'OBC', '456 Park Street', 'Mumbai', 'Maharashtra', '400001', '234567890123', false, NOW(), NOW()),
(3, 4, 'STD2024003', '2004-11-10', 'Male', 'SC', '789 Brigade Road', 'Bangalore', 'Karnataka', '560001', '345678901234', false, NOW(), NOW()),
(4, 5, 'STD2024004', '2005-01-05', 'Female', 'ST', '321 Mount Road', 'Chennai', 'Tamil Nadu', '600001', '456789012345', false, NOW(), NOW()),
(5, 6, 'STD2024005', '2004-09-18', 'Male', 'GEN', '654 Park Lane', 'Kolkata', 'West Bengal', '700001', '567890123456', false, NOW(), NOW()),
(6, 7, 'STD2024006', '2005-05-25', 'Female', 'GEN', '987 HITEC City', 'Hyderabad', 'Telangana', '500001', '678901234567', false, NOW(), NOW()),
(7, 8, 'STD2024007', '2004-12-30', 'Male', 'OBC', '147 FC Road', 'Pune', 'Maharashtra', '411001', '789012345678', false, NOW(), NOW()),
(8, 9, 'STD2024008', '2005-04-12', 'Female', 'GEN', '258 CG Road', 'Ahmedabad', 'Gujarat', '380001', '890123456789', false, NOW(), NOW()),
(9, 10, 'STD2024009', '2004-08-20', 'Male', 'GEN', '369 MI Road', 'Jaipur', 'Rajasthan', '302001', '901234567890', false, NOW(), NOW()),
(10, 11, 'STD2024010', '2005-02-14', 'Female', 'SC', '741 Hazratganj', 'Lucknow', 'Uttar Pradesh', '226001', '012345678901', true, NOW(), NOW());

-- Insert 10 Registrations
INSERT INTO registrations (id, student_id, exam_id, registration_number, registration_date, status, amount, payment_completed, created_at, updated_at) VALUES
(1, 1, 1, 'REG2024001', NOW(), 'CONFIRMED', 1500.00, true, NOW(), NOW()),
(2, 2, 2, 'REG2024002', NOW(), 'CONFIRMED', 1600.00, true, NOW(), NOW()),
(3, 3, 3, 'REG2024003', NOW(), 'CONFIRMED', 1750.00, true, NOW(), NOW()),
(4, 4, 4, 'REG2024004', NOW(), 'CONFIRMED', 2000.00, true, NOW(), NOW()),
(5, 5, 5, 'REG2024005', NOW(), 'PENDING', 1200.00, false, NOW(), NOW()),
(6, 6, 6, 'REG2024006', NOW(), 'CONFIRMED', 850.00, true, NOW(), NOW()),
(7, 7, 7, 'REG2024007', NOW(), 'CONFIRMED', 950.00, true, NOW(), NOW()),
(8, 8, 8, 'REG2024008', NOW(), 'CONFIRMED', 1100.00, true, NOW(), NOW()),
(9, 9, 9, 'REG2024009', NOW(), 'CANCELLED', 1400.00, false, NOW(), NOW()),
(10, 10, 10, 'REG2024010', NOW(), 'CONFIRMED', 1800.00, true, NOW(), NOW());

-- Insert 10 Payments
INSERT INTO payments (id, registration_id, transaction_id, amount, payment_mode, status, payment_date) VALUES
(1, 1, 'TXN2024001', 1500.00, 'UPI', 'SUCCESS', NOW()),
(2, 2, 'TXN2024002', 1600.00, 'CARD', 'SUCCESS', NOW()),
(3, 3, 'TXN2024003', 1750.00, 'NET_BANKING', 'SUCCESS', NOW()),
(4, 4, 'TXN2024004', 2000.00, 'UPI', 'SUCCESS', NOW()),
(5, 5, 'TXN2024005', 1200.00, 'CARD', 'PENDING', NOW()),
(6, 6, 'TXN2024006', 850.00, 'UPI', 'SUCCESS', NOW()),
(7, 7, 'TXN2024007', 950.00, 'NET_BANKING', 'SUCCESS', NOW()),
(8, 8, 'TXN2024008', 1100.00, 'CARD', 'SUCCESS', NOW()),
(9, 9, 'TXN2024009', 1400.00, 'UPI', 'FAILED', NOW()),
(10, 10, 'TXN2024010', 1800.00, 'NET_BANKING', 'SUCCESS', NOW());

-- ============================================================================
-- MODULE 3: EXAM SCHEDULING
-- ============================================================================

-- Insert 10 Exam Schedules
INSERT INTO exam_schedules (id, exam_id, center_id, exam_date, start_time, end_time, subject, active, created_at, updated_at) VALUES
(1, 1, 1, '2024-05-15', '09:00:00', '12:00:00', 'Mathematics', true, NOW(), NOW()),
(2, 2, 2, '2024-05-16', '09:00:00', '12:00:00', 'Biology', true, NOW(), NOW()),
(3, 3, 3, '2024-05-17', '10:00:00', '13:00:00', 'Computer Science', true, NOW(), NOW()),
(4, 4, 4, '2024-05-18', '09:00:00', '12:00:00', 'Quantitative Aptitude', true, NOW(), NOW()),
(5, 5, 5, '2024-05-19', '10:00:00', '12:00:00', 'General Studies', true, NOW(), NOW()),
(6, 6, 6, '2024-05-20', '11:00:00', '12:00:00', 'Reasoning', true, NOW(), NOW()),
(7, 7, 7, '2024-05-21', '10:00:00', '12:00:00', 'Banking Awareness', true, NOW(), NOW()),
(8, 8, 8, '2024-05-22', '09:00:00', '12:00:00', 'Research Methodology', true, NOW(), NOW()),
(9, 9, 9, '2024-05-23', '10:00:00', '12:00:00', 'Legal Aptitude', true, NOW(), NOW()),
(10, 10, 10, '2024-05-24', '09:00:00', '12:30:00', 'Physics Chemistry Biology', true, NOW(), NOW());

-- Insert 10 Seat Allocations
INSERT INTO seat_allocations (id, schedule_id, student_id, room_id, seat_number, created_at, updated_at) VALUES
(1, 1, 1, 1, 'S001', NOW(), NOW()),
(2, 2, 2, 2, 'S002', NOW(), NOW()),
(3, 3, 3, 3, 'S003', NOW(), NOW()),
(4, 4, 4, 4, 'S004', NOW(), NOW()),
(5, 5, 5, 5, 'S005', NOW(), NOW()),
(6, 6, 6, 6, 'S006', NOW(), NOW()),
(7, 7, 7, 7, 'S007', NOW(), NOW()),
(8, 8, 8, 8, 'S008', NOW(), NOW()),
(9, 9, 9, 9, 'S009', NOW(), NOW()),
(10, 10, 10, 10, 'S010', NOW(), NOW());

-- ============================================================================
-- MODULE 4: INVIGILATOR MANAGEMENT
-- ============================================================================

-- Insert 10 Invigilator Users (password: inv123)
INSERT INTO users (id, email, password, full_name, phone, role, active, created_at, updated_at) VALUES
(12, 'invigilator1@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Rajesh Kumar', '9123456781', 'INVIGILATOR', true, NOW(), NOW()),
(13, 'invigilator2@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Meena Iyer', '9123456782', 'INVIGILATOR', true, NOW(), NOW()),
(14, 'invigilator3@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Suresh Babu', '9123456783', 'INVIGILATOR', true, NOW(), NOW()),
(15, 'invigilator4@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Lakshmi Devi', '9123456784', 'INVIGILATOR', true, NOW(), NOW()),
(16, 'invigilator5@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Anil Deshmukh', '9123456785', 'INVIGILATOR', true, NOW(), NOW()),
(17, 'invigilator6@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Kavita Rao', '9123456786', 'INVIGILATOR', true, NOW(), NOW()),
(18, 'invigilator7@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Prakash Joshi', '9123456787', 'INVIGILATOR', true, NOW(), NOW()),
(19, 'invigilator8@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Sunita Mehta', '9123456788', 'INVIGILATOR', true, NOW(), NOW()),
(20, 'invigilator9@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Ramesh Pillai', '9123456789', 'INVIGILATOR', true, NOW(), NOW()),
(21, 'invigilator10@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Pooja Sharma', '9123456790', 'INVIGILATOR', true, NOW(), NOW());

-- Insert 10 Invigilators
INSERT INTO invigilators (id, user_id, invigilator_id, qualification, institution, experience_years, active, created_at, updated_at) VALUES
(1, 12, 'INV2024001', 'Ph.D. Mathematics', 'IIT Delhi', 15, true, NOW(), NOW()),
(2, 13, 'INV2024002', 'M.Sc. Physics', 'Mumbai University', 10, true, NOW(), NOW()),
(3, 14, 'INV2024003', 'Ph.D. Computer Science', 'IISc Bangalore', 12, true, NOW(), NOW()),
(4, 15, 'INV2024004', 'M.A. English', 'Anna University', 8, true, NOW(), NOW()),
(5, 16, 'INV2024005', 'Ph.D. Chemistry', 'Jadavpur University', 14, true, NOW(), NOW()),
(6, 17, 'INV2024006', 'M.Sc. Biology', 'JNTU Hyderabad', 9, true, NOW(), NOW()),
(7, 18, 'INV2024007', 'Ph.D. Economics', 'Pune University', 11, true, NOW(), NOW()),
(8, 19, 'INV2024008', 'M.Com. Accountancy', 'Gujarat University', 7, true, NOW(), NOW()),
(9, 20, 'INV2024009', 'Ph.D. History', 'Rajasthan University', 13, true, NOW(), NOW()),
(10, 21, 'INV2024010', 'M.Sc. Statistics', 'Lucknow University', 6, true, NOW(), NOW());

-- Insert 10 Invigilator Assignments
INSERT INTO invigilator_assignments (id, invigilator_id, schedule_id, room_id, role, created_at, updated_at) VALUES
(1, 1, 1, 1, 'CHIEF', NOW(), NOW()),
(2, 2, 2, 2, 'ASSISTANT', NOW(), NOW()),
(3, 3, 3, 3, 'CHIEF', NOW(), NOW()),
(4, 4, 4, 4, 'ASSISTANT', NOW(), NOW()),
(5, 5, 5, 5, 'CHIEF', NOW(), NOW()),
(6, 6, 6, 6, 'ASSISTANT', NOW(), NOW()),
(7, 7, 7, 7, 'CHIEF', NOW(), NOW()),
(8, 8, 8, 8, 'ASSISTANT', NOW(), NOW()),
(9, 9, 9, 9, 'CHIEF', NOW(), NOW()),
(10, 10, 10, 10, 'ASSISTANT', NOW(), NOW());

-- ============================================================================
-- MODULE 5: STUDENT DISTRIBUTION & ATTENDANCE
-- ============================================================================

-- Insert 10 Attendance Records
INSERT INTO attendance (id, seat_allocation_id, status, check_in_time, remarks, created_at, updated_at) VALUES
(1, 1, 'PRESENT', '2024-05-15 08:45:00', 'On time', NOW(), NOW()),
(2, 2, 'PRESENT', '2024-05-16 08:50:00', 'On time', NOW(), NOW()),
(3, 3, 'LATE', '2024-05-17 10:15:00', 'Arrived 15 minutes late', NOW(), NOW()),
(4, 4, 'PRESENT', '2024-05-18 08:40:00', 'On time', NOW(), NOW()),
(5, 5, 'ABSENT', NULL, 'Did not appear', NOW(), NOW()),
(6, 6, 'PRESENT', '2024-05-20 10:55:00', 'On time', NOW(), NOW()),
(7, 7, 'PRESENT', '2024-05-21 09:50:00', 'On time', NOW(), NOW()),
(8, 8, 'PRESENT', '2024-05-22 08:45:00', 'On time', NOW(), NOW()),
(9, 9, 'LATE', '2024-05-23 10:20:00', 'Arrived 20 minutes late', NOW(), NOW()),
(10, 10, 'PRESENT', '2024-05-24 08:50:00', 'On time', NOW(), NOW());

-- ============================================================================
-- MODULE 6: SECURE EVALUATION
-- ============================================================================

-- Insert 10 Evaluator Users (password: eval123)
INSERT INTO users (id, email, password, full_name, phone, role, active, created_at, updated_at) VALUES
(22, 'evaluator1@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Ashok Verma', '9234567891', 'EVALUATOR', true, NOW(), NOW()),
(23, 'evaluator2@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Shalini Das', '9234567892', 'EVALUATOR', true, NOW(), NOW()),
(24, 'evaluator3@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Vijay Rathore', '9234567893', 'EVALUATOR', true, NOW(), NOW()),
(25, 'evaluator4@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Nandini Kulkarni', '9234567894', 'EVALUATOR', true, NOW(), NOW()),
(26, 'evaluator5@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Manoj Tiwari', '9234567895', 'EVALUATOR', true, NOW(), NOW()),
(27, 'evaluator6@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Rekha Nair', '9234567896', 'EVALUATOR', true, NOW(), NOW()),
(28, 'evaluator7@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Sandeep Gupta', '9234567897', 'EVALUATOR', true, NOW(), NOW()),
(29, 'evaluator8@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Usha Rani', '9234567898', 'EVALUATOR', true, NOW(), NOW()),
(30, 'evaluator9@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Dr. Deepak Malhotra', '9234567899', 'EVALUATOR', true, NOW(), NOW()),
(31, 'evaluator10@nems.com', '$2a$10$xQJz8Z8K1tZ3XqV4jK9z0.mM4rGZqFtN4VtZH5rY6mJ0Q8wZqZ7Py', 'Prof. Geeta Bose', '9234567800', 'EVALUATOR', true, NOW(), NOW());

-- Insert 10 Evaluators
INSERT INTO evaluators (id, user_id, evaluator_id, specialization, institution, experience_years, active, created_at, updated_at) VALUES
(1, 22, 'EVAL2024001', 'Mathematics', 'IIT Delhi', 20, true, NOW(), NOW()),
(2, 23, 'EVAL2024002', 'Biology', 'AIIMS New Delhi', 18, true, NOW(), NOW()),
(3, 24, 'EVAL2024003', 'Computer Science', 'IISc Bangalore', 15, true, NOW(), NOW()),
(4, 25, 'EVAL2024004', 'Management', 'IIM Ahmedabad', 12, true, NOW(), NOW()),
(5, 26, 'EVAL2024005', 'Public Administration', 'JNU Delhi', 22, true, NOW(), NOW()),
(6, 27, 'EVAL2024006', 'General Studies', 'Delhi University', 14, true, NOW(), NOW()),
(7, 28, 'EVAL2024007', 'Banking', 'NIBM Pune', 16, true, NOW(), NOW()),
(8, 29, 'EVAL2024008', 'Research Methods', 'Tata Institute', 19, true, NOW(), NOW()),
(9, 30, 'EVAL2024009', 'Law', 'National Law School', 17, true, NOW(), NOW()),
(10, 31, 'EVAL2024010', 'Medicine', 'AIIMS Delhi', 21, true, NOW(), NOW());

-- Insert 10 Evaluations
INSERT INTO evaluations (id, student_id, exam_id, evaluator_id, subject, marks_obtained, total_marks, status, remarks, created_at, updated_at) VALUES
(1, 1, 1, 1, 'Mathematics', 85, 100, 'COMPLETED', 'Good performance', NOW(), NOW()),
(2, 2, 2, 2, 'Biology', 92, 100, 'COMPLETED', 'Excellent work', NOW(), NOW()),
(3, 3, 3, 3, 'Computer Science', 78, 100, 'COMPLETED', 'Average performance', NOW(), NOW()),
(4, 4, 4, 4, 'Quantitative Aptitude', 88, 100, 'COMPLETED', 'Very good', NOW(), NOW()),
(5, 5, 5, 5, 'General Studies', 0, 100, 'PENDING', 'Absent', NOW(), NOW()),
(6, 6, 6, 6, 'Reasoning', 75, 100, 'COMPLETED', 'Satisfactory', NOW(), NOW()),
(7, 7, 7, 7, 'Banking Awareness', 82, 100, 'COMPLETED', 'Good knowledge', NOW(), NOW()),
(8, 8, 8, 8, 'Research Methodology', 90, 100, 'COMPLETED', 'Outstanding', NOW(), NOW()),
(9, 9, 9, 9, 'Legal Aptitude', 0, 100, 'PENDING', 'Cancelled registration', NOW(), NOW()),
(10, 10, 10, 10, 'Physics Chemistry Biology', 95, 100, 'COMPLETED', 'Excellent across all subjects', NOW(), NOW());

-- ============================================================================
-- MODULE 7: RESULT PROCESSING
-- ============================================================================

-- Insert 10 Results
INSERT INTO results (id, student_id, exam_id, total_marks, marks_obtained, percentage, grade, status, rank, published_at, created_at, updated_at) VALUES
(1, 1, 1, 300, 255, 85.00, 'A', 'PASS', 45, NOW(), NOW(), NOW()),
(2, 2, 2, 360, 331, 92.00, 'A+', 'PASS', 12, NOW(), NOW(), NOW()),
(3, 3, 3, 300, 234, 78.00, 'B+', 'PASS', 89, NOW(), NOW(), NOW()),
(4, 4, 4, 300, 264, 88.00, 'A', 'PASS', 34, NOW(), NOW(), NOW()),
(5, 5, 5, 200, 0, 0.00, 'F', 'FAIL', NULL, NULL, NOW(), NOW()),
(6, 6, 6, 100, 75, 75.00, 'B', 'PASS', 156, NOW(), NOW(), NOW()),
(7, 7, 7, 200, 164, 82.00, 'A-', 'PASS', 67, NOW(), NOW(), NOW()),
(8, 8, 8, 300, 270, 90.00, 'A+', 'PASS', 23, NOW(), NOW(), NOW()),
(9, 9, 9, 200, 0, 0.00, 'F', 'FAIL', NULL, NULL, NOW(), NOW()),
(10, 10, 10, 360, 342, 95.00, 'A+', 'PASS', 5, NOW(), NOW(), NOW());

-- ============================================================================
-- MODULE 8: GRIEVANCE HANDLING
-- ============================================================================

-- Insert 10 Grievances
INSERT INTO grievances (id, student_id, exam_id, grievance_number, category, description, status, resolution, resolved_at, created_at, updated_at) VALUES
(1, 1, 1, 'GRV2024001', 'RESULT', 'Marks mismatch in mathematics section', 'RESOLVED', 'Marks recalculated and updated', NOW(), NOW(), NOW()),
(2, 2, 2, 'GRV2024002', 'EVALUATION', 'Request for answer script review', 'UNDER_REVIEW', NULL, NULL, NOW(), NOW()),
(3, 3, 3, 'GRV2024003', 'ATTENDANCE', 'Attendance marked absent but was present', 'RESOLVED', 'Attendance corrected after verification', NOW(), NOW(), NOW()),
(4, 4, 4, 'GRV2024004', 'OTHER', 'Issue with admit card download', 'RESOLVED', 'Technical issue fixed', NOW(), NOW(), NOW()),
(5, 5, 5, 'GRV2024005', 'RESULT', 'Result not published', 'PENDING', NULL, NULL, NOW(), NOW()),
(6, 6, 6, 'GRV2024006', 'EVALUATION', 'Question paper had printing error', 'RESOLVED', 'Grace marks awarded', NOW(), NOW(), NOW()),
(7, 7, 7, 'GRV2024007', 'ATTENDANCE', 'Biometric system failure', 'UNDER_REVIEW', NULL, NULL, NOW(), NOW()),
(8, 8, 8, 'GRV2024008', 'RESULT', 'Grade calculation seems incorrect', 'REJECTED', 'Calculation verified and found correct', NOW(), NOW(), NOW()),
(9, 9, 9, 'GRV2024009', 'OTHER', 'Refund request for cancelled exam', 'PENDING', NULL, NULL, NOW(), NOW()),
(10, 10, 10, 'GRV2024010', 'EVALUATION', 'Request for re-evaluation', 'UNDER_REVIEW', NULL, NULL, NOW(), NOW());

-- ============================================================================
-- MODULE 9: SECURITY & MONITORING
-- ============================================================================

-- Insert 10 Malpractice Reports
INSERT INTO malpractice_reports (id, student_id, schedule_id, invigilator_id, incident_type, description, status, action_taken, reported_at) VALUES
(1, 3, 3, 3, 'MOBILE_PHONE', 'Student found using mobile phone during exam', 'ACTION_TAKEN', 'Exam cancelled for the student', NOW()),
(2, 5, 5, 5, 'IMPERSONATION', 'Different person appeared for the exam', 'UNDER_INVESTIGATION', NULL, NOW()),
(3, 9, 9, 9, 'CHEATING', 'Copying from nearby student', 'ACTION_TAKEN', 'Warning issued', NOW()),
(4, 1, 1, 1, 'SUSPICIOUS_BEHAVIOR', 'Repeated looking at others papers', 'REPORTED', NULL, NOW()),
(5, 2, 2, 2, 'MOBILE_PHONE', 'Smart watch found', 'ACTION_TAKEN', 'Device confiscated', NOW()),
(6, 4, 4, 4, 'CHEATING', 'Chit found in exam hall', 'UNDER_INVESTIGATION', NULL, NOW()),
(7, 6, 6, 6, 'SUSPICIOUS_BEHAVIOR', 'Unusual movements during exam', 'REPORTED', NULL, NOW()),
(8, 7, 7, 7, 'MOBILE_PHONE', 'Bluetooth device detected', 'ACTION_TAKEN', 'Exam invalidated', NOW()),
(9, 8, 8, 8, 'IMPERSONATION', 'Photo mismatch with admit card', 'UNDER_INVESTIGATION', NULL, NOW()),
(10, 10, 10, 10, 'CHEATING', 'Pre-written answers found', 'ACTION_TAKEN', 'Exam cancelled and ban imposed', NOW());

-- Insert 10 Audit Logs
INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details, ip_address, timestamp) VALUES
(1, 1, 'LOGIN', 'USER', 1, 'Admin logged in successfully', '192.168.1.1', NOW()),
(2, 2, 'CREATE', 'REGISTRATION', 1, 'New registration created', '192.168.1.2', NOW()),
(3, 3, 'UPDATE', 'STUDENT', 2, 'Student profile updated', '192.168.1.3', NOW()),
(4, 1, 'CREATE', 'EXAM', 1, 'New exam created', '192.168.1.1', NOW()),
(5, 12, 'CREATE', 'ATTENDANCE', 1, 'Attendance marked', '192.168.1.12', NOW()),
(6, 22, 'UPDATE', 'EVALUATION', 1, 'Evaluation completed', '192.168.1.22', NOW()),
(7, 1, 'CREATE', 'RESULT', 1, 'Result published', '192.168.1.1', NOW()),
(8, 4, 'CREATE', 'GRIEVANCE', 4, 'Grievance submitted', '192.168.1.4', NOW()),
(9, 1, 'UPDATE', 'GRIEVANCE', 1, 'Grievance resolved', '192.168.1.1', NOW()),
(10, 13, 'CREATE', 'MALPRACTICE_REPORT', 1, 'Malpractice reported', '192.168.1.13', NOW());

-- ============================================================================
-- END OF SAMPLE DATA
-- ============================================================================
