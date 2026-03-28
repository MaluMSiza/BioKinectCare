import React, { useEffect, useState } from 'react';
import { Activity, Zap, Cpu, History, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../App';
import mqtt from 'mqtt';

const Dashboard = () => {
    const [emgValue, setEmgValue] = useState(0);
    const [status, setStatus] = useState('connecting');
    const { t, language } = useLanguage();

    useEffect(() => {
        // Connect to Mosquitto WebSocket listener
        const client = mqtt.connect('ws://localhost:9001');

        client.on('connect', () => {
            console.log('Connected to MQTT via WebSockets');
            setStatus('connected');
            client.subscribe('sensor/emg/data');
        });

        client.on('message', (topic, message) => {
            if (topic === 'sensor/emg/data') {
                try {
                    const data = JSON.parse(message.toString());
                    setEmgValue(data.value);
                } catch (e) {
                    console.error('Failed to parse MQTT message', e);
                }
            }
        });

        client.on('error', (err) => {
            console.error('MQTT Connection Error:', err);
            setStatus('error');
        });

        client.on('close', () => {
            setStatus('disconnected');
        });

        return () => {
            client.end();
        };
    }, []);

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                   <span className="tech-label">SYSMON_REALTIME // {language.toUpperCase()}</span>
                   <h1 style={{ fontSize: '3rem', margin: 0 }}>{t('dashboard.title')}</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span className="tech-label">{t('dashboard.status')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: status === 'connected' ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
                        {status === 'connected' ? <Wifi size={16} /> : <WifiOff size={16} />}
                        {status === 'connected' ? t('dashboard.connected') : t('dashboard.disconnected')}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card">
                    <span className="tech-label">CLINICAL_SESSION::LIVE</span>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{t('dashboard.activePatient')}</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>João Silva</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                    <span className="tech-label">SEMG_AMPLITUDE::RAW</span>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{t('dashboard.metrics.intensity')}</h3>
                    <div className="stat-value">{emgValue.toFixed(4)}<span style={{ fontSize: '1rem', marginLeft: '0.5rem', opacity: 0.6 }}>mV</span></div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--success-color)' }}>
                    <span className="tech-label">THRESHOLD_TARGET::FIXED</span>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{t('dashboard.threshold')}</h3>
                    <div className="stat-value">45.00<span style={{ fontSize: '1rem', marginLeft: '0.5rem', opacity: 0.6 }}>mV</span></div>
                </div>
            </div>

            <div className="chart-container card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                   <div>
                        <span className="tech-label">OSCILLOSCOPE_STREAM::ACTIVE_SUBSCRIPTION</span>
                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{t('dashboard.emgChart')}</h2>
                   </div>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>DATA_EXFIL</div>
                        <div className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>SYNC_NODE</div>
                   </div>
                </div>
                
                <div style={{ height: '300px', width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, background: 'repeating-linear-gradient(90deg, var(--accent-color) 0px, transparent 1px, transparent 40px)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', borderTop: '1px solid var(--border-color)', opacity: 0.2 }} />
                    
                    {/* Real-time reactive signal indicator */}
                    <div style={{
                        position: 'absolute',
                        top: `${Math.max(10, Math.min(90, 80 - (emgValue * 50)))}%`,
                        left: '50%',
                        width: '100px',
                        height: '2px',
                        backgroundColor: 'var(--accent-color)',
                        boxShadow: '0 0 20px var(--accent-color)',
                        transform: 'translateX(-50%)',
                        transition: 'top 0.05s linear'
                    }} />
                </div>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
                    <span>PACKET_ID: {Math.floor(Date.now() / 100)}</span>
                    <span>BROKER_STATUS: {status.toUpperCase()}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
               <section className="card">
                    <span className="tech-label">HARDWARE_INFO</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem' }}>
                            <Cpu size={24} color="var(--accent-color)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>ESP32_SEMICS_NODE</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>TOPIC: sensor/emg/data</p>
                        </div>
                    </div>
               </section>
               <section className="card">
                    <span className="tech-label">SESSION_TELEMETRY</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                       <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem' }}>
                           <History size={24} color="var(--success-color)" />
                       </div>
                       <div>
                           <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>ACTIVE_TIME: 45:12</p>
                           <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>SIG_STRENGTH: 98%</p>
                       </div>
                    </div>
               </section>
            </div>
        </div>
    );
};

export default Dashboard;
