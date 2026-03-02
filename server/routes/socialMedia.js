import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all social media accounts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [accounts] = await pool.query(
      'SELECT * FROM social_media_accounts ORDER BY created_at DESC'
    );
    res.json(accounts);
  } catch (error) {
    console.error('Get social media accounts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single social media account
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [accounts] = await pool.query(
      'SELECT * FROM social_media_accounts WHERE id = ?',
      [req.params.id]
    );
    
    if (accounts.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(accounts[0]);
  } catch (error) {
    console.error('Get social media account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new social media account
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      platform,
      account_name,
      username,
      password,
      email,
      phone,
      recovery_email,
      profile_url,
      status
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO social_media_accounts (
        platform, account_name, username, password, email, phone,
        recovery_email, profile_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        platform,
        account_name,
        username,
        password,
        email || null,
        phone || null,
        recovery_email || null,
        profile_url || null,
        status || 'active'
      ]
    );

    res.status(201).json({
      message: 'Social media account created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create social media account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update social media account
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const {
      platform,
      account_name,
      username,
      password,
      email,
      phone,
      recovery_email,
      profile_url,
      status
    } = req.body;

    await pool.query(
      `UPDATE social_media_accounts SET
        platform = ?,
        account_name = ?,
        username = ?,
        password = ?,
        email = ?,
        phone = ?,
        recovery_email = ?,
        profile_url = ?,
        status = ?
      WHERE id = ?`,
      [
        platform,
        account_name,
        username,
        password,
        email || null,
        phone || null,
        recovery_email || null,
        profile_url || null,
        status || 'active',
        req.params.id
      ]
    );

    res.json({ message: 'Social media account updated successfully' });
  } catch (error) {
    console.error('Update social media account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete social media account
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM social_media_accounts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Social media account deleted successfully' });
  } catch (error) {
    console.error('Delete social media account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
