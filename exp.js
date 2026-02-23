const readline = require("readline");
const fs = require("fs");

const DATA_FILE = "employee.json";

// Load data from file
let employees = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        employees = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    } catch (error) {
        console.log("Error reading file. Initializing empty employee list.");
        employees = [];
    }
}

// Readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Save data to file
function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
}

// Add employee
function addEmployee() {
    rl.question("Enter Employee ID: ", (id) => {
        rl.question("Enter Employee Name: ", (name) => {
            rl.question("Enter Employee Designation: ", (designation) => {
                rl.question("Enter Employee Salary: ", (salary) => {

                    const newEmployee = {
                        id: id,
                        name: name,
                        designation: designation,
                        salary: salary
                    };

                    employees.push(newEmployee);
                    saveData();

                    console.log("Employee added successfully.");
                    showMenu();
                });
            });
        });
    });
}

// View all employees
function viewEmployees() {
    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        console.log("\nEmployee List:");
        employees.forEach((emp, index) => {
            console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}, Designation: ${emp.designation}, Salary: ${emp.salary}`);
        });
    }
    showMenu();
}

// Search employee by ID
function searchEmployee() {
    rl.question("Enter Employee ID to search: ", (id) => {
        const emp = employees.find(e => e.id === id);

        if (emp) {
            console.log("Employee Found:");
            console.log(emp);
        } else {
            console.log("Employee not found.");
        }
        showMenu();
    });
}

// Delete employee by ID
function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        const index = employees.findIndex(e => e.id === id);

        if (index !== -1) {
            employees.splice(index, 1);
            saveData();
            console.log("Employee deleted successfully.");
        } else {
            console.log("Employee not found.");
        }
        showMenu();
    });
}

// Handle menu choice
function handleMenu(choice) {
    switch (choice) {
        case "1":
            addEmployee();
            break;
        case "2":
            viewEmployees();
            break;
        case "3":
            searchEmployee();
            break;
        case "4":
            deleteEmployee();
            break;
        case "5":
            console.log("Exiting program...");
            rl.close();
            break;
        default:
            console.log("Invalid choice. Try again.");
            showMenu();
    }
}

// Show menu
function showMenu() {
    console.log("\n===== Employee Management System =====");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Search Employee by ID");
    console.log("4. Delete Employee by ID");
    console.log("5. Exit");

    rl.question("Enter your choice: ", handleMenu);
}

// Start program
showMenu();
