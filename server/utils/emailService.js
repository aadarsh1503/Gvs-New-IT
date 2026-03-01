import { SendEmailCommand } from '@aws-sdk/client-ses';
import { getSESClient, getAWSSettings } from '../config/aws.js';

export const sendResetPasswordEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/reset-password/${resetToken}`;
  
  // Get settings from database
  const settings = await getAWSSettings();
  const sesClient = await getSESClient();
  
  const params = {
    Source: `${settings.AWS_SES_FROM_NAME || 'GVS IT'} <${settings.AWS_SES_FROM_EMAIL || 'info@gvs-bh.com'}>`,
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: 'Password Reset Request - GVS Staff Management',
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0284c7 0%, #28a994 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 12px 30px; background: #0284c7; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                  <p>Hello,</p>
                  <p>We received a request to reset your password for your GVS Staff Management admin account.</p>
                  <p>Click the button below to reset your password:</p>
                  <div style="text-align: center;">
                    <a href="${resetLink}" class="button">Reset Password</a>
                  </div>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #0284c7;">${resetLink}</p>
                  <p><strong>This link will expire in 1 hour.</strong></p>
                  <p>If you didn't request this password reset, please ignore this email.</p>
                  <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} GVS IT. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
          Charset: 'UTF-8'
        }
      }
    }
  };

  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset email');
  }
};
