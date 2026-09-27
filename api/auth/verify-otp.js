import crypto from 'crypto';
import { otpsStore, usersDb, hashOtp } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email, otp } = req.body || {};
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

    if (now > record.expiresAt) {
      otpsStore.delete(cleanEmail);
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    }

    if (record.attempts >= 5) {
      otpsStore.delete(cleanEmail);
      return res.status(429).json({ success: false, message: 'Too many failed verification attempts. Please request a new code.' });
    }

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

    otpsStore.delete(cleanEmail);

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

    return res.status(200).json({
      success: true,
      user,
      token: sessionToken,
      message: 'Email verified successfully.',
    });
  } catch (error) {
    console.error('[VERCEL API verify-otp ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error verifying code.' });
  }
}
