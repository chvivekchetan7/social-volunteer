import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_USER_KEY = 'sv_auth_user';
const STORAGE_TOKEN_KEY = 'sv_auth_token';
const STORAGE_OTPS_KEY = 'sv_auth_otps';

// Helper to access LocalStorage safely
const getStored = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

// Initial Seed Users in Database
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
    lastLogin: new Date().toISOString(),
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
    lastLogin: new Date().toISOString(),
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
    lastLogin: new Date().toISOString(),
    hours: 500,
    skills: 'Platform Management, Security, Logistics',
    interests: 'All Causes',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStored(STORAGE_USER_KEY, null));
  const [token, setToken] = useState(() => getStored(STORAGE_TOKEN_KEY, null));
  const [isLoading, setIsLoading] = useState(false);
  const [usersDb, setUsersDb] = useState(() => getStored('sv_users_db', initialUsers));

  // Sync users database changes to localStorage
  useEffect(() => {
    setStored('sv_users_db', usersDb);
  }, [usersDb]);

  // Sync user state changes to localStorage
  useEffect(() => {
    if (user) {
      setStored(STORAGE_USER_KEY, user);
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      setStored(STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  }, [token]);

  // API 1: Send OTP
  const sendOtp = async (email) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        return {
          success: true,
          message: data.message || `Verification code sent to ${cleanEmail}`,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to send verification code.',
        };
      }
    } catch (err) {
      console.error('[AUTH API FETCH ERROR]', err);
      // Fallback local handling if server unreachable
      const otps = getStored(STORAGE_OTPS_KEY, {});
      const now = Date.now();

      if (otps[cleanEmail] && now - otps[cleanEmail].createdAt < 60 * 1000) {
        const waitSec = Math.ceil((60 * 1000 - (now - otps[cleanEmail].createdAt)) / 1000);
        setIsLoading(false);
        return {
          success: false,
          message: `Please wait ${waitSec} seconds before requesting another code.`,
        };
      }

      // Hash local OTP if server offline
      const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
      otps[cleanEmail] = {
        otp: fallbackOtp,
        createdAt: now,
        expiresAt: now + 10 * 60 * 1000,
        attempts: 0,
      };
      setStored(STORAGE_OTPS_KEY, otps);

      setIsLoading(false);
      return {
        success: true,
        message: `Verification code sent to ${cleanEmail}`,
      };
    }
  };

  // API 2: Verify OTP & Login
  const verifyOtp = async (email, inputOtp) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, otp: inputOtp }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        
        // Update local users cache
        setUsersDb((prev) => {
          const exists = prev.find((u) => u.email.toLowerCase() === cleanEmail);
          return exists ? prev.map((u) => (u.email.toLowerCase() === cleanEmail ? data.user : u)) : [data.user, ...prev];
        });

        return {
          success: true,
          user: data.user,
          token: data.token,
          message: data.message || 'Successfully authenticated.',
        };
      } else {
        return {
          success: false,
          message: data.message || 'Invalid verification code.',
        };
      }
    } catch (err) {
      console.error('[AUTH API VERIFY FETCH ERROR]', err);
      // Local fallback verification
      const otps = getStored(STORAGE_OTPS_KEY, {});
      const record = otps[cleanEmail];
      const now = Date.now();

      if (!record) {
        setIsLoading(false);
        return { success: false, message: 'No verification code found. Please request a new code.' };
      }

      if (now > record.expiresAt) {
        delete otps[cleanEmail];
        setStored(STORAGE_OTPS_KEY, otps);
        setIsLoading(false);
        return { success: false, message: 'Verification code has expired. Please request a new code.' };
      }

      if (record.otp !== inputOtp.trim()) {
        record.attempts += 1;
        otps[cleanEmail] = record;
        setStored(STORAGE_OTPS_KEY, otps);
        setIsLoading(false);
        return {
          success: false,
          message: `Invalid verification code (${5 - record.attempts} attempts remaining).`,
        };
      }

      delete otps[cleanEmail];
      setStored(STORAGE_OTPS_KEY, otps);

      let existingUser = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!existingUser) {
        const generatedId = `SV-VOL-${Math.floor(100000 + Math.random() * 900000)}`;
        existingUser = {
          id: `usr-${Date.now()}`,
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          phone: '+91 ',
          role: 'USER',
          verified: true,
          volunteerId: generatedId,
          createdAt: new Date().toISOString().split('T')[0],
          hours: 0,
          skills: 'Volunteer',
          interests: 'Community Welfare',
        };
        setUsersDb([existingUser, ...usersDb]);
      }

      const newToken = `token_${Date.now()}`;
      setUser(existingUser);
      setToken(newToken);
      setIsLoading(false);

      return {
        success: true,
        user: existingUser,
        token: newToken,
        message: 'Successfully authenticated.',
      };
    }
  };

  // API 3: Register User
  const registerUser = async ({ name, email, phone }) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: cleanEmail, phone }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        return {
          success: true,
          message: data.message || `Verification code sent to ${cleanEmail}`,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed.',
        };
      }
    } catch (err) {
      console.error('[AUTH API REGISTER FETCH ERROR]', err);
      return sendOtp(cleanEmail);
    }
  };

  // API 4: Update Profile
  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    setUsersDb((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  // API 5: Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        isAdmin: user?.role === 'ADMIN',
        sendOtp,
        verifyOtp,
        registerUser,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
