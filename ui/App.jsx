import React, { useState, useEffect } from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'var(--main-content-background)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    header: {
        padding: '12px 20px',
        background: 'var(--header-background)',
        borderBottom: '1px solid var(--border-color)',
        WebkitAppRegion: 'drag',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-color)',
    },
    mainContent: {
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '500px',
    },
    welcome: {
        fontSize: '24px',
        marginBottom: '8px',
        fontWeight: 600,
    },
    inputGroup: {
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
    },
    input: {
        flex: 1,
        background: 'var(--input-background)',
        color: 'var(--text-color)',
        border: '1px solid var(--button-border)',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
    },
    inputError: {
        borderColor: '#ff4444',
        background: 'rgba(255, 68, 68, 0.1)',
    },
    startButton: {
        background: 'var(--start-button-background)',
        color: 'var(--start-button-color)',
        border: '1px solid var(--start-button-border)',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'background 0.2s ease, border-color 0.2s ease',
    },
    description: {
        color: 'var(--description-color)',
        fontSize: '14px',
        lineHeight: 1.5,
    },
    link: {
        color: 'var(--link-color)',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};

function App() {
    const [apiKey, setApiKey] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        // Load saved API key from localStorage
        const savedKey = localStorage.getItem('apiKey') || '';
        setApiKey(savedKey);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setApiKey(value);
        localStorage.setItem('apiKey', value);
        if (showError) {
            setShowError(false);
        }
    };

    const handleInputFocus = (e) => {
        e.target.style.borderColor = 'var(--focus-border-color)';
        e.target.style.boxShadow = '0 0 0 3px var(--focus-box-shadow)';
        e.target.style.background = 'var(--input-focus-background)';
    };

    const handleInputBlur = (e) => {
        e.target.style.borderColor = 'var(--button-border)';
        e.target.style.boxShadow = 'none';
        e.target.style.background = 'var(--input-background)';
    };

    const handleStartSession = () => {
        const trimmedKey = apiKey.trim();
        if (!trimmedKey) {
            setShowError(true);
            setTimeout(() => setShowError(false), 1000);
            return;
        }
        // TODO: Implement session start via IPC
        console.log('Starting session with API key');
    };

    const handleKeyDown = (e) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isStartShortcut = isMac ? e.metaKey && e.key === 'Enter' : e.ctrlKey && e.key === 'Enter';

        if (isStartShortcut) {
            e.preventDefault();
            handleStartSession();
        }
    };

    const handleApiKeyHelp = () => {
        // TODO: Open external link via IPC
        console.log('Opening API key help');
    };

    const handleButtonHover = (e, isHovering) => {
        if (isHovering) {
            e.target.style.background = 'var(--start-button-hover-background)';
            e.target.style.borderColor = 'var(--start-button-hover-border)';
        } else {
            e.target.style.background = 'var(--start-button-background)';
            e.target.style.borderColor = 'var(--start-button-border)';
        }
    };

    const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span style={styles.title}>Cheating Daddy</span>
            </div>
            <div style={styles.mainContent}>
                <div style={styles.welcome}>Welcome</div>
                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Enter your Gemini API Key"
                        value={apiKey}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        style={{
                            ...styles.input,
                            ...(showError ? styles.inputError : {}),
                        }}
                    />
                    <button
                        onClick={handleStartSession}
                        onMouseEnter={(e) => handleButtonHover(e, true)}
                        onMouseLeave={(e) => handleButtonHover(e, false)}
                        style={styles.startButton}
                    >
                        Start Session {isMac ? '⌘↵' : 'Ctrl↵'}
                    </button>
                </div>
                <p style={styles.description}>
                    Don't have an API key?{' '}
                    <span style={styles.link} onClick={handleApiKeyHelp}>
                        Get one here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default App;


