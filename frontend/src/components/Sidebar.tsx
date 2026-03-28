import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Zap, LogOut, Sun, Moon, Info, Languages } from 'lucide-react';
import { useTheme, useLanguage } from '../App';

const Sidebar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const NavLink = ({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) => (
        <Link to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>
            <Icon size={18} />
            {children}
        </Link>
    );

    return (
        <aside className="sidebar">
            <div style={{ padding: '0 0.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <div style={{ background: 'var(--accent-color)', padding: '0.4rem', borderRadius: '2px' }}>
                        <Zap color="white" size={18} fill="white" />
                    </div>
                    <h2 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800, letterSpacing: '-0.05em' }}>BioKinect</h2>
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--accent-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', paddingLeft: '2.5rem', opacity: 0.8 }}>
                    {t('sidebar.brandSub')}
                </p>
            </div>
            
            <nav className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <NavLink to="/dashboard" icon={LayoutDashboard}>{t('sidebar.dashboard')}</NavLink>
                <NavLink to="/patients" icon={Users}>{t('sidebar.patients')}</NavLink>
                <NavLink to="/calibration" icon={Zap}>{t('sidebar.calibration')}</NavLink>
                <NavLink to="/about" icon={Info}>{t('sidebar.about')}</NavLink>
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <button 
                    onClick={toggleLanguage} 
                    className="nav-link" 
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                    <Languages size={18} />
                    {t('sidebar.lang')}
                </button>
                <button 
                    onClick={toggleTheme} 
                    className="nav-link" 
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    {theme === 'light' ? t('sidebar.themeDark') : t('sidebar.themeLight')}
                </button>
                <button 
                    onClick={handleLogout} 
                    className="nav-link" 
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--danger-color)' }}
                >
                    <LogOut size={18} />
                    {t('sidebar.logout')}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
