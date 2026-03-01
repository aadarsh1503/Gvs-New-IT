import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all settings (Protected - Admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT setting_key, setting_value, setting_description FROM settings ORDER BY setting_key');
    
    // Convert array to object for easier frontend use
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.setting_key] = {
        value: setting.setting_value,
        description: setting.setting_description
      };
    });
    
    res.json(settingsObject);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
});

// Update settings (Protected - Admin only)
router.put('/', authenticateToken, [
  body('AWS_ACCESS_KEY_ID').optional().trim(),
  body('AWS_SECRET_ACCESS_KEY').optional().trim(),
  body('AWS_REGION').optional().trim(),
  body('AWS_SES_FROM_EMAIL').optional().isEmail(),
  body('AWS_SES_FROM_NAME').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const settings = req.body;
  
  try {
    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      if (value !== undefined && value !== null) {
        await pool.query(
          'UPDATE settings SET setting_value = ?, updated_at = NOW() WHERE setting_key = ?',
          [value, key]
        );
      }
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Failed to update settings' });
  }
});

// Get a single setting by key (Protected - Admin only)
router.get('/:key', authenticateToken, async (req, res) => {
  try {
    const [settings] = await pool.query(
      'SELECT setting_key, setting_value, setting_description FROM settings WHERE setting_key = ?',
      [req.params.key]
    );
    
    if (settings.length === 0) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json(settings[0]);
  } catch (error) {
    console.error('Get setting error:', error);
    res.status(500).json({ message: 'Failed to fetch setting' });
  }
});

export default router;
