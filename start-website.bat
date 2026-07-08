@echo off
title Hodjapa Food Website
cd /d "%~dp0"
echo.
echo  Hodjapa Food website berjalan di:
echo  http://localhost:8080
echo.
echo  Tekan Ctrl+C untuk berhenti.
echo.
python -m http.server 8080