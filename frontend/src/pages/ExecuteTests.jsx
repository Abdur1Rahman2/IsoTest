import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Icon({ children }) {
  return (
    <svg className="dash-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      {children}
    </svg>
  );
}

function SidebarItem({ active, label, icon, onClick }) {
  return (
    <button
      type="button"
      className={`dash-navItem${active ? ' is-active' : ''}`}
      onClick={onClick}
    >
      <span className="dash-navItem__ico" aria-hidden="true">
        {icon}
      </span>
      <span className="dash-navItem__label">{label}</span>
    </button>
  );
}

function StatusPill({ tone, children }) {
  return <span className={`exec-pill exec-pill--${tone}`}>{children}</span>;
}

function TestStatusRow({ name, duration, status }) {
  return (
    <div className="exec-testRow">
      <div className="exec-testInfo">
        <div className="exec-testName">{name}</div>
        <div className="exec-testTime">{duration}</div>
      </div>
      <div className="exec-testBadge">
        {status === 'passed' && <StatusPill tone="success">Passed</StatusPill>}
        {status === 'failed' && <StatusPill tone="danger">Failed</StatusPill>}
        {status === 'running' && <StatusPill tone="info">Running</StatusPill>}
        {status === 'pending' && <StatusPill tone="muted">Pending</StatusPill>}
      </div>
    </div>
  );
}

export default function ExecuteTests() {
  const navigate = useNavigate();

  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <div className="dash-brand__ico" aria-hidden="true">
            <Icon>
              <path
                fill="currentColor"
                d="M12 2 4.5 5.5V12c0 5.2 3.1 9.2 7.5 10 4.4-.8 7.5-4.8 7.5-10V5.5L12 2Zm0 2.2 5.6 2.1V12c0 4.1-2.2 7.4-5.6 8.1-3.4-.7-5.6-4-5.6-8.1V6.3L12 4.2Zm0 3.3a1 1 0 0 1 1 1v3.2h2a1 1 0 0 1 0 2h-3a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"
              />
            </Icon>
          </div>
          <div>
            <div className="dash-brand__name">IsoTest AI</div>
            <div className="dash-brand__sub">API Tester</div>
          </div>
        </div>

        <div className="dash-nav">
          <SidebarItem
            label="Dashboard"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M4 4h7v7H4V4Zm9 0h7v5h-7V4ZM4 13h7v7H4v-7Zm9-2h7v9h-7v-9Z"
                />
              </Icon>
            }
            onClick={() => navigate('/dashboard')}
          />
          <SidebarItem
            label="API Test Creation"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M6 3h9l3 3v15H6V3Zm2 2v14h8V7H13V5H8Zm2 5h4v2h-4v-2Zm0 4h6v2h-6v-2Z"
                />
              </Icon>
            }
            onClick={() => navigate('/api-test-creation/ai-test-case-generation')}
          />
          <SidebarItem
            active
            label="Test Runs"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M10 8 16 12 10 16V8ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
                />
              </Icon>
            }
          />
        </div>

        <div className="dash-divider" />

        <div className="dash-nav dash-nav--bottom">
          <SidebarItem
            label="Documentation"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M6 4h12v16H6V4Zm2 2v12h8V6H8Zm1 2h6v2H9V8Zm0 4h6v2H9v-2Z"
                />
              </Icon>
            }
          />
          <SidebarItem
            label="Log Out"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M10 7V5h10v14H10v-2h8V7h-8Zm-1 4h5v2H9v3l-6-4 6-4v3Z"
                />
              </Icon>
            }
          />
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-search">
            <svg className="dash-search__ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10 4a6 6 0 1 0 3.7 10.7l4 4a1 1 0 0 0 1.4-1.4l-4-4A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
              />
            </svg>
            <input className="dash-search__input" placeholder="Search APIs, tests..." />
          </div>

          <div className="dash-topRight">
            <button type="button" className="dash-bell" aria-label="Notifications">
              <Icon>
                <path
                  fill="currentColor"
                  d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5-6.7V3a2 2 0 1 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"
                />
              </Icon>
              <span className="dash-bellDot" aria-hidden="true" />
            </button>

            <div className="dash-user">
              <div className="dash-user__meta">
                <div className="dash-user__name">John Doe</div>
                <div className="dash-user__role">QA Engineer</div>
              </div>
              <div className="dash-avatar" aria-label="User avatar">
                JD
              </div>
            </div>
          </div>
        </div>

        <div className="exec-content">
          <div className="proj-header">
            <h1 className="proj-h1">Execute Tests</h1>
            <p className="proj-h2">Tests are running in isolated environment.</p>
          </div>

          <div className="dash-card exec-progressCard">
            <div className="exec-progressHead">
              <span>Execution Progress</span>
              <span className="exec-progressLabel">88% Complete</span>
            </div>
            <div className="exec-bar">
              <div className="exec-bar__fill" />
            </div>
            <div className="exec-summary">
              <div className="exec-summaryItem">
                <div className="exec-summaryLabel">Passed</div>
                <div className="exec-summaryValue exec-summaryValue--success">2</div>
              </div>
              <div className="exec-summaryItem">
                <div className="exec-summaryLabel">Failed</div>
                <div className="exec-summaryValue exec-summaryValue--danger">1</div>
              </div>
              <div className="exec-summaryItem">
                <div className="exec-summaryLabel">Running</div>
                <div className="exec-summaryValue exec-summaryValue--info">3</div>
              </div>
            </div>
          </div>

          <div className="exec-grid">
            <div className="dash-card exec-left">
              <div className="dash-cardTitle">Test Cases</div>
              <div className="proj-h2">Real-time execution status</div>

              <div className="exec-testList">
                <TestStatusRow name="Valid login credentials" duration="1.2s" status="passed" />
                <TestStatusRow name="Invalid email format" duration="0.8s" status="passed" />
                <TestStatusRow name="Missing password field" duration="1.5s" status="failed" />
                <TestStatusRow name="SQL injection attempt" duration="1.4s" status="running" />
                <TestStatusRow name="Empty request body" duration="1.1s" status="running" />
                <TestStatusRow name="Maximum length password" duration="0.9s" status="pending" />
              </div>

              <div className="dash-card exec-interpret">
                <div className="dash-cardTitle">AI Interpretation</div>
                <div className="proj-h2">Analyzing test results…</div>

                <div className="exec-interpretRow exec-interpretRow--error">
                  <div className="exec-interpretTitle">Failed Test: Missing password field</div>
                  <div className="exec-interpretBlock exec-interpretBlock--expected">
                    <div className="exec-interpretLabel">Expected Behavior</div>
                    <p>Status Code: 400 Bad Request</p>
                    <p>Error: "Password is required"</p>
                  </div>
                  <div className="exec-interpretBlock exec-interpretBlock--actual">
                    <div className="exec-interpretLabel">Actual Behavior</div>
                    <p>Status Code: 500 Internal Server Error</p>
                    <p>Error: "Cannot read property 'length' of undefined"</p>
                  </div>
                  <div className="exec-interpretBlock exec-interpretBlock--warn">
                    Probable Cause: Missing null check before accessing password field.
                  </div>
                </div>

                <div className="exec-interpretRow exec-interpretRow--code">
                  <div className="exec-interpretLabel">Code Fix Suggestion</div>
                  <pre className="exec-code">
{`if (!req.body?.password) {
  return res.status(400).json({ error: 'Password is required' });
}`}
                  </pre>
                </div>

                <div className="exec-interpretRow exec-interpretRow--note">
                  <div className="exec-interpretLabel">Security Note</div>
                  <p>
                    Error messages should not expose internal implementation details. Consider using
                    generic error messages in production.
                  </p>
                </div>
              </div>
            </div>

            <div className="dash-card exec-console">
              <div className="dash-cardTitle">Live Console</div>
              <div className="exec-terminal">
                <div className="exec-line exec-line--success">
                  [SUCCESS] Docker container started: postgres:latest
                </div>
                <div className="exec-line exec-line--info">
                  [INFO] Running test: Valid login credentials...
                </div>
                <div className="exec-line exec-line--success">
                  [SUCCESS] Test completed in 1.2s
                </div>
                <div className="exec-line exec-line--info">
                  [INFO] Running test: Invalid email format...
                </div>
                <div className="exec-line exec-line--success">
                  [SUCCESS] Test completed in 0.8s
                </div>
                <div className="exec-line exec-line--info">
                  [INFO] Running test: Missing password field...
                </div>
                <div className="exec-line exec-line--error">
                  [ERROR] Expected 400, received 500
                </div>
                <div className="exec-line exec-line--info">
                  [INFO] Database transaction rolled back
                </div>
                <div className="exec-line exec-line--info">
                  [INFO] Validating security headers...
                </div>
                <div className="exec-line exec-line--info exec-line--stream">
                  [INFO] Running edge case scenarios...
                </div>
              </div>
            </div>
          </div>

          <div className="exec-footer">
            <button type="button" className="env-linkBtn">
              Download Logs
            </button>
            <div className="env-footer__actions">
              <button type="button" className="dash-btn ai-btn--outlineSmall">
                Stop Execution
              </button>
              <button type="button" className="dash-btn dash-btn--grad ai-btn--footer">
                Proceed to Bug Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

