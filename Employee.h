#ifndef EMPLOYEE_H
#define EMPLOYEE_H

class Employee {
protected:
    char id[20];
    char name[50];
    char position[50];
    char department[50];
    char salaryType[20];

public:
    Employee();
    Employee(char* id, char* name, char* position, 
             char* department, char* salaryType);
    virtual ~Employee() = default;
    
    // Getters
    char* getId() const;
    char* getName() const;
    char* getPosition() const;
    char* getDepartment() const;
    char* getSalaryType() const;
    
    // Setters
    void setId(char* id);
    void setName(char* name);
    void setPosition(char* position);
    void setDepartment(char* department);
    void setSalaryType(char* salaryType);
    
    // Virtual functions
    virtual double calculatePay() const = 0;
    virtual void display() const;
};

class SalariedEmployee : public Employee {
private:
    double annualSalary;

public:
    SalariedEmployee();
    SalariedEmployee(char* id, char* name, char* position,
                     char* department, double annualSalary);
    
    double getAnnualSalary() const;
    void setAnnualSalary(double annualSalary);
    
    double calculatePay() const override;
    void display() const override;
};

class HourlyEmployee : public Employee {
private:
    double hourlyRate;
    double hoursWorked;

public:
    HourlyEmployee();
    HourlyEmployee(char* id, char* name, char* position,
                   char* department, double hourlyRate, double hoursWorked);
    
    double getHourlyRate() const;
    double getHoursWorked() const;
    void setHourlyRate(double hourlyRate);
    void setHoursWorked(double hoursWorked);
    
    double calculatePay() const override;
    void display() const override;
};

#endif