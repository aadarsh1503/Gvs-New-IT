import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import staffRoutes from './routes/staff.js';
import settingsRoutes from './routes/settings.js';
import pool from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Database health check
app.get('/api/db-health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    res.json({ 
      status: 'OK', 
      message: 'Database connected successfully',
      test: rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Test database connection on startup
const testDatabaseConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('✅ Database connected successfully');
    
    // Check if tables exist
    const [tables] = await pool.query('SHOW TABLES');
    console.log(`📊 Found ${tables.length} tables in database`);
    
    if (tables.length === 0) {
      console.log('⚠️  WARNING: No tables found. Please run database/init.sql');
    } else {
      console.log('📋 Tables:', tables.map(t => Object.values(t)[0]).join(', '));
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please check your database credentials in .env file');
  }
};

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await testDatabaseConnection();
});
