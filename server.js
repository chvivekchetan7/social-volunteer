import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Secure Hashed OTP Store & Users Database
const otpsStore = new Map(); // email -> { otpHash, createdAt, expiresAt, attempts }
const usersDb = new Map(); // email -> User Object

// Seed Initial Users
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

initialUsers.forEach((u) => usersDb.set(u.email.toLowerCase(), u));

// Initialize Resend Client
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Initialize Nodemailer Transport Fallback
const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

let nodemailerTransporter = null;
if (smtpHost && smtpUser && smtpPass) {
  nodemailerTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
}

// Generate Cryptographically Secure 6-Digit OTP
const generateSecureOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Hash OTP for secure comparison
const hashOtp = (otp) => {
  return crypto.createHash('sha256').update(otp.trim()).digest('hex');
};

// Generate Professional SocialVolunteers.in Branded HTML Email
const createVerificationEmailHtml = (name, otpCode) => {
  const firstName = name ? name.split(' ')[0] : 'Volunteer';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email — SocialVolunteers.in</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F9FAFB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E5E7EB; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); overflow: hidden;">
          
          <!-- Header Branding -->
          <tr>
            <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #F3F4F6; background-color: #FFFFFF;">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background-color: #FFF2EC; border-radius: 12px; margin-bottom: 12px;">
                <span style="font-size: 24px; line-height: 1;">🌱</span>
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">
                Social<span style="color: #E85A2A;">Volunteers.in</span>
              </h1>
              <p style="margin: 4px 0 0; font-size: 13px; color: #6B7280; font-weight: 600;">
                People. Purpose. Positive Change.
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px; font-size: 18px; font-weight: 800; color: #111827;">
                Verify your email address
              </h2>
              <p style="margin: 0 0 24px; font-size: 15px; color: #4B5563; line-height: 1.6;">
                Hello <strong>${firstName}</strong>,<br>
                Use the verification code below to verify your email address and continue accessing SocialVolunteers.in:
              </p>

              <!-- OTP Code Display Box -->
              <div style="background-color: #FFF9F5; border: 2px dashed #E85A2A; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 34px; font-weight: 800; letter-spacing: 0.35em; color: #E85A2A; font-family: 'Courier New', Courier, monospace; margin-left: 0.35em;">
                  ${otpCode}
                </div>
                <div style="margin-top: 8px; font-size: 13px; color: #9CA3AF; font-weight: 600;">
                  Valid for 10 minutes
                </div>
              </div>

              <p style="margin: 0 0 16px; font-size: 14px; color: #6B7280; line-height: 1.5;">
                If you did not request this verification code, you can safely ignore this email. Someone may have entered your email address by mistake.
              </p>
              
              <div style="border-top: 1px solid #F3F4F6; padding-top: 16px; font-size: 13px; color: #9CA3AF;">
                <strong>Security note:</strong> Never share this 6-digit code with anyone. SocialVolunteers.in staff will never ask for your code.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #F9FAFB; border-top: 1px solid #F3F4F6; text-align: center; font-size: 12px; color: #9CA3AF; line-height: 1.5;">
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

// Dispatch Email via Resend, Nodemailer, or Log Configuration Alert
const sendTransactionalEmail = async (toEmail, name, otpCode) => {
  const senderEmail = process.env.EMAIL_FROM || 'SocialVolunteers <verification@socialvolunteers.in>';
  const subject = `${otpCode} is your SocialVolunteers.in verification code`;
  const htmlContent = createVerificationEmailHtml(name, otpCode);

  // Strategy 1: Resend SDK
  if (resend) {
    try {
      const data = await resend.emails.send({
        from: senderEmail,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      });
      console.log(`[REAL EMAIL DISPATCH] Sent via Resend API to ${toEmail} (ID: ${data.id || 'ok'})`);
      return { success: true, provider: 'resend' };
    } catch (err) {
      console.error('[EMAIL ERROR - RESEND]', err.message);
    }
  }

  // Strategy 2: Nodemailer SMTP
  if (nodemailerTransporter) {
    try {
      await nodemailerTransporter.sendMail({
        from: senderEmail,
        to: toEmail,
        subject: subject,
        html: htmlContent,
      });
      console.log(`[REAL EMAIL DISPATCH] Sent via SMTP Transport to ${toEmail}`);
      return { success: true, provider: 'smtp' };
    } catch (err) {
      console.error('[EMAIL ERROR - SMTP]', err.message);
    }
  }

  // Configuration Notice if No Provider Credentials Set
  console.log('---------------------------------------------------------');
  console.log(`[SERVER TRANSACTIONAL OTP GENERATED] To: ${toEmail} | Code: ${otpCode}`);
  console.log('NOTICE: To deliver emails to real inboxes, configure RESEND_API_KEY or SMTP_HOST in .env file.');
  console.log('---------------------------------------------------------');
  
  return { success: true, provider: 'simulated_server_log' };
};

// API 1: SEND OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const now = Date.now();

    // Check Rate Limiting (60s resend cooldown)
    const existingRecord = otpsStore.get(cleanEmail);
    if (existingRecord && now - existingRecord.createdAt < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (now - existingRecord.createdAt)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSec} seconds before requesting another verification code.`,
      });
    }

    // Generate Secure 6-Digit OTP and Hash
    const otpCode = generateSecureOtp();
    const otpHash = hashOtp(otpCode);
    const expiresAt = now + 10 * 60 * 1000; // 10 mins

    // Store Hashed OTP Record
    otpsStore.set(cleanEmail, {
      otpHash,
      createdAt: now,
      expiresAt,
      attempts: 0,
    });

    // Lookup user name if existing
    const existingUser = usersDb.get(cleanEmail);
    const recipientName = existingUser ? existingUser.name : cleanEmail.split('@')[0];

    // Dispatch Email
    await sendTransactionalEmail(cleanEmail, recipientName, otpCode);

    // Return SUCCESS without revealing the OTP code
    return res.json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
    });
  } catch (error) {
    console.error('[API /api/auth/send-otp ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error while sending verification code.' });
  }
});

// API 2: VERIFY OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const inputOtp = otp.trim();
    const record = otpsStore.get(cleanEmail);
    const now = Date.now();

    if (!record) {
      return res.status(400).json({ success: false, message: 'No verification code found for this email. Please request a new code.' });
    }

    // Check expiration
    if (now > record.expiresAt) {
      otpsStore.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    }

    // Check max attempt rate limiting (max 5)
    if (record.attempts >= 5) {
      otpsStore.delete(cleanEmail);
      return res.status(429).json({ success: false, message: 'Too many failed verification attempts. Please request a new code.' });
    }

    // Compare Hash
    const inputHash = hashOtp(inputOtp);
    if (inputHash !== record.otpHash) {
      record.attempts += 1;
      otpsStore.set(cleanEmail, record);
      const remaining = 5 - record.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`,
      });
    }

    // OTP Verified Successfully! Consume OTP
    otpsStore.delete(cleanEmail);

    // Fetch or Create User Account
    let user = usersDb.get(cleanEmail);
    if (!user) {
      const generatedId = `SV-VOL-${Math.floor(100000 + Math.random() * 900000)}`;
      const nameFromEmail = cleanEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
      const formattedName = nameFromEmail ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) : 'Volunteer';

      user = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        name: formattedName,
        phone: '+91 ',
        role: 'USER',
        verified: true,
        volunteerId: generatedId,
        createdAt: new Date().toISOString().split('T')[0],
        hours: 0,
        skills: 'Volunteer',
        interests: 'Community Welfare',
      };
      usersDb.set(cleanEmail, user);
    } else {
      user.verified = true;
      usersDb.set(cleanEmail, user);
    }

    const sessionToken = `token_${Date.now()}_${crypto.randomBytes(16).toString('hex')}`;

    return res.json({
      success: true,
      user,
      token: sessionToken,
      message: 'Email verified successfully.',
    });
  } catch (error) {
    console.error('[API /api/auth/verify-otp ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error while verifying code.' });
  }
});

// API 3: REGISTER USER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone number are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (usersDb.has(cleanEmail) && usersDb.get(cleanEmail).verified) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists. Please log in.' });
    }

    const generatedId = `SV-VOL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newUser = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: name.trim(),
      phone: phone.trim(),
      role: 'USER',
      verified: false,
      volunteerId: generatedId,
      createdAt: new Date().toISOString().split('T')[0],
      hours: 0,
      skills: 'General Volunteer',
      interests: 'Grassroots Initiatives',
    };

    usersDb.set(cleanEmail, newUser);

    // Send Verification OTP
    const now = Date.now();
    const otpCode = generateSecureOtp();
    const otpHash = hashOtp(otpCode);
    const expiresAt = now + 10 * 60 * 1000;

    otpsStore.set(cleanEmail, {
      otpHash,
      createdAt: now,
      expiresAt,
      attempts: 0,
    });

    await sendTransactionalEmail(cleanEmail, newUser.name, otpCode);

    return res.json({
      success: true,
      message: `Account created. Verification code sent to ${cleanEmail}`,
    });
  } catch (error) {
    console.error('[API /api/auth/register ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error while creating account.' });
  }
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`SocialVolunteers.in Auth Server active on port ${PORT}`);
  console.log(`Resend API Key: ${resendApiKey ? 'CONFIGURED' : 'NOT SET (Set RESEND_API_KEY in .env)'}`);
  console.log(`SMTP Host: ${smtpHost ? smtpHost : 'NOT SET'}`);
  console.log(`=================================================`);
});
