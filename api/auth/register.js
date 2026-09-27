import { otpsStore, usersDb, generateSecureOtp, hashOtp, sendTransactionalEmail } from './_store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone } = req.body || {};
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

    return res.status(200).json({
      success: true,
      message: `Account created. Verification code sent to ${cleanEmail}`,
    });
  } catch (error) {
    console.error('[VERCEL API register ERROR]', error);
    return res.status(500).json({ success: false, message: 'Internal server error creating account.' });
  }
}
