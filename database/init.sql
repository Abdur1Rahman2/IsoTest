-- IsoTest AI Database Initialization Script
-- PostgreSQL 15+

-- Create database (run separately if needed)
-- CREATE DATABASE isotestai;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================
-- Core identity & settings
-- ==========================

-- Application users (Project Manager, Developer, QA Planner)
CREATE TABLE IF NOT EXISTS users (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email          VARCHAR(255) UNIQUE NOT NULL,
    password_hash  VARCHAR(255)       NOT NULL,
    display_name   VARCHAR(150)       NOT NULL,
    role           VARCHAR(50)        NOT NULL, -- 'Project Manager' | 'Developer' | 'QA Planner'
    created_at     TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Per-user UI / platform preferences (Settings screen)
CREATE TABLE IF NOT EXISTS user_settings (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dark_mode              BOOLEAN     NOT NULL DEFAULT FALSE,
    default_timeout_seconds INTEGER    NOT NULL DEFAULT 300,
    created_at             TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);

-- ==========================
-- Projects & team members
-- ==========================

-- High-level API testing projects (Project Dashboard)
CREATE TABLE IF NOT EXISTS projects (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name         VARCHAR(200) NOT NULL,
    description  TEXT,
    status       VARCHAR(50)  NOT NULL DEFAULT 'Active', -- Active | Pending | Completed
    api_count    INTEGER      NOT NULL DEFAULT 0,        -- for dashboard stats
    features     TEXT,                                   -- free-text summary like in UI
    created_by   UUID         REFERENCES users(id),
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Project membership and role (who is PM / Dev / QA on which project)
CREATE TABLE IF NOT EXISTS project_members (
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
    role_in_project VARCHAR(50) NOT NULL, -- 'Project Manager' | 'Developer' | 'QA Planner'
    PRIMARY KEY (project_id, user_id)
);

-- ==========================
-- API definitions & endpoints
-- ==========================

-- One logical API definition per project (for OpenAPI spec, base URL, etc.)
CREATE TABLE IF NOT EXISTS api_definitions (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id       UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name             VARCHAR(200) NOT NULL,
    base_url         TEXT,
    openapi_spec_url TEXT,
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (project_id, name)
);

-- Individual endpoints belonging to an API (used by AI Test Generation)
CREATE TABLE IF NOT EXISTS api_endpoints (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_id      UUID        NOT NULL REFERENCES api_definitions(id) ON DELETE CASCADE,
    path        VARCHAR(500) NOT NULL,
    method      VARCHAR(10)  NOT NULL,
    summary     TEXT,
    is_critical BOOLEAN      NOT NULL DEFAULT FALSE,
    UNIQUE (api_id, path, method)
);

-- ==========================
-- Test design (AI Test Generation)
-- ==========================

CREATE TABLE IF NOT EXISTS test_cases (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id       UUID        NOT NULL REFERENCES projects(id)       ON DELETE CASCADE,
    endpoint_id      UUID                 REFERENCES api_endpoints(id)  ON DELETE SET NULL,
    name             VARCHAR(300) NOT NULL,
    description      TEXT,
    endpoint_path    VARCHAR(500),
    method           VARCHAR(10),
    generated_by_ai  BOOLEAN      NOT NULL DEFAULT FALSE,
    test_data        JSONB,
    expected_status  INTEGER,
    created_by       UUID                 REFERENCES users(id),
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Environment configuration (Environment Setup)
-- ==========================

CREATE TABLE IF NOT EXISTS environment_configs (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id       UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name             VARCHAR(150) NOT NULL,               -- e.g. "Isolated Test Env"
    environment_type VARCHAR(50)  NOT NULL DEFAULT 'ephemeral', -- ephemeral / shared / staging
    database_engine  VARCHAR(50),                         -- Postgres, MySQL, etc.
    database_version VARCHAR(50),
    isolation_level  VARCHAR(50),                         -- full / schema / data snapshot
    container_image  TEXT,
    cpu_limit        VARCHAR(20),                         -- e.g. "2 vCPU"
    memory_limit     VARCHAR(20),                         -- e.g. "4 GiB"
    created_by       UUID         REFERENCES users(id),
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Test execution sessions & history (Execute Tests / Test Reports)
-- ==========================

-- A logical run/session that groups many test_case executions
CREATE TABLE IF NOT EXISTS test_sessions (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id             UUID        NOT NULL REFERENCES projects(id)            ON DELETE CASCADE,
    environment_config_id  UUID                 REFERENCES environment_configs(id) ON DELETE SET NULL,
    triggered_by           UUID                 REFERENCES users(id),
    source                 VARCHAR(50)  NOT NULL DEFAULT 'ui', -- ui | cicd | api
    status                 VARCHAR(50)  NOT NULL DEFAULT 'running', -- running | passed | failed | error | cancelled
    total_tests            INTEGER      NOT NULL DEFAULT 0,
    passed_tests           INTEGER      NOT NULL DEFAULT 0,
    failed_tests           INTEGER      NOT NULL DEFAULT 0,
    error_tests            INTEGER      NOT NULL DEFAULT 0,
    started_at             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at           TIMESTAMP,
    notes                  TEXT
);

-- Individual test executions within a session
CREATE TABLE IF NOT EXISTS test_executions (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id        UUID        NOT NULL REFERENCES test_sessions(id) ON DELETE CASCADE,
    test_case_id      UUID        NOT NULL REFERENCES test_cases(id)   ON DELETE CASCADE,
    status            VARCHAR(50) NOT NULL,  -- passed | failed | error | skipped
    execution_time_ms INTEGER,
    response_status   INTEGER,
    response_data     JSONB,
    error_message     TEXT,
    executed_at       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Bug reports (AI Bug Reports)
-- ==========================

CREATE TABLE IF NOT EXISTS bug_reports (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id          UUID        NOT NULL REFERENCES projects(id)       ON DELETE CASCADE,
    test_execution_id   UUID                 REFERENCES test_executions(id) ON DELETE SET NULL,
    severity            VARCHAR(50) NOT NULL DEFAULT 'Medium', -- Low | Medium | High | Critical
    status              VARCHAR(50) NOT NULL DEFAULT 'Open',   -- Open | In Progress | Resolved | Closed
    title               VARCHAR(300) NOT NULL,
    description         TEXT,
    steps_to_reproduce  TEXT,
    ai_generated_summary TEXT,
    created_by          UUID                 REFERENCES users(id),
    created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- CI/CD integration (CI/CD Integration screen)
-- ==========================

CREATE TABLE IF NOT EXISTS cicd_pipelines (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    provider        VARCHAR(50) NOT NULL,      -- GitHub, GitLab, Azure DevOps, etc.
    repository_url  TEXT        NOT NULL,
    branch          VARCHAR(100) NOT NULL DEFAULT 'main',
    webhook_url     TEXT,
    webhook_secret  TEXT,
    is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
    last_run_status VARCHAR(50),
    last_run_at     TIMESTAMP,
    created_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Indexes for performance
-- ==========================

CREATE INDEX IF NOT EXISTS idx_projects_created_by       ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_status           ON projects(status);
CREATE INDEX IF NOT EXISTS idx_test_cases_project        ON test_cases(project_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_endpoint       ON test_cases(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_project     ON test_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_status      ON test_sessions(status);
CREATE INDEX IF NOT EXISTS idx_test_executions_session   ON test_executions(session_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_case      ON test_executions(test_case_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_project       ON bug_reports(project_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_execution     ON bug_reports(test_execution_id);
CREATE INDEX IF NOT EXISTS idx_cicd_pipelines_project    ON cicd_pipelines(project_id);

-- ==========================
-- Seed minimal data (optional)
-- ==========================

INSERT INTO users (email, password_hash, display_name, role)
VALUES (
    'admin@isotestai.com',
    crypt('admin123', gen_salt('bf')),
    'Admin User',
    'Project Manager'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_settings (user_id)
SELECT id FROM users WHERE email = 'admin@isotestai.com'
ON CONFLICT DO NOTHING;
