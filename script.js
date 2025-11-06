// Sample data for demonstration
let employees = [
    { id: 'EMP001', name: 'John Smith', position: 'Software Engineer', department: 'IT', salaryType: 'salaried', salary: 750000, hourlyRate: 0, hoursWorked: 160 },
    { id: 'EMP002', name: 'Sarah Johnson', position: 'HR Manager', department: 'HR', salaryType: 'salaried', salary: 680000, hourlyRate: 0, hoursWorked: 160 },
    { id: 'EMP003', name: 'Michael Brown', position: 'Accountant', department: 'Finance', salaryType: 'hourly', salary: 0, hourlyRate: 250, hoursWorked: 150 },
    { id: 'EMP004', name: 'Emily Davis', position: 'Marketing Specialist', department: 'Marketing', salaryType: 'salaried', salary: 550000, hourlyRate: 0, hoursWorked: 160 },
    { id: 'EMP005', name: 'Robert Wilson', position: 'System Administrator', department: 'IT', salaryType: 'hourly', salary: 0, hourlyRate: 300, hoursWorked: 140 }
];

let activities = [
    { id: 1, type: 'add', message: 'Added new employee John Smith', time: '2 hours ago' },
    { id: 2, type: 'payroll', message: 'Processed monthly payroll', time: '1 day ago' },
    { id: 3, type: 'report', message: 'Generated salary distribution report', time: '2 days ago' },
    { id: 4, type: 'add', message: 'Added new employee Sarah Johnson', time: '3 days ago' }
];

// DOM Elements
const tabLinks = document.querySelectorAll('.nav a');
const tabContents = document.querySelectorAll('.tab-content');
const addEmployeeModal = document.getElementById('add-employee-modal');
const editEmployeeModal = document.getElementById('edit-employee-modal');
const openAddEmployeeBtn = document.getElementById('open-add-employee-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const cancelButtons = document.querySelectorAll('#cancel-employee-btn, #cancel-edit-employee-btn');
const employeeForm = document.getElementById('employee-form');
const editEmployeeForm = document.getElementById('edit-employee-form');
const employeeTableBody = document.getElementById('employee-table-body');
const activityList = document.getElementById('activity-list');
const searchInput = document.getElementById('employee-search');

// Tab Switching
tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Update dashboard stats when switching to dashboard
        if (tabId === 'dashboard') {
            updateDashboardStats();
        }
        
        // Update employee table when switching to employees tab
        if (tabId === 'employees') {
            renderEmployeeTable();
        }
        
        // Update payroll table when switching to payroll tab
        if (tabId === 'payroll') {
            renderPayrollTable();
        }
    });
});

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Open Add Employee Modal
openAddEmployeeBtn.addEventListener('click', () => {
    openModal(addEmployeeModal);
});

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        closeModal(addEmployeeModal);
        closeModal(editEmployeeModal);
    });
});

cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
        closeModal(addEmployeeModal);
        closeModal(editEmployeeModal);
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addEmployeeModal) {
        closeModal(addEmployeeModal);
    }
    if (e.target === editEmployeeModal) {
        closeModal(editEmployeeModal);
    }
});

// Toggle Salary Type Fields
document.querySelectorAll('input[name="salary-type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const salaryInput = document.getElementById('salary-input');
        const hourlyInput = document.getElementById('hourly-input');
        
        if (this.value === 'salaried') {
            salaryInput.classList.remove('hidden');
            hourlyInput.classList.add('hidden');
        } else {
            salaryInput.classList.add('hidden');
            hourlyInput.classList.remove('hidden');
        }
    });
});

// Toggle Edit Salary Type Fields
document.querySelectorAll('input[name="edit-salary-type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const salaryInput = document.getElementById('edit-salary-input');
        const hourlyInput = document.getElementById('edit-hourly-input');
        
        if (this.value === 'salaried') {
            salaryInput.classList.remove('hidden');
            hourlyInput.classList.add('hidden');
        } else {
            salaryInput.classList.add('hidden');
            hourlyInput.classList.remove('hidden');
        }
    });
});

// Add Employee Form Submission
employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('employee-id').value;
    const name = document.getElementById('employee-name').value;
    const position = document.getElementById('employee-position').value;
    const department = document.getElementById('employee-department').value;
    const salaryType = document.querySelector('input[name="salary-type"]:checked').value;
    const salary = salaryType === 'salaried' ? parseFloat(document.getElementById('employee-salary').value) : 0;
    const hourlyRate = salaryType === 'hourly' ? parseFloat(document.getElementById('hourly-rate').value) : 0;
    const hoursWorked = parseFloat(document.getElementById('hours-worked').value);
    
    // Create new employee object
    const newEmployee = {
        id,
        name,
        position,
        department,
        salaryType,
        salary,
        hourlyRate,
        hoursWorked
    };
    
    // Add to employees array
    employees.push(newEmployee);
    
    // Add to activity log
    activities.unshift({
        id: activities.length + 1,
        type: 'add',
        message: `Added new employee ${name}`,
        time: 'Just now'
    });
    
    // Update UI
    renderEmployeeTable();
    updateDashboardStats();
    renderActivityList();
    
    // Reset form and close modal
    employeeForm.reset();
    closeModal(addEmployeeModal);
    
    // Show success message
    alert(`Employee ${name} added successfully!`);
});

// Edit Employee Form Submission
editEmployeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('edit-employee-id').value;
    const name = document.getElementById('edit-employee-name').value;
    const position = document.getElementById('edit-employee-position').value;
    const department = document.getElementById('edit-employee-department').value;
    const salaryType = document.querySelector('input[name="edit-salary-type"]:checked').value;
    const salary = salaryType === 'salaried' ? parseFloat(document.getElementById('edit-employee-salary').value) : 0;
    const hourlyRate = salaryType === 'hourly' ? parseFloat(document.getElementById('edit-hourly-rate').value) : 0;
    const hoursWorked = parseFloat(document.getElementById('edit-hours-worked').value);
    
    // Find and update employee
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex !== -1) {
        employees[employeeIndex] = {
            id,
            name,
            position,
            department,
            salaryType,
            salary,
            hourlyRate,
            hoursWorked
        };
        
        // Add to activity log
        activities.unshift({
            id: activities.length + 1,
            type: 'edit',
            message: `Updated employee ${name}`,
            time: 'Just now'
        });
        
        // Update UI
        renderEmployeeTable();
        updateDashboardStats();
        renderActivityList();
        
        // Close modal
        closeModal(editEmployeeModal);
        
        // Show success message
        alert(`Employee ${name} updated successfully!`);
    }
});

// Delete Employee
function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            employees = employees.filter(emp => emp.id !== id);
            
            // Add to activity log
            activities.unshift({
                id: activities.length + 1,
                type: 'delete',
                message: `Deleted employee ${employee.name}`,
                time: 'Just now'
            });
            
            // Update UI
            renderEmployeeTable();
            updateDashboardStats();
            renderActivityList();
            
            // Show success message
            alert(`Employee ${employee.name} deleted successfully!`);
        }
    }
}

// Edit Employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        // Populate form fields
        document.getElementById('edit-employee-id').value = employee.id;
        document.getElementById('edit-employee-name').value = employee.name;
        document.getElementById('edit-employee-position').value = employee.position;
        document.getElementById('edit-employee-department').value = employee.department;
        
        // Set salary type
        document.querySelectorAll('input[name="edit-salary-type"]').forEach(radio => {
            radio.checked = radio.value === employee.salaryType;
        });
        
        // Show/hide appropriate fields
        if (employee.salaryType === 'salaried') {
            document.getElementById('edit-salary-input').classList.remove('hidden');
            document.getElementById('edit-hourly-input').classList.add('hidden');
            document.getElementById('edit-employee-salary').value = employee.salary;
        } else {
            document.getElementById('edit-salary-input').classList.add('hidden');
            document.getElementById('edit-hourly-input').classList.remove('hidden');
            document.getElementById('edit-hourly-rate').value = employee.hourlyRate;
        }
        
        document.getElementById('edit-hours-worked').value = employee.hoursWorked;
        
        // Open modal
        openModal(editEmployeeModal);
    }
}

// Render Employee Table
function renderEmployeeTable(filteredEmployees = null) {
    const employeesToShow = filteredEmployees || employees;
    employeeTableBody.innerHTML = '';
    
    employeesToShow.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.salaryType === 'salaried' ? 'Salaried' : 'Hourly'}</td>
            <td>₹${employee.salaryType === 'salaried' ? employee.salary.toLocaleString() : employee.hourlyRate}/hr</td>
            <td>
                <button class="action-btn edit-btn" onclick="editEmployee('${employee.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" onclick="deleteEmployee('${employee.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Render Activity List
function renderActivityList() {
    activityList.innerHTML = '';
    
    activities.slice(0, 5).forEach(activity => {
        let iconClass = 'fa-info-circle';
        if (activity.type === 'add') iconClass = 'fa-user-plus';
        if (activity.type === 'edit') iconClass = 'fa-user-edit';
        if (activity.type === 'delete') iconClass = 'fa-user-minus';
        if (activity.type === 'payroll') iconClass = 'fa-file-invoice-dollar';
        if (activity.type === 'report') iconClass = 'fa-chart-bar';
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.message}</h4>
                <p class="activity-time">${activity.time}</p>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Update Dashboard Stats
function updateDashboardStats() {
    // Total employees
    document.getElementById('total-employees').textContent = employees.length;
    
    // Total payroll
    let totalPayroll = 0;
    employees.forEach(emp => {
        if (emp.salaryType === 'salaried') {
            totalPayroll += emp.salary / 12; // Monthly amount
        } else {
            totalPayroll += emp.hourlyRate * emp.hoursWorked; // Monthly amount
        }
    });
    document.getElementById('total-payroll').textContent = '₹' + totalPayroll.toLocaleString(undefined, {maximumFractionDigits: 2});
    
    // New employees (in this example, we'll show last 2 added)
    document.getElementById('new-employees').textContent = Math.min(2, employees.length);
    
    // Average salary
    let totalSalary = 0;
    let salariedCount = 0;
    employees.forEach(emp => {
        if (emp.salaryType === 'salaried') {
            totalSalary += emp.salary;
            salariedCount++;
        }
    });
    const avgSalary = salariedCount > 0 ? totalSalary / salariedCount : 0;
    document.getElementById('avg-salary').textContent = '₹' + avgSalary.toLocaleString(undefined, {maximumFractionDigits: 0});
    
    // Payroll section stats
    document.getElementById('payroll-employee-count').textContent = employees.length;
    document.getElementById('total-payroll-amount').textContent = '₹' + totalPayroll.toLocaleString(undefined, {maximumFractionDigits: 2});
}

// Render Payroll Table
function renderPayrollTable() {
    const payrollTableBody = document.getElementById('payroll-table-body');
    payrollTableBody.innerHTML = '';
    
    employees.forEach(employee => {
        let baseSalary = 0;
        let overtime = 0;
        let deductions = 0;
        let netPay = 0;
        let status = 'Pending';
        
        if (employee.salaryType === 'salaried') {
            baseSalary = employee.salary / 12; // Monthly salary
            netPay = baseSalary - deductions;
            status = 'Processed';
        } else {
            baseSalary = employee.hourlyRate * Math.min(employee.hoursWorked, 160); // Regular hours
            if (employee.hoursWorked > 160) {
                overtime = (employee.hoursWorked - 160) * employee.hourlyRate * 1.5; // Overtime pay
            }
            netPay = baseSalary + overtime - deductions;
            status = 'Processed';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>₹${baseSalary.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>₹${overtime.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>₹${deductions.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>₹${netPay.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td><span class="status ${status.toLowerCase()}">${status}</span></td>
        `;
        payrollTableBody.appendChild(row);
    });
}

// Search Employees
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm === '') {
        renderEmployeeTable();
        return;
    }
    
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.id.toLowerCase().includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm)
    );
    
    renderEmployeeTable(filteredEmployees);
});

// Quick Action Buttons
document.getElementById('add-employee-btn').addEventListener('click', () => {
    openModal(addEmployeeModal);
});

document.getElementById('process-payroll-btn').addEventListener('click', () => {
    // Simulate payroll processing
    alert('Payroll processed successfully!');
    
    // Add to activity log
    activities.unshift({
        id: activities.length + 1,
        type: 'payroll',
        message: 'Processed monthly payroll',
        time: 'Just now'
    });
    
    // Update UI
    renderActivityList();
    renderPayrollTable();
    updateDashboardStats();
});

document.getElementById('generate-report-btn').addEventListener('click', () => {
    // Simulate report generation
    alert('Report generated successfully!');
    
    // Add to activity log
    activities.unshift({
        id: activities.length + 1,
        type: 'report',
        message: 'Generated employee report',
        time: 'Just now'
    });
    
    // Update UI
    renderActivityList();
    
    // Switch to reports tab
    tabLinks.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    document.querySelector('[data-tab="reports"]').classList.add('active');
    document.getElementById('reports').classList.add('active');
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderEmployeeTable();
    renderActivityList();
    updateDashboardStats();
    renderPayrollTable();
    
    // Set current period in payroll section
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-period').textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
});