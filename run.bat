@echo off
echo Starting Employee Payroll Management System...
echo ==========================================

REM Check if the executable exists
if not exist payroll.exe (
    echo Error: payroll.exe not found.
    echo Please run build.bat first to compile the program.
    pause
    exit /b
)

REM Run the program
echo Starting C++ version...
payroll.exe
pause