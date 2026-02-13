import { useState, useEffect } from "react";

interface Props {
    onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [scanLines, setScanLines] = useState<number[]>([]);
    const [glitchActive, setGlitchActive] = useState(false);

    // Random glitch effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlitchActive(true);
                setTimeout(() => setGlitchActive(false), 100);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Generate scan lines
    useEffect(() => {
        setScanLines(Array.from({ length: 8 }, (_, i) => i));
    }, []);

    const handleLogin = () => {
        if (!user || !pass) return;
        setLoading(true);
        setTimeout(() => {
            onLogin();
        }, 3000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

                .login-container * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Share Tech Mono', monospace;
                }

                .login-container {
                    min-height: 100vh;
                    width: 100%;
                    background: #000000;
                    color: #00ff41;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .grid-bg {
                    position: absolute;
                    inset: 0;
                    opacity: 0.1;
                    background-image: 
                        linear-gradient(rgba(0,255,65,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,65,0.15) 1px, transparent 1px);
                    background-size: 40px 40px;
                }

                .corner-bracket {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @media (min-width: 768px) {
                    .corner-bracket {
                        width: 80px;
                        height: 80px;
                    }
                }

                .corner-tl {
                    top: 16px;
                    left: 16px;
                    border-top: 2px solid rgba(0, 255, 65, 0.6);
                    border-left: 2px solid rgba(0, 255, 65, 0.6);
                }

                @media (min-width: 768px) {
                    .corner-tl { top: 32px; left: 32px; }
                }

                .corner-tr {
                    top: 16px;
                    right: 16px;
                    border-top: 2px solid rgba(0, 255, 65, 0.6);
                    border-right: 2px solid rgba(0, 255, 65, 0.6);
                }

                @media (min-width: 768px) {
                    .corner-tr { top: 32px; right: 32px; }
                }

                .corner-bl {
                    bottom: 16px;
                    left: 16px;
                    border-bottom: 2px solid rgba(0, 255, 65, 0.6);
                    border-left: 2px solid rgba(0, 255, 65, 0.6);
                }

                @media (min-width: 768px) {
                    .corner-bl { bottom: 32px; left: 32px; }
                }

                .corner-br {
                    bottom: 16px;
                    right: 16px;
                    border-bottom: 2px solid rgba(0, 255, 65, 0.6);
                    border-right: 2px solid rgba(0, 255, 65, 0.6);
                }

                @media (min-width: 768px) {
                    .corner-br { bottom: 32px; right: 32px; }
                }

                .scan-line {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(to right, transparent, rgba(0,255,65,0.4), transparent);
                }

                .radar-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(0, 255, 65, 0.2);
                }

                .radar-ring-1 {
                    width: 300px;
                    height: 300px;
                    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                @media (min-width: 768px) {
                    .radar-ring-1 { width: 600px; height: 600px; }
                }

                .radar-ring-2 {
                    width: 200px;
                    height: 200px;
                    animation: ping-slower 6s cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                @media (min-width: 768px) {
                    .radar-ring-2 { width: 400px; height: 400px; }
                }

                .terminal-box {
                    z-index: 10;
                    width: 600px;
                    max-width: 95vw;
                    position: relative;
                }

                .terminal-main {
                    border: 2px solid rgba(0, 255, 65, 0.7);
                    background: linear-gradient(to bottom, rgba(0, 50, 25, 0.4), rgba(0, 0, 0, 0.8));
                    backdrop-filter: blur(20px);
                    box-shadow: 0 0 60px rgba(0, 255, 65, 0.4);
                }

                .top-bar {
                    background: rgba(0, 50, 25, 0.6);
                    padding: 12px 24px;
                    border-bottom: 1px solid rgba(0, 255, 65, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .status-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #00ff41;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
                }

                .title-section {
                    padding: 32px;
                    text-align: center;
                    border-bottom: 1px solid rgba(0, 255, 65, 0.2);
                }

                .title-dots {
                    display: flex;
                    align-items: center;
                    justify-center;
                    gap: 8px;
                    margin-bottom: 8px;
                }

                .dot {
                    background: #00ff41;
                    border-radius: 50%;
                }

                .dot-1 { width: 4px; height: 4px; }
                .dot-2 { width: 8px; height: 8px; }
                .dot-3 { width: 4px; height: 4px; }

                .main-title {
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 0.4em;
                    color: #86efac;
                    margin-bottom: 8px;
                }

                .sub-title {
                    font-size: 18px;
                    letter-spacing: 0.3em;
                    color: rgba(0, 255, 65, 0.8);
                    margin-bottom: 12px;
                }

                .badges {
                    display: flex;
                    align-items: center;
                    justify-center;
                    gap: 8px;
                    font-size: 11px;
                    color: rgba(0, 255, 65, 0.7);
                }

                .badge {
                    padding: 4px 12px;
                    border: 1px solid rgba(0, 255, 65, 0.4);
                    background: rgba(0, 50, 25, 0.3);
                }

                .content-area {
                    padding: 24px;
                }

                @media (min-width: 768px) {
                    .content-area { padding: 32px; }
                }
 Broadway
                .status-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 32px;
                    font-size: 11px;
                }

                .status-card {
                    border: 1px solid rgba(0, 255, 65, 0.4);
                    background: rgba(0, 50, 25, 0.2);
                    padding: 12px;
                    text-align: center;
                }

                .status-label {
                    color: rgba(0, 255, 65, 0.6);
                }

                .status-value {
                    color: #86efac;
                    margin-top: 4px;
                    font-weight: bold;
                }

                .input-group {
                    margin-bottom: 24px;
                }

                .input-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #00ff41;
                    font-size: 12px;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-field {
                    width: 100%;
                    padding: 16px;
                    background: rgba(0, 0, 0, 0.6);
                    border: 2px solid rgba(0, 255, 65, 0.5);
                    color: #86efac;
                    outline: none;
                    letter-spacing: 0.15em;
                    transition: all 0.3s;
                }

                .input-field:focus {
                    border-color: #00ff41;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }

                .input-field::placeholder {
                    color: rgba(0, 100, 50, 0.8);
                }

                /* Disable autofill styling */
                .input-field:-webkit-autofill,
                .input-field:-webkit-autofill:hover,
                .input-field:-webkit-autofill:focus,
                .input-field:-webkit-autofill:active {
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: #86efac;
                    transition: background-color 5000s ease-in-out 0s;
                    box-shadow: inset 0 0 20px 20px rgba(0, 0, 0, 0.6);
                }

                .input-indicator {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 8px;
                    height: 8px;
                    background: #00ff41;
                    border-radius: 50%;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .login-button {
                    width: 100%;
                    padding: 16px;
                    border: 2px solid #00ff41;
                    background: linear-gradient(to right, rgba(0, 50, 25, 0.4), rgba(0, 100, 50, 0.4));
                    color: #86efac;
                    letter-spacing: 0.3em;
                    font-size: 12px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
                }

                .login-button:hover:not(:disabled) {
                    background: #00ff41;
                    color: #000;
                    box-shadow: 0 0 40px rgba(0, 255, 65, 0.6);
                }

                .login-button:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .warning-box {
                    margin-top: 24px;
                    text-align: center;
                    font-size: 10px;
                    color: rgba(0, 255, 65, 0.6);
                    border: 1px solid rgba(0, 255, 65, 0.2);
                    background: rgba(0, 50, 25, 0.1);
                    padding: 12px;
                }

                .auth-screen {
                    padding: 48px 0;
                }

                .auth-title {
                    text-align: center;
                    font-size: 28px;
                    letter-spacing: 0.4em;
                    margin-bottom: 16px;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    color: #86efac;
                    font-weight: bold;
                }

                .auth-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 24px;
                }

                .auth-dot {
                    width: 12px;
                    height: 12px;
                    background: #00ff41;
                    border-radius: 50%;
                    animation: bounce 1s infinite;
                }

                .auth-dot:nth-child(2) { animation-delay: 0.15s; }
                .auth-dot:nth-child(3) { animation-delay: 0.3s; }

                .progress-section {
                    margin-bottom: 32px;
                }

                .progress-item {
                    margin-bottom: 16px;
                }

                .progress-header {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: #00ff41;
                    margin-bottom: 8px;
                }

                .progress-bar-bg {
                    height: 8px;
                    background: rgba(0, 50, 25, 0.5);
                    border: 1px solid rgba(0, 255, 65, 0.3);
                    overflow: hidden;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(to right, #00aa33, #00ff41);
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
                    animation: progress-fill 2.5s ease-out forwards;
                }

                .system-info {
                    border: 1px solid rgba(0, 255, 65, 0.4);
                    background: rgba(0, 50, 25, 0.2);
                    padding: 16px;
                    font-size: 11px;
                    color: #00ff41;
                }

                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }

                .info-row:last-child {
                    margin-bottom: 0;
                }

                .info-value {
                    color: #86efac;
                }

                .bottom-bar {
                    background: rgba(0, 50, 25, 0.4);
                    padding: 8px 24px;
                    border-top: 1px solid rgba(0, 255, 65, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 11px;
                    color: rgba(0, 255, 65, 0.6);
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes scanLine {
                    0%, 100% { 
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    50% { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes ping-slow {
                    0% { 
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    100% { 
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                @keyframes ping-slower {
                    0% { 
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% { 
                        transform: scale(2);
                        opacity: 0;
                    }
                }

                @keyframes progress-fill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }

                .glitch-effect {
                    animation: glitch 0.1s ease-in-out;
                }

                @keyframes glitch {
                    0%, 100% { transform: translate(0); }
                    33% { transform: translate(-2px, 2px); }
                    66% { transform: translate(2px, -2px); }
                }

                @media (max-width: 640px) {
                    .terminal-box {
                        width: 90%;
                    }
                    .main-title {
                        font-size: 18px;
                        letter-spacing: 0.2em;
                    }
                    .sub-title {
                        font-size: 12px;
                        letter-spacing: 0.15em;
                    }
                    .status-grid {
                        grid-template-columns: 1fr;
                    }
                    .top-bar, .bottom-bar {
                        padding: 8px 16px;
                    }
                    .content-area {
                        padding: 16px;
                    }
                    .title-section {
                        padding: 24px 16px;
                    }
                }
            `}</style>

            <div className="login-container">
                {/* GRID BACKGROUND */}
                <div className="grid-bg" />

                {/* CORNER BRACKETS */}
                <div className="corner-bracket corner-tl" />
                <div className="corner-bracket corner-tr" />
                <div className="corner-bracket corner-bl" />
                <div className="corner-bracket corner-br" />

                {/* SCANNING LINES */}
                {scanLines.map((i) => (
                    <div
                        key={i}
                        className="scan-line"
                        style={{
                            top: `${i * 12.5}%`,
                            animation: `scanLine ${4 + i * 0.5}s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`
                        }}
                    />
                ))}

                {/* RADAR RINGS */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <div className="radar-ring radar-ring-1" />
                    <div className="radar-ring radar-ring-2" style={{ position: 'absolute' }} />
                </div>

                {/* MAIN TERMINAL */}
                <div className={`terminal-box ${glitchActive ? 'glitch-effect' : ''}`}>
                    <div className="terminal-main">
                        {/* TOP BAR */}
                        <div className="top-bar">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="status-dot" />
                                <span style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(0, 255, 65, 0.8)' }}>
                                    SYSTEM ACTIVE
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.6)' }}>
                                {new Date().toLocaleTimeString('en-US', { hour12: false })}
                            </div>
                        </div>

                        {/* TITLE SECTION */}
                        <div className="title-section">
                            <div className="title-dots">
                                <div className="dot dot-1" />
                                <div className="dot dot-2" />
                                <div className="dot dot-3" />
                            </div>
                            <h1 className="main-title">TACTICAL DEFENSE</h1>
                            <h2 className="sub-title">THREAT DETECTION SYSTEM</h2>
                            <div className="badges">
                                <span className="badge">CLASSIFIED</span>
                                <span className="badge">LEVEL 5</span>
                            </div>
                        </div>

                        {/* CONTENT AREA */}
                        <div className="content-area">
                            {!loading ? (
                                <>
                                    {/* OPERATOR ID */}
                                    <div className="input-group">
                                        <label className="input-label">
                                            <span style={{ color: '#00ff41' }}>▸</span>
                                            OPERATOR IDENTIFICATION
                                        </label>
                                        <div className="input-wrapper">
                                            <input
                                                className="input-field"
                                                value={user}
                                                onChange={(e) => setUser(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="ENTER ID CODE"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                spellCheck="false"
                                                data-form-type="other"
                                                autoFocus
                                            />
                                            <div className="input-indicator" />
                                        </div>
                                    </div>

                                    {/* ACCESS KEY */}
                                    <div className="input-group">
                                        <label className="input-label">
                                            <span style={{ color: '#00ff41' }}>▸</span>
                                            SECURITY AUTHORIZATION KEY
                                        </label>
                                        <div className="input-wrapper">
                                            <input
                                                type="password"
                                                className="input-field"
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="••••••••"
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                spellCheck="false"
                                                data-form-type="other"
                                                style={{ letterSpacing: '0.4em' }}
                                            />
                                            <div className="input-indicator" />
                                        </div>
                                    </div>

                                    {/* LOGIN BUTTON */}
                                    <button
                                        onClick={handleLogin}
                                        disabled={!user || !pass}
                                        className="login-button"
                                    >
                                        INITIATE SYSTEM ACCESS
                                    </button>

                                    {/* WARNING */}
                                    <div className="warning-box">
                                        ⚠ UNAUTHORIZED ACCESS PROHIBITED • ALL ACTIVITIES MONITORED
                                    </div>
                                </>
                            ) : (
                                /* AUTHENTICATION SCREEN */
                                <div className="auth-screen">
                                    <h2 className="auth-title">AUTHENTICATING</h2>
                                    <div className="auth-dots">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="auth-dot" />
                                        ))}
                                    </div>

                                    {/* PROGRESS BARS */}
                                    <div className="progress-section">
                                        {['Verifying Credentials', 'Accessing Secure Nodes', 'Decrypting Authorization', 'Establishing Connection'].map((text, i) => (
                                            <div key={i} className="progress-item">
                                                <div className="progress-header">
                                                    <span>{text}</span>
                                                    <span style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>...</span>
                                                </div>
                                                <div className="progress-bar-bg">
                                                    <div
                                                        className="progress-bar-fill"
                                                        style={{ animationDelay: `${i * 0.3}s` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* SYSTEM INFO */}
                                    <div className="system-info">
                                        <div className="info-row">
                                            <span>PROTOCOL:</span>
                                            <span className="info-value">TLS 1.3</span>
                                        </div>
                                        <div className="info-row">
                                            <span>CIPHER:</span>
                                            <span className="info-value">AES-256-GCM</span>
                                        </div>
                                        <div className="info-row">
                                            <span>AUTH METHOD:</span>
                                            <span className="info-value">RSA-4096</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* BOTTOM BAR */}
                        <div className="bottom-bar">
                            <span>NODE: SECURE-01</span>
                            <span>LATENCY: 12ms</span>
                            <span>UPTIME: 99.9%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}