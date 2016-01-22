@echo off

cd conf\
for /f "tokens=1,2 delims==" %%a in (config.ini) do ( 
 if %%a==timer set timer=%%b
)

cd ..
if not exist "output" mkdir output
cd lib\

@set /A timer=%timer%*60;

:loop
	set date_f=%date%
	set date_f=%date_f:/=%
	if not exist "..\output\%date_f%" mkdir ..\output\%date_f%
		
	set time_f=%time%
	set time_f=%time_f::=%
	set time_f=%time_f:.=_%
	set time_f=%time_f:,=%
	nircmd.exe savescreenshotfull ..\output\%date_f%\%time_f%.png
	
	timeout %timer% > NUL
goto loop