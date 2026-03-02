-- Create social_media_accounts table for storing social media credentials
CREATE TABLE IF NOT EXISTS social_media_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  recovery_email VARCHAR(255),
  profile_url VARCHAR(500),
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_platform (platform),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- If table already exists, remove old columns (if they exist)
ALTER TABLE social_media_accounts 
  DROP COLUMN IF EXISTS two_factor_enabled,
  DROP COLUMN IF EXISTS notes,
  DROP COLUMN IF EXISTS last_login_date;

-- Add profile_url column if it doesn't exist
ALTER TABLE social_media_accounts 
  ADD COLUMN IF NOT EXISTS profile_url VARCHAR(500) AFTER recovery_email;

-- Verify the table structure
DESCRIBE social_media_accounts;

-- View all records
SELECT * FROM social_media_accounts;
