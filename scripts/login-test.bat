@echo off
cd /d E:\ReactProjects\perfectcv-next

if "%1"=="" (
    echo Erreur : Veuillez fournir un mot de passe
    echo Utilisation : login-test.bat "votre_mot_de_passe"
    exit /b 1
)

npx ts-node -P tsconfig-scripts.json scripts/login-test.ts "%1"
