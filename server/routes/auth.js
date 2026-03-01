import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { sendResetPasswordEmail } from '../utils/emailService.js';
import crypto from 'crypto';

const router = express.Router();

// Signup
router.post('/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      const [existing] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
      
      if (existing.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await pool.query(
        'INSERT INTO admins (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );

      const token = jwt.sign(
        { id: result.insertId, email, name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Admin created successfully',
        token,
        admin: { id: result.insertId, email, name }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [admins] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
      
      if (admins.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const admin = admins[0];
      const isValidPassword = await bcrypt.compare(password, admin.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, name: admin.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        admin: { id: admin.id, email: admin.email, name: admin.name }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Forgot Password
router.post('/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const [admins] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
      
      if (admins.length === 0) {
        return res.status(404).json({ message: 'Email not found' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      await pool.query(
        'UPDATE admins SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
        [resetToken, resetTokenExpiry, email]
      );

      await sendResetPasswordEmail(email, resetToken);

      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Failed to send reset email' });
    }
  }
);

// Reset Password
router.post('/reset-password/:token',
  [body('password').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.params;
    const { password } = req.body;

    try {
      const [admins] = await pool.query(
        'SELECT id FROM admins WHERE reset_token = ? AND reset_token_expiry > NOW()',
        [token]
      );

      if (admins.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        'UPDATE admins SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
        [hashedPassword, admins[0].id]
      );

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
