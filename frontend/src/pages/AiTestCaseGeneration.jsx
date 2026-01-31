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

function TypeBadge({ tone, children }) {
  return <span className={`ai-type ai-type--${tone}`}>{children}</span>;
}

function ConfidenceBar({ value }) {
  return (
    <div className="ai-bar">
      <div className="ai-bar__fill" style={{ width: `${value}%` }} />
      <span className="ai-bar__label">{value}%</span>
    </div>
  );
}

function TestRow({ name, type, desc, confidence }) {
  return (
    <tr className="ai-row">
      <td className="ai-cell ai-cell--check">
        <input type="checkbox" />
      </td>
      <td className="ai-cell ai-cell--name">
        <span className="ai-spark" aria-hidden="true">
          ✨
        </span>
        {name}
      </td>
      <td className="ai-cell">
        <TypeBadge tone={type.toLowerCase()}>{type}</TypeBadge>
      </td>
      <td className="ai-cell ai-cell--desc">{desc}</td>
      <td className="ai-cell ai-cell--conf">
        <ConfidenceBar value={confidence} />
      </td>
      <td className="ai-cell ai-cell--actions">
        <button type="button" className="ai-iconBtn" aria-label="Edit">
          <Icon>
            <path
              fill="currentColor"
              d="M5 17.6V20h2.4l7.1-7.1-2.4-2.4L5 17.6ZM18.7 8.3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L13.6 7l2.4 2.4 2.7-2.7Z"
            />
          </Icon>
        </button>
        <button type="button" className="ai-iconBtn ai-iconBtn--danger" aria-label="Delete">
          <Icon>
            <path
              fill="currentColor"
              d="M9 4h6l1 2h3v2H5V6h3l1-2Zm0 5h2v7H9V9Zm4 0h2v7h-2V9Z"
            />
          </Icon>
        </button>
      </td>
    </tr>
  );
}

export default function AiTestCaseGeneration() {
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
          <SidebarItem
            label="AI Bug Reports"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M15 6h-6l-1-2h8l-1 2ZM7 9h10v10H7V9Zm2 2v6h6v-6H9Zm-5 1h2v4H4v-4Zm14 0h2v4h-2v-4Z"
                />
              </Icon>
            }
          />
          <SidebarItem
            label="Analytics & Trends"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M4 19V5h2v12h14v2H4Zm4-4 3-3 2 2 5-5 1 1-6 6-2-2-3 3-1-2Z"
                />
              </Icon>
            }
          />
          <SidebarItem
            label="CI/CD Integration"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M7 7a3 3 0 1 1 2.8 4H9v2.2l2 1.2 2-1.2V11h-.8A3 3 0 1 1 17 7a3 3 0 0 1-3 3h-1v1.9l-3 1.8-3-1.8V10H7Z"
                />
              </Icon>
            }
          />
          <SidebarItem
            label="Settings"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9 4-2.1.7a7.7 7.7 0 0 1-.6 1.4l1 1.9-1.6 1.6-1.9-1a7.7 7.7 0 0 1-1.4.6L12 21l-1-.1-1-.2-.7-2.1a7.7 7.7 0 0 1-1.4-.6l-1.9 1-1.6-1.6 1-1.9a7.7 7.7 0 0 1-.6-1.4L3 12l.1-1 .2-1 2.1-.7c.2-.5.4-1 .6-1.4l-1-1.9L6.6 4.4l1.9 1c.5-.2 1-.4 1.4-.6L12 3l1 .1 1 .2.7 2.1c.5.2 1 .4 1.4.6l1.9-1 1.6 1.6-1 1.9c.2.5.4 1 .6 1.4L21 11l-.1 1Z"
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

        <div className="ai-content">
          <div className="proj-breadcrumb">
            <span>Dashboard</span>
            <span className="proj-breadcrumb__sep">›</span>
            <span>API Test Creation</span>
            <span className="proj-breadcrumb__sep">›</span>
            <span>AI Test Case Generation</span>
          </div>

          <div className="proj-header">
            <h1 className="proj-h1">AI Test Case Generation</h1>
            <p className="proj-h2">
              Test scenarios automatically generated based on API schema and context.
            </p>
          </div>

          <div className="ai-endpointCard dash-card">
            <div className="ai-endpointMain">
              <div>
                <div className="ai-endpointLabel">API Endpoint</div>
                <div className="ai-endpointRow">
                  <span className="ai-method ai-method--post">POST</span>
                  <span className="ai-endpointPath">/api/auth/login</span>
                </div>
                <div className="ai-endpointLinks">
                  <button type="button" className="ai-linkBtn">
                    <Icon>
                      <path
                        fill="currentColor"
                        d="M5 5h14v2H5V5Zm0 4h10v2H5V9Zm0 4h7v2H5v-2Z"
                      />
                    </Icon>
                    View API Specification
                  </button>
                  <button type="button" className="ai-linkBtn">
                    <Icon>
                      <path
                        fill="currentColor"
                        d="M12 5 8 9h3v4h2V9h3l-4-4Zm-7 8h2v4h10v-4h2v6H5v-6Z"
                      />
                    </Icon>
                    Re-upload
                  </button>
                </div>
              </div>
            </div>

            <div className="ai-endpointMeta">
              <div className="ai-endpointLabel ai-endpointLabel--right">Schema Analyzed</div>
              <div className="ai-schemaStatus">✔ Valid OpenAPI 3.0</div>
            </div>
          </div>

          <div className="ai-grid">
            <div className="dash-card ai-tableCard">
              <div className="ai-tableHead">
                <div>
                  <div className="dash-cardTitle">AI-Generated Test Cases</div>
                </div>
                <div className="ai-headActions">
                  <button type="button" className="dash-btn dash-btn--grad ai-btn--small">
                    Generate More Cases
                  </button>
                  <button type="button" className="dash-btn ai-btn--outlineSmall">
                    + Add Custom Test Case
                  </button>
                </div>
              </div>

              <div className="ai-tableWrap">
                <table className="ai-table">
                  <thead>
                    <tr>
                      <th className="ai-cell ai-cell--check">
                        <input type="checkbox" />
                      </th>
                      <th className="ai-cell ai-cell--name">Test Case Name</th>
                      <th className="ai-cell">Type</th>
                      <th className="ai-cell ai-cell--desc">Description</th>
                      <th className="ai-cell ai-cell--conf">AI Confidence</th>
                      <th className="ai-cell ai-cell--actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TestRow
                      name="Valid login credentials"
                      type="Positive"
                      desc="Test successful login with valid email and password"
                      confidence={98}
                    />
                    <TestRow
                      name="Invalid email format"
                      type="Negative"
                      desc="Verify error handling for malformed email addresses"
                      confidence={95}
                    />
                    <TestRow
                      name="Missing password field"
                      type="Negative"
                      desc="Test API response when password is not provided"
                      confidence={92}
                    />
                    <TestRow
                      name="SQL injection attempt"
                      type="Edge"
                      desc="Security test for SQL injection in email field"
                      confidence={88}
                    />
                    <TestRow
                      name="Empty request body"
                      type="Negative"
                      desc="Test behavior with completely empty payload"
                      confidence={94}
                    />
                    <TestRow
                      name="Maximum length password"
                      type="Edge"
                      desc="Test with password at maximum allowed length"
                      confidence={85}
                    />
                  </tbody>
                </table>
              </div>

              <div className="ai-footerBar">
                <div className="ai-footerText">
                  6 test cases generated • 3 selected for execution
                </div>
                <button
                  type="button"
                  className="dash-btn dash-btn--grad ai-btn--footer"
                  onClick={() => navigate('/environment-setup')}
                >
                  Proceed to Test Environment Setup
                </button>
              </div>
            </div>

            <div className="dash-card ai-insights">
              <div className="dash-cardTitle">AI Insights</div>
              <div className="ai-insight ai-insight--warn">
                <span className="ai-insight__icon">⚠️</span>
                Three parameters missing validation in the schema.
              </div>
              <div className="ai-insight ai-insight--info">
                <span className="ai-insight__icon">💡</span>
                Recommended to test with empty body and invalid JWT token.
              </div>
              <div className="ai-insight ai-insight--success">
                <span className="ai-insight__icon">✅</span>
                All security test cases have been auto-generated.
              </div>
              <div className="ai-insight ai-insight--info">
                <span className="ai-insight__icon">📊</span>
                Similar endpoints have 95% pass rate in production.
              </div>

              <div className="ai-coverage">
                <div className="ai-coverage__title">Coverage Summary</div>
                <div className="ai-coverage__row">
                  <span>Positive Cases</span>
                  <span>2 tests</span>
                </div>
                <div className="ai-coverage__row">
                  <span>Negative Cases</span>
                  <span>3 tests</span>
                </div>
                <div className="ai-coverage__row">
                  <span>Edge Cases</span>
                  <span>2 tests</span>
                </div>
                <div className="ai-coverage__row ai-coverage__row--total">
                  <span>Total Coverage</span>
                  <span>87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

