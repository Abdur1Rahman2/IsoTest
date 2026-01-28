import React, { useMemo } from 'react';

const TOTAL_STEPS = 7;

export default function WalkthroughModal({
  currentStep,
  onClose,
  onSkip,
  onPrev,
  onNext,
  onGetStarted,
  onViewDocs,
}) {
  const step = Math.min(Math.max(currentStep, 1), TOTAL_STEPS);

  const slides = useMemo(
    () => [
      {
        title: 'Welcome to IsoTest AI',
        subtitle: 'Your AI-powered API testing platform',
        body: 'Get started quickly with a guided tour of key modules.',
        icon: 'spark',
      },
      {
        title: 'Dashboard Overview',
        subtitle: 'Monitor your testing metrics',
        body: 'Track test runs, performance, and key activity in one place.',
        icon: 'dashboard',
      },
      {
        title: 'AI Test Creation',
        subtitle: 'Generate tests automatically',
        body: 'Use AI assistance to create structured tests faster with fewer steps.',
        icon: 'wand',
      },
      {
        title: 'AI Case Generation',
        subtitle: 'Review and customize tests',
        body: 'Refine generated cases to match your API contracts and expected results.',
        icon: 'cases',
      },
      {
        title: 'Test Execution',
        subtitle: 'Run tests in isolation',
        body: 'Execute isolated runs for reliable results and clean reproducibility.',
        icon: 'play',
      },
      {
        title: 'Bug Report System',
        subtitle: 'Intelligent debugging',
        body: 'Capture issues with context and streamline communication with your team.',
        icon: 'bug',
      },
      {
        title: 'Historical Analytics',
        subtitle: 'Track progress over time',
        body: 'Review trends and improvements to keep quality moving forward.',
        icon: 'chart',
      },
    ],
    []
  );

  const active = slides[step - 1];

  return (
    <div className="wt-overlay" role="dialog" aria-modal="true" aria-label="Platform Walkthrough">
      <div className="wt-modal">
        <header className="wt-header">
          <div className="wt-header__left">
            <div className="wt-appIcon" aria-hidden="true">
              <span className="wt-appIcon__dot wt-appIcon__dot--1" />
              <span className="wt-appIcon__dot wt-appIcon__dot--2" />
              <span className="wt-appIcon__dot wt-appIcon__dot--3" />
            </div>

            <div className="wt-header__text">
              <div className="wt-title">Platform Walkthrough</div>
              <div className="wt-step">Step {step} of {TOTAL_STEPS}</div>
            </div>
          </div>

          <button type="button" className="wt-close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 0 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z"
              />
            </svg>
          </button>
        </header>

        <div className="wt-divider" aria-hidden="true" />

        <div className="wt-progress" aria-label="Progress">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
            const done = idx + 1 <= step;
            return <div key={idx} className={`wt-seg${done ? ' wt-seg--done' : ''}`} />;
          })}
        </div>

        <div className="wt-slide" aria-label="Walkthrough slide">
          <div className="wt-icon" aria-hidden="true">
            <span className={`wt-icon__glyph wt-icon__glyph--${active.icon}`} />
          </div>

          <h3 className="wt-slide__title">{active.title}</h3>
          <div className="wt-slide__subtitle">{active.subtitle}</div>
          <p className="wt-slide__body">{active.body}</p>
        </div>

        <div className="wt-actions" aria-label="Walkthrough actions">
          <button type="button" className="wt-skip" onClick={onSkip}>
            Skip Walkthrough
          </button>

          <div className="wt-nav">
            {step > 1 ? (
              <button type="button" className="wt-btn wt-btn--secondary" onClick={onPrev}>
                Previous
              </button>
            ) : (
              <span />
            )}

            {step < TOTAL_STEPS ? (
              <button type="button" className="wt-btn wt-btn--primary" onClick={onNext}>
                Next
              </button>
            ) : (
              <div className="wt-final">
                <button type="button" className="wt-btn wt-btn--secondary" onClick={onViewDocs}>
                  View Documentation
                </button>
                <button type="button" className="wt-btn wt-btn--primary" onClick={onGetStarted}>
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

