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

function ProjectCard({ title, date, endpoints, features, status, planners }) {
  return (
    <div className="proj-card">
      <div className="proj-card__top">
        <div className="proj-card__left">
          <div className="proj-icon" aria-hidden="true">
            <Icon>
              <path
                fill="currentColor"
                d="M5 5h14v12H5V5Zm2 2v8h10V7H7Zm1 9h8v1H8v-1Z"
              />
            </Icon>
          </div>
          <div>
            <div className="proj-title">{title}</div>
            <div className="proj-date">
              <Icon>
                <path
                  fill="currentColor"
                  d="M7 4h2V3h2v1h2V3h2v1h1a2 2 0 0 1 2 2v11H4V6a2 2 0 0 1 2-2h1Zm11 5H6v7h12V9Z"
                />
              </Icon>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <span className={`proj-status proj-status--${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="proj-meta">
        <div className="proj-row">
          <Icon>
            <path
              fill="currentColor"
              d="M6 4h12v2H6V4Zm0 4h12v2H6V8Zm0 4h7v2H6v-2Zm0 4h7v2H6v-2Z"
            />
          </Icon>
          <span>{endpoints}</span>
        </div>
        <div className="proj-row">
          <Icon>
            <path
              fill="currentColor"
              d="M5 5h14v10H5V5Zm2 2v6h10V7H7Zm0 9h10v2H7v-2Z"
            />
          </Icon>
          <span>{features}</span>
        </div>
        <div className="proj-row proj-row--assign">
          <Icon>
            <path
              fill="currentColor"
              d="M9 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM9 13c2.7 0 5 1.4 5 3.2V18H4v-1.8C4 14.4 6.3 13 9 13Zm6 0c.5 0 1 .1 1.5.2A4 4 0 0 1 20 17v1h-4v-1.8c0-.8-.3-1.6-.8-2.2.5-.1 1-.2 1.8-.2Z"
            />
          </Icon>
          <span className="proj-row__label">Assigned To:</span>
          <div className="proj-pills">
            {planners.map((p) => (
              <span key={p.label} className={`proj-pill proj-pill--${p.tone}`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="proj-footer">View Only Access</div>
    </div>
  );
}

export default function Projects() {
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
            onClick={() => navigate('/api-test-creation/ai-test-case-generation')}
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

        <div className="proj-content">
          <div className="proj-breadcrumb">
            <span>Dashboard</span>
            <span className="proj-breadcrumb__sep">›</span>
            <span>Projects</span>
          </div>

          <div className="proj-header">
            <h1 className="proj-h1">Project Dashboard</h1>
            <p className="proj-h2">
              View and manage API testing projects based on your assigned role.
            </p>
            <div className="proj-rolePill">QA Planner</div>
          </div>

          <div className="proj-sectionTitle">Your Projects</div>

          <div className="proj-list">
            <ProjectCard
              title="E-Commerce API Suite"
              date="Nov 27, 2025"
              endpoints="45 API Endpoints"
              features="Features: Payment Gateway, User Auth, Product Catalog"
              status="Active"
              planners={[
                { label: 'Abdur Rahman (QA Planner)', tone: 'blue' },
                { label: 'Ahmad Mustabssir (Developer)', tone: 'green' },
              ]}
            />
            <ProjectCard
              title="Banking Core Services"
              date="Nov 19, 2025"
              endpoints="78 API Endpoints"
              features="Features: Transaction API, Account Management, Audit Logs"
              status="Active"
              planners={[
                { label: 'Abdur Rahman (QA Planner)', tone: 'blue' },
                { label: 'Ahmad Mustabssir (Developer)', tone: 'green' },
              ]}
            />
            <ProjectCard
              title="Healthcare Management System"
              date="Nov 14, 2025"
              endpoints="32 API Endpoints"
              features="Features: Patient Records, Appointments, Billing"
              status="Pending"
              planners={[{ label: 'Abdur Rahman (QA Planner)', tone: 'blue' }]}
            />
          </div>

          <div className="dash-footer proj-footer">
            Designed by FYP Team – Bahria University 2025
          </div>
        </div>
      </main>
    </div>
  );
}

