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

function FieldRow({ label, value, isToggle }) {
  return (
    <div className="env-field">
      <div className="env-label">{label}</div>
      {isToggle ? (
        <div className="env-toggle env-toggle--on">
          <span className="env-toggle__knob" />
        </div>
      ) : (
        <div className="env-input">{value}</div>
      )}
    </div>
  );
}

export default function EnvironmentSetup() {
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
            active
            label="API Test Creation"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M6 3h9l3 3v15H6V3Zm2 2v14h8V7H13V5H8Zm2 5h4v2h-4v-2Zm0 4h6v2h-6v-2Z"
                />
              </Icon>
            }
          />
          <SidebarItem
            label="Projects"
            icon={
              <Icon>
                <path fill="currentColor" d="M4 6h16v12H4V6Zm2 2v8h12V8H6Z" />
              </Icon>
            }
            onClick={() => navigate('/projects')}
          />
          <SidebarItem
            label="Test Runs"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M10 8 16 12 10 16V8ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
                />
              </Icon>
            }
            onClick={() => navigate('/test-runs/execute')}
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

        <div className="env-content">
          <div className="proj-breadcrumb">
            <span>Dashboard</span>
            <span className="proj-breadcrumb__sep">›</span>
            <span>API Test Creation</span>
            <span className="proj-breadcrumb__sep">›</span>
            <span>Environment Setup</span>
          </div>

          <div className="proj-header">
            <h1 className="proj-h1">Isolated Test Environment Setup</h1>
            <p className="proj-h2">
              Select environment preferences to ensure tests run on a clean and independent database
              container.
            </p>
          </div>

          <div className="env-grid">
            <div className="env-main">
              <div className="dash-card env-summary">
                <div className="env-summary__icon">✔</div>
                <div>
                  <div className="dash-cardTitle">Test Selection Summary</div>
                  <div className="proj-h2">3 test cases selected for execution</div>
                </div>
                <button
                  type="button"
                  className="dash-btn ai-btn--outlineSmall env-summary__btn"
                  onClick={() => navigate('/api-test-creation/ai-test-case-generation')}
                >
                  Change Selection
                </button>
              </div>

              <div className="dash-card env-card">
                <div className="dash-cardHead">
                  <div className="dash-cardTitle">Environment Configuration</div>
                </div>

                <FieldRow label="Environment Type" value="Docker Container (Recommended)" />
                <FieldRow label="Database Image" value="postgres:latest" />
                <FieldRow label="Reset Policy" value="Reset after each test" />
                <FieldRow label="API Base URL" value="http://localhost:5000/api" />
                <FieldRow label="Run Tests in Isolation Mode" isToggle />
                <FieldRow label="Enable real-time log collection" isToggle />

                <div className="env-advanced">
                  <div className="env-advanced__head">
                    <span>Advanced Setup (Optional)</span>
                  </div>
                  <div className="env-advanced__body">
                    <div className="env-field">
                      <div className="env-label">Port Mapping</div>
                      <div className="env-input">5432:5432</div>
                    </div>
                    <div className="env-field env-field--vars">
                      <div className="env-label">Environment Variables</div>
                      <div className="env-input env-input--grid">
                        <div className="env-tagRow">
                          <span className="env-tagKey">DB_NAME</span>
                          <span className="env-tagValue">test_db</span>
                        </div>
                        <div className="env-tagRow">
                          <span className="env-tagKey">DB_USER</span>
                          <span className="env-tagValue">admin</span>
                        </div>
                      </div>
                    </div>
                    <FieldRow label="Timeout Limit (seconds)" value="300" />
                    <FieldRow label="Enable Parallel Execution" isToggle={false} value="Disabled" />
                  </div>
                </div>
              </div>

              <div className="env-footer">
                <button type="button" className="env-linkBtn">
                  Save configuration preset
                </button>
                <div className="env-footer__actions">
                  <button
                    type="button"
                    className="dash-btn ai-btn--outlineSmall"
                    onClick={() => navigate('/api-test-creation/ai-test-case-generation')}
                  >
                    Back to Test Selection
                  </button>
                  <button
                    type="button"
                    className="dash-btn dash-btn--grad ai-btn--footer"
                    onClick={() => navigate('/test-runs/execute')}
                  >
                    Execute Tests
                  </button>
                </div>
              </div>
            </div>

            <div className="dash-card env-side">
              <div className="dash-cardTitle">AI Recommendations</div>
              <div className="ai-insight ai-insight--info">
                Based on selected test cases, we recommend using a fresh Docker container per run.
              </div>
              <div className="ai-insight ai-insight--warn">
                Parallel execution may reduce performance due to concurrent database writes.
              </div>
              <div className="ai-insight ai-insight--info">
                Average execution time for similar test suites: 45 seconds.
              </div>
              <div className="ai-insight ai-insight--success">
                Isolation mode ensures no data pollution between test runs.
              </div>

              <div className="ai-coverage env-summaryBox">
                <div className="ai-coverage__title">Configuration Summary</div>
                <div className="ai-coverage__row">
                  <span>Environment</span>
                  <span>Docker Container</span>
                </div>
                <div className="ai-coverage__row">
                  <span>Database</span>
                  <span>postgres:latest</span>
                </div>
                <div className="ai-coverage__row">
                  <span>Reset Policy</span>
                  <span>Per Test</span>
                </div>
                <div className="ai-coverage__row">
                  <span>Isolation</span>
                  <span>✓ Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

