import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                // We reload to refresh the auth state in App.tsx layout
                window.location.href = '/dashboard';
            } else {
                const errData = await response.json();
                setError(errData.detail || 'Login failed. Verify credentials.');
            }
        } catch (err) {
            setError('Connection error. Is the backend running?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Aesthetic */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none' }}>
                <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(0deg, var(--accent-color) 0px, transparent 1px, transparent 40px)' }} />
            </div>

            <div className="card" style={{ width: '450px', zIndex: 1, padding: '3.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'inline-flex', background: 'var(--accent-color)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                        <Zap color="white" size={32} fill="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('login.title')}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('login.subtitle')}</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderLeft: '3px solid var(--danger-color)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div>
                        <label className="label">{t('login.labelUser')}</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="ID_SYS_ADMIN"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">{t('login.labelPass')}</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="*************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn" 
                        style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'AUTHORIZING...' : t('login.btn')}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={14} />
                    <span style={{ fontFamily: 'JetBrains Mono', letterSpacing: '0.05em' }}>{t('login.footer')}</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
