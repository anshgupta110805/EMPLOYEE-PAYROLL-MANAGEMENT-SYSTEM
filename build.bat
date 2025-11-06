@echo off
echo Building Employee Payroll Management System...
echo ============================================

REM Check if g++ is available
g++ --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: g++ compiler not found.
    echo Please install MinGW or another C++ compiler.
    echo.
    echo Using web version instead:
    echo Open index.html in your browser
    pause
    exit /b
)

REM Compile the C++ files
echo Compiling C++ files...
g++ -o payroll main.cpp Employee.cpp PayrollManager.cpp
if %errorlevel% neq 0 (
    echo Error: Compilation failed.
    echo Using web version instead:
    echo Open index.html in your browser
    pause
    exit /b
)

echo Build successful!
echo To run the C++ version, type: payroll.exe
echo To use the web version, open index.html in your browser
pause