@echo off
echo ==========================================
echo 🚀 MARG.AI - PERMANENT STARTUP SCRIPT
echo ==========================================

cd server
echo [1/2] Starting Unified Server on Port 5000...
start /b npm start

echo [2/2] Starting Permanent Tunnel (Localtunnel)...
npx localtunnel --port 5000 --subdomain margai-final-live

echo ==========================================
echo ✅ Marg.ai is now LIVE locally and online.
echo if the tunnel drops, just restart this script.
echo ==========================================
pause
