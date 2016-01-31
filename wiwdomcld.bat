@echo off

cd conf\
for /f "tokens=1,2 delims==" %%a in (config.ini) do ( 
 if %%a==timer set timer=%%b
)
for /f "tokens=1,2 delims==" %%a in (config.ini) do (
 if %%a==output set output=%%b
)

if %output% == default set output=..\output

cd ..
if not exist "output" mkdir output
cd lib\

@set /A timer=%timer%*60;

:loop
    set hour=%time:~0,2%
    if "%hour:~0,1%" == " " set hour=0%hour:~1,1%
    set min=%time:~3,2%
    if "%min:~0,1%" == " " set min=0%min:~1,1%
    set secs=%time:~6,2%
    if "%secs:~0,1%" == " " set secs=0%secs:~1,1%

    set year=%date:~-4%
    set month=%date:~3,2%
    if "%month:~0,1%" == " " set month=0%month:~1,1%
    set day=%date:~0,2%
    if "%day:~0,1%" == " " set day=0%day:~1,1%

	set date_f=%year%%month%%day%
	if not exist "%output%\%date_f%" mkdir %output%\%date_f%

	set time_f=%hour%_%min%_%secs%
	nircmd.exe savescreenshotfull %output%\%date_f%\%time_f%.png

	ping -n %timer% 127.0.0.1 >nul
goto loop