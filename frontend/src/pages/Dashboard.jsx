import React from 'react';
import '../App.css';

function Icon({ children }) {
  return (
    <svg className="dash-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      {children}
    </svg>
  );
}

function SidebarItem({ active, label, icon, compact }) {
  return (
    <button type="button" className={`dash-navItem${active ? ' is-active' : ''}`}>
      <span className="dash-navItem__ico" aria-hidden="true">
        {icon}
      </span>
      <span className="dash-navItem__label">{label}</span>
      {compact ? null : <span className="dash-navItem__spacer" />}
    </button>
  );
}

function Kpi({ tone, value, label, badge }) {
  return (
    <div className="dash-kpi" role="button" tabIndex={0}>
      <div className="dash-kpi__top">
        <div className={`dash-kpi__icon dash-kpi__icon--${tone}`} aria-hidden="true" />
        <div className={`dash-kpi__badge dash-kpi__badge--${badge.tone}`}>{badge.text}</div>
      </div>
      <div className="dash-kpi__value">{value}</div>
      <div className="dash-kpi__label">{label}</div>
    </div>
  );
}

function ActivityRow({ method, path, time, status, inProgress }) {
  return (
    <div className={`dash-actRow${inProgress ? ' is-progress' : ''}`}>
      <div className={`dash-actStatus dash-actStatus--${status}`} aria-hidden="true">
        {status === 'success' ? (
          <Icon>
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.1 13.2-3-3a1 1 0 1 1 1.4-1.4l1.9 1.9 4.6-4.6a1 1 0 0 1 1.4 1.4l-6.3 6.3Z"
            />
          </Icon>
        ) : status === 'fail' ? (
          <Icon>
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.5 13.4a1 1 0 0 1-1.4 0L12 13.3l-2.1 2.1a1 1 0 0 1-1.4-1.4l2.1-2.1-2.1-2.1a1 1 0 1 1 1.4-1.4l2.1 2.1 2.1-2.1a1 1 0 1 1 1.4 1.4L13.4 12l2.1 2.1a1 1 0 0 1 0 1.4Z"
            />
          </Icon>
        ) : (
          <span className="dash-spinner" aria-hidden="true" />
        )}
      </div>

      <div className="dash-actMain">
        <div className="dash-actLine">
          <span className="dash-method">{method}</span>
          <span className="dash-path">{path}</span>
          {inProgress ? <span className="dash-cursor" aria-hidden="true" /> : null}
        </div>
        <div className="dash-time">{time}</div>
      </div>

      <div className="dash-ext" aria-hidden="true">
        <Icon>
          <path
            fill="currentColor"
            d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
          />
        </Icon>
      </div>
    </div>
  );
}

export default function Dashboard() {
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
            active
            label="Dashboard"
            icon={
              <Icon>
                <path
                  fill="currentColor"
                  d="M4 4h7v7H4V4Zm9 0h7v5h-7V4ZM4 13h7v7H4v-7Zm9-2h7v9h-7v-9Z"
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

        <div className="dash-content">
          <div className="dash-heading">
            <div className="dash-h1">Dashboard</div>
            <div className="dash-h2">Welcome to IsoTest AI</div>
          </div>

          <div className="dash-kpis">
            <Kpi
              tone="blue"
              value="247"
              label="Total APIs Tested"
              badge={{ tone: 'good', text: '+12%' }}
            />
            <Kpi
              tone="teal"
              value="1,842"
              label="AI-Generated Test Cases"
              badge={{ tone: 'good', text: '+28%' }}
            />
            <Kpi
              tone="green"
              value="60%"
              label="Test Cases Passed"
              badge={{ tone: 'neutral', text: 'Passed' }}
            />
            <Kpi
              tone="red"
              value="34"
              label="Detected Bugs"
              badge={{ tone: 'danger', text: '5 Critical' }}
            />
          </div>

          <div className="dash-grid2">
            <div className="dash-card">
              <div className="dash-cardHead">
                <div>
                  <div className="dash-cardTitle">Start Testing</div>
                  <div className="dash-cardSub">Create New API Test</div>
                </div>
              </div>

              <div className="dash-actions2">
                <button type="button" className="dash-btn dash-btn--outline">
                  <span className="dash-btnIco" aria-hidden="true">
                    <Icon>
                      <path
                        fill="currentColor"
                        d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1ZM5 18h14v2H5v-2Z"
                      />
                    </Icon>
                  </span>
                  Upload Swagger/OpenAPI JSON
                </button>

                <button type="button" className="dash-btn dash-btn--grad">
                  <span className="dash-btnIco" aria-hidden="true">
                    <Icon>
                      <path
                        fill="currentColor"
                        d="M4 6h16v10H4V6Zm2 2v6h12V8H6Zm2 9h8v2H8v-2Z"
                      />
                    </Icon>
                  </span>
                  Use Natural Language Query
                </button>
              </div>

              <div className="dash-help">
                Generate test cases automatically using AI or upload your API specification.
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-cardHead dash-cardHead--row">
                <div className="dash-cardTitle">Recent Activity</div>
                <a className="dash-viewAll" href="#" onClick={(e) => e.preventDefault()}>
                  View All
                </a>
              </div>

              <div className="dash-activity">
                <ActivityRow
                  status="success"
                  method="POST"
                  path="/api/auth/login"
                  time="2 minutes ago"
                />
                <ActivityRow
                  status="progress"
                  method="GET"
                  path="/api/users/{id}"
                  time="5 minutes ago"
                  inProgress
                />
                <ActivityRow
                  status="fail"
                  method="PUT"
                  path="/api/products/update"
                  time="12 minutes ago"
                />
                <ActivityRow
                  status="success"
                  method="DELETE"
                  path="/api/orders/{id}"
                  time="23 minutes ago"
                />
              </div>
            </div>
          </div>

          <div className="dash-footer">
            Designed by FYP Team – Bahria University 2025
          </div>
        </div>
      </main>
    </div>
  );
}

