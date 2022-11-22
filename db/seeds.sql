USE employeeDB;

INSERT INTO department(department_name)
VALUES
('Union leadership'),
('Financial'),
('Records'),
('Grievance');

INSERT INTO employee_role (title, salary, department_id)
VALUES
('President, 100000.00, 1'),
('Vice President, 75000.00, 1'),
('Financial Secretary, 90000.00, 2'),
('Treasurer, 75000.00, 2'),
('Recording Secretary, 60000.00, 3'),
('Steward, 45000.00, 3'),
('Grievance Committee, 60000.00, 4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Casey', 'Rahmlow', 1, NULL),
('Darion', 'Sutton', 1, 1),
('Ed', 'Hemmelman', 2, 1),
('Chad', 'Kostohryz', 2, 2),
('Doug', 'Lundberg', 3, 1),
('Demond', 'Gray', 3, 1),
('Kathy', 'Dahm', 3, 1),
('Roger', 'Martineau', 3, 1),
('Luke', 'Wincentsen', 4, 3),
('Tim', 'Ramhlow', 4, 3),
('Tyrone', 'Abington', 4, 3);