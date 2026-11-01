@echo off
setlocal
title Mini Jarvis local
pushd "%~dp0"
set "JARVIS_NODE=%~dp0runtime\node.exe"
if not exist "%JARVIS_NODE%" (
  where node >nul 2>nul
  if errorlevel 1 (
    echo No se encontro el runtime. Extrae TODO el ZIP antes de iniciar.
    echo Si descargaste solo el codigo fuente, instala Node.js 22 o superior.
    pause
    popd
    exit /b 1
  )
  set "JARVIS_NODE=node"
)
"%JARVIS_NODE%" "%~dp0server.mjs"
if errorlevel 1 pause
popd
endlocal
