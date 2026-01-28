-- IsoTest AI Database Initialization Script
-- PostgreSQL 15+

-- Create database (run separately if needed)
-- CREATE DATABASE isotestai;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API Projects table
CREATE TABLE IF NOT EXISTS api_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    openapi_spec_url TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases table
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES api_projects(id) ON DELETE CASCADE,
    name VARCHAR(300) NOT NULL,
    endpoint VARCHAR(500),
    method VARCHAR(10),
    generated_by_ai BOOLEAN DEFAULT false,
    test_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Executions table
CREATE TABLE IF NOT EXISTS test_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_case_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- passed, failed, error
    execution_time_ms INTEGER,
    response_data JSONB,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bug Reports table
CREATE TABLE IF NOT EXISTS bug_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_execution_id UUID REFERENCES test_executions(id),
    severity VARCHAR(50),
    description TEXT,
    ai_generated_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_test_cases_project ON test_cases(project_id);
CREATE INDEX idx_test_executions_case ON test_executions(test_case_id);
CREATE INDEX idx_bug_reports_execution ON bug_reports(test_execution_id);
CREATE INDEX idx_api_projects_user ON api_projects(created_by);

-- Sample data (optional)
INSERT INTO users (username, email, password_hash) 
VALUES ('admin', 'admin@isotestai.com', crypt('admin123', gen_salt('bf')))
ON CONFLICT DO NOTHING;
