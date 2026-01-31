import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import VerifyCode from './pages/VerifyCode';
import WalkthroughModal from './components/WalkthroughModal';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('QA Engineer');
  const [rememberMe, setRememberMe] = useState(true);

  const [hasCompletedWalkthrough, setHasCompletedWalkthrough] = useState(() => {
    try {
      return window.localStorage.getItem('isotest.walkthrough.completed') === 'true';
    } catch {
      return false;
    }
  });

  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const raw = window.localStorage.getItem('isotest.walkthrough.step');
      const n = Number(raw);
      return Number.isFinite(n) && n >= 1 && n <= 7 ? n : 1;
    } catch {
      return 1;
    }
  });

  const [showWalkthrough, setShowWalkthrough] = useState(false);

  const persistStep = (n) => {
    setCurrentStep(n);
    try {
      window.localStorage.setItem('isotest.walkthrough.step', String(n));
    } catch {
      // ignore
    }
  };

  const completeWalkthrough = () => {
    setHasCompletedWalkthrough(true);
    try {
      window.localStorage.setItem('isotest.walkthrough.completed', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
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
                    execution, and clean reporting—so QA Engineers, Developers, and Test Managers can
                    ship confidently.
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

            <section className="auth-right" aria-label="Login">
              <div className="auth-card" role="region" aria-labelledby="login-title">
                <header className="auth-card__header">
                  <h2 id="login-title" className="auth-card__title">
                    Welcome to IsoTest AI
                  </h2>
                  <p className="auth-card__subtitle">
                    Sign in with role-based access for <strong>QA Engineers</strong>,{' '}
                    <strong>Developers</strong>, and <strong>Test Managers</strong>.
                  </p>
                </header>

                <form
                  className="auth-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate('/verify', { state: { email } });
                  }}
                >
                  <div className="field">
                    <label className="field__label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field__control"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="password">
                      Password
                    </label>
                    <div className="field__controlWrap">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="field__control field__control--withIcon"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="Toggle password visibility (visual only)"
                        title="Visual only"
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M12 5c5.5 0 9.8 4.2 11 7-1.2 2.8-5.5 7-11 7S2.2 14.8 1 12c1.2-2.8 5.5-7 11-7Zm0 2C7.8 7 4.2 10 3.1 12 4.2 14 7.8 17 12 17s7.8-3 8.9-5C19.8 10 16.2 7 12 7Zm0 2.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="field__control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>QA Engineer</option>
                      <option>Developer</option>
                      <option>Test Manager</option>
                    </select>
                  </div>

                  <div className="auth-form__row">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="checkbox__box" aria-hidden="true" />
                      <span className="checkbox__text">Remember me</span>
                    </label>

                    <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                      Forgot Password?
                    </a>
                  </div>

                  <button type="submit" className="primary-btn">
                    Login
                  </button>

                  <p className="auth-card__footer">
                    Don&apos;t have an account?{' '}
                    <span className="muted">Contact project administrator.</span>
                  </p>
                </form>
              </div>

              <footer className="auth-bottom">
                Designed &amp; Developed by FYP Team | Bahria University 2025
              </footer>
            </section>
          </div>
          }
        />
        <Route
          path="/verify"
          element={
            <VerifyCode
              onVerified={() => {
                if (!hasCompletedWalkthrough) setShowWalkthrough(true);
              }}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
        <Route
          path="/docs"
          element={
            <div style={{ padding: 32, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Documentation</h2>
              <p style={{ marginTop: 10, color: 'rgba(15,23,42,0.68)' }}>
                Placeholder documentation screen for walkthrough routing.
              </p>
            </div>
          }
        />
      </Routes>

      {showWalkthrough && !hasCompletedWalkthrough ? (
        <WalkthroughModal
          currentStep={currentStep}
          onClose={() => setShowWalkthrough(false)}
          onSkip={() => {
            completeWalkthrough();
            setShowWalkthrough(false);
            navigate('/dashboard');
          }}
          onPrev={() => persistStep(Math.max(1, currentStep - 1))}
          onNext={() => persistStep(Math.min(7, currentStep + 1))}
          onGetStarted={() => {
            completeWalkthrough();
            setShowWalkthrough(false);
            navigate('/dashboard');
          }}
          onViewDocs={() => {
            setShowWalkthrough(false);
            navigate('/docs');
          }}
        />
      ) : null}
    </>
  );
}

export default App;
