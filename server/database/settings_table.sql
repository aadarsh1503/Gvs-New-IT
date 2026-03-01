-- Create settings table for storing application configuration
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_description VARCHAR(255),
  is_encrypted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_setting_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default AWS SES settings and frontend URL
-- NOTE: Replace these placeholder values with your actual credentials
INSERT INTO settings (setting_key, setting_value, setting_description, is_encrypted) VALUES
('AWS_ACCESS_KEY_ID', 'YOUR_AWS_ACCESS_KEY_ID', 'AWS Access Key ID for SES', TRUE),
('AWS_SECRET_ACCESS_KEY', 'YOUR_AWS_SECRET_ACCESS_KEY', 'AWS Secret Access Key for SES', TRUE),
('AWS_REGION', 'eu-north-1', 'AWS Region for SES', FALSE),
('AWS_SES_FROM_EMAIL', 'info@gvs-bh.com', 'From Email Address for SES', FALSE),
('AWS_SES_FROM_NAME', 'GVS IT', 'From Name for SES emails', FALSE),
('FRONTEND_URL', 'http://localhost:5173', 'Frontend URL for password reset links', FALSE)
ON DUPLICATE KEY UPDATE 
  setting_value = VALUES(setting_value),
  setting_description = VALUES(setting_description);

-- Verify the table was created
SELECT * FROM settings;
