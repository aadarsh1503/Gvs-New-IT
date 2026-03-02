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
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  last_login_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_platform (platform),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify the table was created
SELECT * FROM social_media_accounts;
