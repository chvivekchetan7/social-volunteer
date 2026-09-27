import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Runtime Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#F9FAFB',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              border: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(232, 90, 42, 0.1)',
                color: '#E85A2A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.4rem',
                fontWeight: 'bold',
              }}
            >
              !
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
              SocialVolunteers Platform Runtime Diagnostic
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1rem', lineHeight: 1.5 }}>
              A runtime React component exception occurred. Diagnostic details:
            </p>
            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  marginBottom: '1.25rem',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {this.state.error.stack || this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              style={{
                backgroundColor: '#E85A2A',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.75rem 1.6rem',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(232, 90, 42, 0.3)',
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
