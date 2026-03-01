@echo off
echo ========================================
echo Setting up Settings Table
echo ========================================
echo.
echo This will create the settings table and insert default AWS SES configuration.
echo.
pause

mysql -h 92.112.181.224 -u gvsemployees -p"bxU<B[1C90/N" GVSemployees < settings_table.sql

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The settings table has been created with default AWS SES configuration.
echo You can now manage these settings from the Admin Settings page.
echo.
pause
