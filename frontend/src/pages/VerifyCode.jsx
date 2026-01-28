import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function VerifyCode({ onVerified }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const [timeLeftSec, setTimeLeftSec] = useState(180);

  const safeEmail = useMemo(() => {
    const stateEmail = location?.state?.email;
    return typeof stateEmail === 'string' && stateEmail.trim() ? stateEmail.trim() : '';
  }, [location]);

  const maskedEmail = useMemo(() => {
    const email = safeEmail || 'user@domain.com';
    const at = email.indexOf('@');
    if (at <= 0) return 'user******@domain.com';

    const local = email.slice(0, at);
    const domain = email.slice(at);
    const prefix = local.slice(0, 2);
    return `${prefix}******${domain}`;
  }, [safeEmail]);

  const focusAt = (idx) => {
    const el = inputsRef.current[idx];
    if (el) el.focus();
  };

  const setDigit = (idx, value) => {
    const next = [...code];
    next[idx] = value;
    setCode(next);
  };

  const handleChange = (idx, e) => {
    const raw = e.target.value ?? '';
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(idx, digit);
    if (digit && idx < 5) focusAt(idx + 1);
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace') {
      if (code[idx]) {
        setDigit(idx, '');
        return;
      }
      if (idx > 0) focusAt(idx - 1);
    }
    if (e.key === 'ArrowLeft' && idx > 0) focusAt(idx - 1);
    if (e.key === 'ArrowRight' && idx < 5) focusAt(idx + 1);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    if (!digits.length) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => digits[i] ?? '');
    setCode(next);
    const last = Math.min(digits.length, 6) - 1;
    if (last >= 0) focusAt(last);
  };

  useEffect(() => {
    if (timeLeftSec <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeftSec((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timeLeftSec]);

  const formattedTime = useMemo(() => {
    const mm = String(Math.floor(timeLeftSec / 60)).padStart(2, '0');
    const ss = String(timeLeftSec % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }, [timeLeftSec]);

  return (
    <div className="auth-shell">
      <section className="auth-left" aria-label="IsoTest AI overview">
        <div className="auth-left__bg" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
          <span className="orb orb--c" />
        </div>

        <div className="auth-left__content">
          <div className="brand" aria-label="IsoTest AI branding">
            <div className="brand__mark" aria-hidden="true">
              <span className="brand__dot brand__dot--1" />
              <span className="brand__dot brand__dot--2" />
              <span className="brand__dot brand__dot--3" />
            </div>
            <div className="brand__text">
              <div className="brand__name">IsoTest AI</div>
              <div className="brand__tagline">Isolated, intelligent API testing</div>
            </div>
          </div>

          <div className="auth-left__center">
            <h1 className="auth-left__title">
              Smart &amp; Isolated
              <br />
              API Testing.
            </h1>
            <p className="auth-left__subtitle">
              IsoTest AI helps teams validate APIs with AI-assisted workflows, isolated test
              execution, and clean reporting—so QA Engineers, Developers, and Test Managers can ship
              confidently.
            </p>

            <div className="auth-left__meta">
              <div className="pill">
                <span className="pill__dot" aria-hidden="true" />
                Enterprise-ready UI prototype (frontend only)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-right" aria-label="Two-factor verification">
        <div className="auth-card auth-card--verify" role="region" aria-labelledby="verify-title">
          <a
            className="back-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <span aria-hidden="true">←</span> Back to Login
          </a>

          <div className="verify-hero" aria-hidden="true">
            <div className="verify-hero__icon">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2 20 5v7c0 5.1-3.2 9.2-8 10-4.8-.8-8-4.9-8-10V5l8-3Zm0 2.2-6 2.2v5.6c0 4 2.4 7.2 6 8 3.6-.8 6-4 6-8V6.4l-6-2.2Zm-.9 5.5h1.8v3.1H11.1V9.7Zm0 4.6h1.8v1.8H11.1v-1.8Z"
                />
              </svg>
            </div>
          </div>

          <header className="auth-card__header auth-card__header--center">
            <h2 id="verify-title" className="auth-card__title">
              Two-Factor Authentication
            </h2>
            <p className="auth-card__subtitle">
              For your security, enter the 6-digit verification code we sent to your email to
              confirm secure access.
            </p>
            <div className="masked-email" aria-label="Masked email">
              {maskedEmail}
            </div>
          </header>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              onVerified?.();
            }}
          >
            <div className="verify-code" aria-label="Verification code" onPaste={handlePaste}>
              {code.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  className={`code-box${idx === 0 ? ' code-box--active' : ''}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(idx, e)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>

            <div className="timer" aria-label="Code expiry">
              Code expires in: <span className="timer__value">{formattedTime}</span>
            </div>

            <button type="submit" className="primary-btn">
              Verify Code
            </button>

            <div className="verify-footer">
              Didn&apos;t receive the code?{' '}
              <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                Resend
              </a>
            </div>
          </form>
        </div>

        <footer className="auth-bottom auth-bottom--alt">
          Designed by FYP Team – Bahria University 2025
        </footer>
      </section>
    </div>
  );
}

export default VerifyCode;

