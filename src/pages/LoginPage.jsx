import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const { sendOtp, verifyOtp, isLoading } = useAuth();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const digitRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Countdown timer effect for Resend Code button
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Focus first OTP box when entering OTP step
  useEffect(() => {
    if (step === 'otp' && digitRefs[0].current) {
      digitRefs[0].current.focus();
    }
  }, [step]);

  // Step 1: Send OTP
  const handleSendEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const res = await sendOtp(email);

    if (res.success) {
      setStep('otp');
      setResendTimer(60);
      setSuccessMsg(res.message);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Step 2: Handle Individual Digit Input
  const handleDigitChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, '');
    const newDigits = [...otpDigits];
    newDigits[index] = digit.slice(-1); // Only take last typed character
    setOtpDigits(newDigits);

    // Auto-advance focus to next input if digit entered
    if (digit && index < 5 && digitRefs[index + 1].current) {
      digitRefs[index + 1].current.focus();
    }
  };

  // Handle Backspace Key Navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && digitRefs[index - 1].current) {
      digitRefs[index - 1].current.focus();
    }
  };

  // Handle Full 6-Digit Paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    // Focus last filled digit box or next empty box
    const nextIdx = Math.min(pasted.length, 5);
    if (digitRefs[nextIdx].current) {
      digitRefs[nextIdx].current.focus();
    }
  };

  // Step 3: Verify OTP Code
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    const res = await verifyOtp(email, fullOtp);

    if (res.success) {
      setSuccessMsg('Successfully authenticated! Redirecting...');
      setTimeout(() => {
        if (res.user.role === 'ADMIN') {
          window.history.pushState({}, '', '/admin/dashboard');
        } else {
          window.history.pushState({}, '', '/profile');
        }
        window.dispatchEvent(new Event('popstate'));
      }, 400);
    } else {
      setErrorMsg(res.message);
    }
  };

  // Resend OTP Code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setErrorMsg('');
    const res = await sendOtp(email);
    if (res.success) {
      setResendTimer(60);
      setSuccessMsg('New verification code sent!');
      setOtpDigits(['', '', '', '', '', '']);
      if (digitRefs[0].current) digitRefs[0].current.focus();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 76px)',
        marginTop: '76px',
        backgroundColor: '#F9FAFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          padding: '3rem 2.25rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
          border: '1px solid #E5E7EB',
          position: 'relative',
        }}
      >
        {/* STEP 1: EMAIL ADDRESS ENTRY */}

        {/* STEP 1: EMAIL ADDRESS ENTRY */}
        {step === 'email' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(232, 90, 42, 0.1)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 4px 12px rgba(232, 90, 42, 0.12)',
                }}
              >
                <Mail size={26} />
              </div>

              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                Login to your account
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
                Enter your email to receive a verification code
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #FCA5A5',
                }}
              >
                <AlertCircle size={17} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSendEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.45rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.95rem',
                    color: '#111827',
                    fontWeight: 600,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-orange"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '0.98rem',
                  borderRadius: '24px',
                  marginTop: '0.4rem',
                  boxShadow: '0 4px 14px rgba(232, 90, 42, 0.3)',
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{isLoading ? 'Sending Code...' : 'Send Verification Code'}</span>
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.88rem', color: '#6B7280', fontWeight: 600 }}>
              Don't have an account?{' '}
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('/signup');
                  else {
                    window.history.pushState({}, '', '/signup');
                    window.dispatchEvent(new Event('popstate'));
                  }
                }}
                style={{ color: 'var(--brand-orange)', fontWeight: 750, textDecoration: 'none' }}
              >
                Sign up
              </a>
            </div>
          </div>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === 'otp' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(232, 90, 42, 0.1)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 4px 12px rgba(232, 90, 42, 0.12)',
                }}
              >
                <ShieldCheck size={26} />
              </div>

              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                Verify your email
              </h1>
              <p style={{ fontSize: '0.88rem', color: '#6B7280', marginTop: '0.4rem', fontWeight: 600 }}>
                We sent a verification code to:
              </p>
              <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.92rem', marginTop: '0.15rem' }}>
                {email}
              </div>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #FCA5A5',
                }}
              >
                <AlertCircle size={17} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && !errorMsg && (
              <div
                style={{
                  backgroundColor: '#FFF2EC',
                  color: 'var(--brand-orange)',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #FF8054',
                }}
              >
                <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 6-DIGIT OTP BOX GRID */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={digitRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    style={{
                      width: '46px',
                      height: '54px',
                      borderRadius: '12px',
                      border: digit ? '2px solid var(--brand-orange)' : '1px solid #D1D5DB',
                      backgroundColor: digit ? '#FFF9F5' : '#FFFFFF',
                      textAlign: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#111827',
                      outline: 'none',
                      transition: 'all 0.15s ease',
                      boxShadow: digit ? '0 2px 8px rgba(232, 90, 42, 0.2)' : 'none',
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-orange"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '0.98rem',
                  borderRadius: '24px',
                  boxShadow: '0 4px 14px rgba(232, 90, 42, 0.3)',
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{isLoading ? 'Verifying Code...' : 'Verify Code'}</span>
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ color: '#6B7280', fontWeight: 600 }}>
                Didn't receive it?{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0 || isLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: resendTimer > 0 ? '#9CA3AF' : 'var(--brand-orange)',
                    fontWeight: 750,
                    cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                    textDecoration: resendTimer > 0 ? 'none' : 'underline',
                  }}
                >
                  {resendTimer > 0 ? `Resend Code (${resendTimer}s)` : 'Resend Code'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  fontSize: '0.82rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  marginTop: '0.25rem',
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to email</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
