import crypto from 'crypto';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Global In-Memory Stores for Serverless Function Warm Instances
global.otpsStore = global.otpsStore || new Map();
global.usersDb = global.usersDb || new Map();

// Seed initial users if empty
if (global.usersDb.size === 0) {
  const initialUsers = [
    {
      id: 'usr-101',
      email: 'aarav.sharma@example.com',
      name: 'Aarav Sharma',
      phone: '+91 98765 43210',
      role: 'USER',
      verified: true,
      volunteerId: 'SV-VOL-849201',
      createdAt: '2025-04-12',
      hours: 42,
      skills: 'Mathematics, Digital Literacy, Teaching',
      interests: 'EdTech, Youth Mentorship',
    },
    {
      id: 'usr-102',
      email: 'priya.s@example.com',
      name: 'Priya Sundaram',
      phone: '+91 98765 11223',
      role: 'USER',
      verified: true,
      volunteerId: 'SV-VOL-992104',
      createdAt: '2025-05-18',
      hours: 68,
      skills: 'First Aid, Patient Care, Operations',
      interests: 'Diagnostic Camps, Healthcare',
    },
    {
      id: 'admin-1',
      email: 'admin@socialvolunteers.in',
      name: 'System Administrator',
      phone: '+91 99999 00000',
      role: 'ADMIN',
      verified: true,
      volunteerId: 'SV-ADM-000001',
      createdAt: '2025-01-01',
      hours: 500,
      skills: 'Platform Management, Security, Logistics',
      interests: 'All Causes',
    },
  ];
  initialUsers.forEach((u) => global.usersDb.set(u.email.toLowerCase(), u));
}

export const otpsStore = global.otpsStore;
export const usersDb = global.usersDb;

export const generateSecureOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export const hashOtp = (otp) => {
  return crypto.createHash('sha256').update(otp.trim()).digest('hex');
};

export const createVerificationEmailHtml = (name, otpCode) => {
  const firstName = name ? name.split(' ')[0] : 'Volunteer';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email — SocialVolunteers.in</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E5E7EB; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); overflow: hidden;">
          <tr>
            <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #F3F4F6;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background-color: #FFF2EC; border-radius: 12px; margin-bottom: 12px;">
                <span style="font-size: 24px;">🌱</span>
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #111827;">
                Social<span style="color: #E85A2A;">Volunteers.in</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 800; color: #111827;">
                Verify your email address
              </h2>
              <p style="margin: 0 0 24px; font-size: 15px; color: #4B5563; line-height: 1.6;">
                Hello <strong>${firstName}</strong>,<br>
                Use the verification code below to verify your email address and continue accessing SocialVolunteers.in:
              </p>
              <div style="background-color: #FFF9F5; border: 2px dashed #E85A2A; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 34px; font-weight: 800; letter-spacing: 0.35em; color: #E85A2A; font-family: monospace;">
                  ${otpCode}
                </div>
                <div style="margin-top: 8px; font-size: 13px; color: #9CA3AF; font-weight: 600;">
                  Valid for 10 minutes
                </div>
              </div>
              <p style="margin: 0 0 16px; font-size: 14px; color: #6B7280; line-height: 1.5;">
                If you did not request this verification code, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6; text-align: center; font-size: 12px; color: #9CA3AF;">
              © ${new Date().getFullYear()} SocialVolunteers.in • Connecting volunteers with grassroots social impact across India.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const sendTransactionalEmail = async (toEmail, name, otpCode) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.EMAIL_FROM || 'SocialVolunteers <verification@socialvolunteers.in>';
  const subject = `${otpCode} is your SocialVolunteers.in verification code`;
  const htmlContent = createVerificationEmailHtml(name, otpCode);

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: senderEmail,
        to: [toEmail],
        subject,
        html: htmlContent,
      });
      console.log(`[VERCEL EMAIL DISPATCH] Sent via Resend API to ${toEmail}`);
      return { success: true, provider: 'resend' };
    } catch (err) {
      console.error('[EMAIL ERROR - RESEND]', err.message);
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({
        from: senderEmail,
        to: toEmail,
        subject,
        html: htmlContent,
      });
      console.log(`[VERCEL EMAIL DISPATCH] Sent via SMTP Transport to ${toEmail}`);
      return { success: true, provider: 'smtp' };
    } catch (err) {
      console.error('[EMAIL ERROR - SMTP]', err.message);
    }
  }

  console.log(`[SERVERLESS OTP LOGGED] To: ${toEmail} | OTP: ${otpCode}`);
  return { success: true, provider: 'simulated_log' };
};
