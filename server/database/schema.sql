-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id VARCHAR(100) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  cr_number VARCHAR(255) NOT NULL,
  staff_name VARCHAR(255) NOT NULL,
  staff_cpr VARCHAR(100) NOT NULL,
  cpr_issued_date DATE,
  cpr_exp_date DATE,
  passport_number VARCHAR(100),
  passport_issued_date DATE,
  passport_exp_date DATE,
  visa_state VARCHAR(255),
  visa_type VARCHAR(100),
  transfer_visa_date DATE,
  last_joining_date DATE,
  driving_license VARCHAR(10),
  driving_license_issued DATE,
  driving_license_expiry DATE,
  birthday DATE,
  age INT,
  nationality VARCHAR(100),
  religion VARCHAR(100),
  personal_contact_whatsapp VARCHAR(50),
  personal_contact_email VARCHAR(255),
  office_contact_number VARCHAR(50),
  office_contact_email VARCHAR(255),
  emergency_contact_number VARCHAR(50),
  emergency_contact_name VARCHAR(255),
  emergency_contact_relationship VARCHAR(100),
  payment_way VARCHAR(100),
  bank_name VARCHAR(255),
  iban_number VARCHAR(100),
  benefit_number VARCHAR(100),
  date_of_joining DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_staff_id ON staff(staff_id);
CREATE INDEX idx_staff_name ON staff(staff_name);
CREATE INDEX idx_company ON staff(company);
CREATE INDEX idx_created_at ON staff(created_at);
