import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Trash2, Calendar, User, Zap, X } from 'lucide-react';
import { useLanguage } from '../App';

const Patients = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        date_of_birth: '',
        muscle: '',
        password: 'password123'
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/patients/');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/patients/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setShowAddForm(false);
                setFormData({ full_name: '', username: '', date_of_birth: '', muscle: '', password: 'password123' });
                fetchPatients();
            }
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    const handleDelete = async (username: string) => {
        if (window.confirm(t('patients.confirmDelete') || 'Are you sure?')) {
            try {
                await fetch(`http://localhost:8000/api/patients/${username}`, {
                    method: 'DELETE'
                });
                fetchPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
        }
    };

    const filteredPatients = patients.filter(p => 
        p.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.muscle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <span className="tech-label">CLINICAL_DB_MGMT</span>
                    <h1 style={{ fontSize: '3rem', margin: 0 }}>{t('patients.title')}</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{t('patients.subtitle')}</p>
                </div>
                <button 
                    className="btn" 
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{ background: showAddForm ? 'var(--danger-color)' : 'var(--accent-color)' }}
                >
                    {showAddForm ? <X size={18} /> : <UserPlus size={18} />}
                    {showAddForm ? t('patients.btnCancel') : t('patients.btnAdd')}
                </button>
            </div>

            {showAddForm && (
                <div className="card animate-fade-in" style={{ marginBottom: '3rem', borderTop: '4px solid var(--accent-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'var(--accent-color)', padding: '0.4rem', borderRadius: '2px' }}>
                            <User color="white" size={20} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{t('patients.form.title')}</h2>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <label className="label">{t('patients.form.fullName')}</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.full_name}
                                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">{t('patients.form.username')}</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">{t('patients.form.muscle')}</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.muscle}
                                onChange={(e) => setFormData({...formData, muscle: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">{t('patients.form.dob')}</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.date_of_birth}
                                onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                                required
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <button type="submit" className="btn" style={{ width: '100%', padding: '1.25rem' }}>
                                {t('patients.form.btnSubmit')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ marginBottom: '3rem', padding: '1rem' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search color="var(--text-secondary)" size={20} style={{ position: 'absolute', left: '1.5rem' }} />
                    <input
                        type="text"
                        className="input-field"
                        placeholder={t('patients.searchPlaceholder')}
                        style={{ paddingLeft: '3.5rem', marginBottom: 0, border: 'none', background: 'transparent', fontSize: '1.1rem' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <span className="tech-label">{t('patients.list.loading')}</span>
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>{t('patients.list.empty')}</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {filteredPatients.map((patient) => (
                        <div key={patient.username} className="card" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div>
                                    <span className="tech-label">PATIENT_RECORD::UID_{patient.id.split('-')[0]}</span>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{patient.full_name}</h3>
                                    <p style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-color)', fontSize: '0.75rem' }}>@{patient.username}</p>
                                </div>
                                <button className="btn btn-secondary" style={{ padding: '0.5rem', color: 'var(--danger-color)' }} onClick={() => handleDelete(patient.username)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <div>
                                    <span className="tech-label" style={{ fontSize: '0.6rem' }}>MUSCLE_GROUP</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                        <Zap size={14} color="var(--accent-color)" />
                                        {patient.muscle}
                                    </div>
                                </div>
                                <div>
                                    <span className="tech-label" style={{ fontSize: '0.6rem' }}>BIRTH_DATE</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                        <Calendar size={14} color="var(--text-secondary)" />
                                        {patient.date_of_birth}
                                    </div>
                                </div>
                            </div>

                            {patient.calibration && (
                                <div style={{ marginTop: '1.5rem', background: 'var(--bg-secondary)', padding: '1rem', borderLeft: '3px solid var(--success-color)' }}>
                                    <span className="tech-label" style={{ fontSize: '0.6rem' }}>CALIBRATION_THRESHOLD</span>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{patient.calibration.threshold}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>mV</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Patients;
