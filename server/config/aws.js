import { SESClient } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';
import pool from './database.js';

dotenv.config();

// Function to get settings from database
const getSettings = async () => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });
    return settings;
  } catch (error) {
    console.error('Error fetching settings from database:', error);
    // Fallback to environment variables
    return {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION,
      AWS_SES_FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL,
      AWS_SES_FROM_NAME: process.env.AWS_SES_FROM_NAME
    };
  }
};

// Create SES client with settings from database
const createSESClient = async () => {
  const settings = await getSettings();
  
  return new SESClient({
    region: settings.AWS_REGION || 'eu-north-1',
    credentials: {
      accessKeyId: settings.AWS_ACCESS_KEY_ID,
      secretAccessKey: settings.AWS_SECRET_ACCESS_KEY
    }
  });
};

// Export function to get SES client
export const getSESClient = createSESClient;

// Export settings getter
export const getAWSSettings = getSettings;

// For backward compatibility, export a default client (will use env vars initially)
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export default sesClient;
