import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, CheckCircle, AlertTriangle, Timer, Activity, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../App';
import mqtt from 'mqtt';

const Calibration = () => {
    const { t } = useLanguage();
    const [patients, setPatients] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [step, setStep] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [results, setResults] = useState<any>(null);
    const [status, setStatus] = useState('connecting');
    
    // Use refs for sample collection to avoid closure issues in MQTT callback
    const samplesRef = useRef<{ flex: number[], rest: number[] }>({ flex: [], rest: [] });
    const [samplesCount, setSamplesCount] = useState({ flex: 0, rest: 0 });
    const mqttClientRef = useRef<mqtt.MqttClient | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/patients/')
            .then(res => res.json())
            .then(data => setPatients(data));

        // Setup MQTT for real-time sampling
        const client = mqtt.connect('ws://localhost:9001');
        mqttClientRef.current = client;

        client.on('connect', () => {
            console.log('Calibration MQTT Connected');
            setStatus('connected');
            client.subscribe('sensor/emg/data');
        });

        client.on('message', (topic, message) => {
            if (topic === 'sensor/emg/data' && isCalibrating) {
                try {
                    const data = JSON.parse(message.toString());
                    const val = data.value;
                    
                    if (step > 0 && step <= 6) {
                        if (step % 2 === 0) {
                            samplesRef.current.flex.push(val);
                            setSamplesCount(prev => ({ ...prev, flex: samplesRef.current.flex.length }));
                        } else {
                            samplesRef.current.rest.push(val);
                            setSamplesCount(prev => ({ ...prev, rest: samplesRef.current.rest.length }));
                        }
                    }
                } catch (e) {
                    console.error('MQTT Parse Error', e);
                }
            }
        });

        client.on('error', () => setStatus('error'));
        client.on('close', () => setStatus('disconnected'));

        return () => {
            client.end();
        };
    }, [isCalibrating, step]);

    useEffect(() => {
        let timer: any;
        if (isCalibrating && step <= 6) {
            timer = setInterval(() => {
                if (countdown > 1) {
                    setCountdown(prev => prev - 1);
                } else if (step < 6) {
                    setStep(prev => prev + 1);
                    setCountdown(3);
                } else {
                    finishCalibration();
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCalibrating, step, countdown]);

    const startCalibration = () => {
        if (!selectedPatient) return;
        setIsCalibrating(true);
        setStep(1);
        setCountdown(3);
        samplesRef.current = { flex: [], rest: [] };
        setSamplesCount({ flex: 0, rest: 0 });
        setResults(null);
    };

    const finishCalibration = async () => {
        setIsCalibrating(false);
        setStep(7); // Completed state
        
        try {
            const response = await fetch(`http://localhost:8000/api/patients/${selectedPatient}/calibrate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    flex_samples: samplesRef.current.flex,
                    rest_samples: samplesRef.current.rest
                })
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Calibration transmission failed:', error);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <span className="tech-label">SENSOR_PROC_TERMINAL // REAL_DATA_STREAM</span>
                    <h1 style={{ fontSize: '3rem', margin: 0 }}>{t('calibration.title')}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>{t('calibration.subtitle')}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span className="tech-label">MQTT_STREAM_LINK</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: status === 'connected' ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
                        {status === 'connected' ? <Wifi size={16} /> : <WifiOff size={16} />}
                        {status === 'connected' ? 'STREAM_ON' : 'STREAM_OFF'}
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2.5rem', borderLeft: '4px solid var(--accent-color)' }}>
                <span className="tech-label">PROTOCOL_PARAMETERS</span>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', marginTop: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label className="label">{t('calibration.selectPatient')}</label>
                        <select 
                            className="input-field" 
                            style={{ marginBottom: 0 }}
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            disabled={isCalibrating}
                        >
                            <option value="">-- SELECT_TARGET_PROFILE --</option>
                            {patients.map(p => (
                                <option key={p.username} value={p.username}>{p.full_name} (@{p.username})</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        className="btn" 
                        onClick={startCalibration} 
                        disabled={!selectedPatient || isCalibrating || status !== 'connected'}
                        style={{ height: '52px', padding: '0 3rem' }}
                    >
                        <Play size={18} fill="white" />
                        {t('calibration.startBtn')}
                    </button>
                </div>
            </div>

            {isCalibrating && (
                <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '5rem', border: '2px solid var(--accent-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                             <span className="tech-label">CURRENT_PHASE</span>
                             <div className="stat-value" style={{ color: 'var(--accent-color)' }}>{step}/6</div>
                        </div>
                        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '3rem' }}>
                             <span className="tech-label">SEC_REMAINING</span>
                             <div className="stat-value">{countdown}s</div>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '2.5rem', color: step % 2 === 0 ? 'var(--accent-color)' : 'var(--success-color)' }}>
                        {t('calibration.steps')[step - 1]}
                    </h2>

                    <div style={{ marginTop: '3rem', width: '100%', height: '8px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                        <div style={{ 
                            width: `${(step / 6) * 100}%`, 
                            height: '100%', 
                            background: 'var(--accent-color)', 
                            transition: 'width 0.3s ease' 
                        }} />
                    </div>
                    
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                        <span><Activity size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />SAMPLES: {step % 2 === 0 ? samplesCount.flex : samplesCount.rest} captured</span>
                        <span>BUFF: OK</span>
                    </div>
                    
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {t('calibration.instruction')}
                    </p>
                </div>
            )}

            {results && (
                <div className="card animate-fade-in" style={{ borderLeft: '4px solid var(--success-color)' }}>
                    <span className="tech-label">PROTOCOL_RESULT // ANALYSIS_COMPLETE</span>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <CheckCircle color="var(--success-color)" size={32} />
                        {t('calibration.success')}
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
                        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
                            <span className="tech-label">CALIBRATED_THRESHOLD</span>
                            <div className="stat-value" style={{ fontSize: '2rem' }}>{results.threshold.toFixed(4)}<span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>mV</span></div>
                        </div>
                        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
                            <span className="tech-label">MEAN_RESTING_SIGNAL</span>
                            <div className="stat-value" style={{ fontSize: '2rem' }}>{results.rest_avg.toFixed(4)}<span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>mV</span></div>
                        </div>
                        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
                             <span className="tech-label">MVC_PEAK_AVERAGE</span>
                             <div className="stat-value" style={{ fontSize: '2rem' }}>{results.flex_peak_avg.toFixed(4)}<span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>mV</span></div>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '2rem', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>
                         CALIBRATION_UUID: {Math.random().toString(36).substring(7).toUpperCase()} // TIMESTAMP: {results.calibrated_at}
                    </div>
                </div>
            )}

            {!isCalibrating && !results && (
                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', opacity: 0.6 }}>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <Timer size={20} color="var(--accent-color)" />
                            <h3 style={{ margin: 0 }}>REAL_TIME_SAMPLING</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem' }}>This protocol uses live data from the sensor connected via MQTT. Ensure the node is online before starting.</p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <AlertTriangle size={20} color="var(--danger-color)" />
                            <h3 style={{ margin: 0 }}>SIGNAL_INTEGRITY</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem' }}>Samples are averaged over multiple 3-second windows to filter noise and determine a precise activation threshold.</p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Calibration;
