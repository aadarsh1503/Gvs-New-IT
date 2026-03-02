@echo off
echo ========================================
echo Setting up Social Media Accounts Table
echo ========================================
echo.
echo This will create the social_media_accounts table.
echo.
pause

mysql -h 92.112.181.224 -u gvsemployees -p"bxU<B[1C90/N" GVSemployees < social_media_table.sql

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The social_media_accounts table has been created.
echo You can now manage social media accounts from the Admin Panel.
echo.
pause
