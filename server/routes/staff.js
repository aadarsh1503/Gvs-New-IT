import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Helper function to format date for MySQL
const formatDateForMySQL = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

// Create Staff (Public - from form submission)
router.post('/', async (req, res) => {
  try {
    const staffData = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO staff (
        staff_id, position, company, cr_number, staff_name, staff_cpr,
        cpr_issued_date, cpr_exp_date, passport_number, passport_issued_date,
        passport_exp_date, visa_state, visa_type, transfer_visa_date,
        last_joining_date, driving_license, driving_license_issued,
        driving_license_expiry, birthday, age, nationality, religion,
        personal_contact_whatsapp, personal_contact_email, office_contact_number,
        office_contact_email, emergency_contact_number, emergency_contact_name,
        emergency_contact_relationship, payment_way, bank_name, iban_number,
        benefit_number, date_of_joining
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        staffData.staffId, staffData.position, staffData.company, staffData.crNumber,
        staffData.staffName, staffData.staffCpr, 
        formatDateForMySQL(staffData.cprIssuedDate), 
        formatDateForMySQL(staffData.cprExpDate),
        staffData.passportNumber, 
        formatDateForMySQL(staffData.passportIssuedDate), 
        formatDateForMySQL(staffData.passportExpDate),
        staffData.visaState, staffData.visaType, 
        formatDateForMySQL(staffData.transferVisaDate),
        formatDateForMySQL(staffData.lastJoiningDate), 
        staffData.drivingLicense, 
        formatDateForMySQL(staffData.drivingLicenseIssued),
        formatDateForMySQL(staffData.drivingLicenseExpiry), 
        formatDateForMySQL(staffData.birthday), 
        staffData.age, staffData.nationality,
        staffData.religion, staffData.personalContactWhatsapp, staffData.personalContactEmail,
        staffData.officeContactNumber, staffData.officeContactEmail, staffData.emergencyContactNumber,
        staffData.emergencyContactName, staffData.emergencyContactRelationship, staffData.paymentWay,
        staffData.bankName, staffData.ibanNumber, staffData.benefitNumber, 
        formatDateForMySQL(staffData.dateOfJoining)
      ]
    );

    res.status(201).json({
      message: 'Staff details submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create staff error:', error);
    res.status(500).json({ message: 'Failed to submit staff details', error: error.message });
  }
});

// Get All Staff (Protected - Admin only)
router.get('/', authenticateToken, async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [staff] = await connection.query('SELECT * FROM staff ORDER BY created_at DESC');
    res.json(staff);
  } catch (error) {
    console.error('Get staff error:', error);
    
    // Handle specific database errors
    if (error.code === 'ECONNRESET' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      return res.status(503).json({ 
        message: 'Database connection lost. Please try again.',
        error: 'Connection reset' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to fetch staff',
      error: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
});

// Get Single Staff (Protected - Admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [staff] = await pool.query('SELECT * FROM staff WHERE id = ?', [req.params.id]);
    
    if (staff.length === 0) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json(staff[0]);
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ message: 'Failed to fetch staff' });
  }
});

// Update Staff (Protected - Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const staffData = req.body;
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE staff SET
        staff_id = ?, position = ?, company = ?, cr_number = ?, staff_name = ?,
        staff_cpr = ?, cpr_issued_date = ?, cpr_exp_date = ?, passport_number = ?,
        passport_issued_date = ?, passport_exp_date = ?, visa_state = ?, visa_type = ?,
        transfer_visa_date = ?, last_joining_date = ?, driving_license = ?,
        driving_license_issued = ?, driving_license_expiry = ?, birthday = ?, age = ?,
        nationality = ?, religion = ?, personal_contact_whatsapp = ?,
        personal_contact_email = ?, office_contact_number = ?, office_contact_email = ?,
        emergency_contact_number = ?, emergency_contact_name = ?,
        emergency_contact_relationship = ?, payment_way = ?, bank_name = ?,
        iban_number = ?, benefit_number = ?, date_of_joining = ?
      WHERE id = ?`,
      [
        staffData.staffId, staffData.position, staffData.company, staffData.crNumber,
        staffData.staffName, staffData.staffCpr, 
        formatDateForMySQL(staffData.cprIssuedDate), 
        formatDateForMySQL(staffData.cprExpDate),
        staffData.passportNumber, 
        formatDateForMySQL(staffData.passportIssuedDate), 
        formatDateForMySQL(staffData.passportExpDate),
        staffData.visaState, staffData.visaType, 
        formatDateForMySQL(staffData.transferVisaDate),
        formatDateForMySQL(staffData.lastJoiningDate), 
        staffData.drivingLicense, 
        formatDateForMySQL(staffData.drivingLicenseIssued),
        formatDateForMySQL(staffData.drivingLicenseExpiry), 
        formatDateForMySQL(staffData.birthday), 
        staffData.age, staffData.nationality,
        staffData.religion, staffData.personalContactWhatsapp, staffData.personalContactEmail,
        staffData.officeContactNumber, staffData.officeContactEmail, staffData.emergencyContactNumber,
        staffData.emergencyContactName, staffData.emergencyContactRelationship, staffData.paymentWay,
        staffData.bankName, staffData.ibanNumber, staffData.benefitNumber, 
        formatDateForMySQL(staffData.dateOfJoining),
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json({ message: 'Staff updated successfully' });
  } catch (error) {
    console.error('Update staff error:', error);
    res.status(500).json({ message: 'Failed to update staff', error: error.message });
  }
});

// Delete Staff (Protected - Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM staff WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error('Delete staff error:', error);
    res.status(500).json({ message: 'Failed to delete staff' });
  }
});

export default router;
