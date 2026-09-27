import { otpsStore, usersDb, generateSecureOtp, hashOtp, sendTransactionalEmail } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body || {};
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const now = Date.now();

    const existingRecord = otpsStore.get(cleanEmail);
    if (existingRecord && now - existingRecord.createdAt < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (now - existingRecord.createdAt)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSec} seconds before requesting another verification code.`,
      });
    }

    const otpCode = generateSecureOtp();
    const otpHash = hashOtp(otpCode);
    const expiresAt = now + 10 * 60 * 1000;

    otpsStore.set(cleanEmail, {
      otpHash,
      createdAt: now,
      expiresAt,
      attempts: 0,
    });

    const existingUser = usersDb.get(cleanEmail);
    const recipientName = existingUser ? existingUser.name : cleanEmail.split('@')[0];

    await sendTransactionalEmail(cleanEmail, recipientName, otpCode);

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${cleanEmail}`,
    });
  } catch (error) {
    console.error('[VERCEL API send-otp ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error sending verification code.' });
  }
}
