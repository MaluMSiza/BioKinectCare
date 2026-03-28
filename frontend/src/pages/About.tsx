import React from 'react';
import { Shield, Zap, Target, Users, BookOpen, GraduationCap, Linkedin, Mail, Cpu, Microscope } from 'lucide-react';
import { useLanguage } from '../App';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }}>
            {/* Hero Section */}
            <section style={{ marginBottom: '6rem', borderLeft: '6px solid var(--accent-color)', paddingLeft: '2.5rem', paddingTop: '1rem' }}>
                <span className="tech-label">PROJECT_SPEC_01 // IDENTITY</span>
                <h1 style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.05em' }}>
                    {t('about.hero.title')}
                </h1>
                <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '850px', lineHeight: 1.5 }}>
                    {t('about.hero.subtitle')}
                </p>
            </section>

            {/* TCC / Academic Background */}
            <section className="card" style={{ marginBottom: '5rem', display: 'flex', gap: '4rem', alignItems: 'flex-start', padding: '3.5rem' }}>
                <div style={{ flex: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <GraduationCap color="var(--accent-color)" size={28} />
                        <span className="tech-label" style={{ margin: 0 }}>ACADEMIC_PROVENANCE_&_THESIS</span>
                    </div>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>{t('about.tcc.title')}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, textAlign: 'justify' }}>
                        {t('about.tcc.content')}
                    </p>
                </div>
                <div style={{ flex: 1, position: 'sticky', top: '2rem' }}>
                     <div className="code-block" style={{ width: '100%', padding: '2rem', fontSize: '1rem' }}>
                        <code>$ clinical status --verbose</code><br/>
                        <code>--------------------------------</code><br/>
                        <code>OBJECTIVE: CROSS_DOMAIN_REHAB</code><br/>
                        <code>STATUS: DEFENSE_READY_2026</code><br/>
                        <code>FACULTY: COMPUTER_ENGINEERING</code><br/>
                        <code>DOMAIN: BIOMEDICAL_SYSTEMS</code><br/>
                        <code>VAL_SIGNAL: SEMG_HIGH_RES</code>
                     </div>
                </div>
            </section>

            {/* Technical Detail Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '5rem' }}>
                <div className="card" style={{ padding: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Microscope color="var(--accent-color)" size={24} />
                        <span className="tech-label" style={{ margin: 0 }}>CORE_SCIENCE::SEMG</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>{t('about.semg.title')}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
                        {t('about.semg.content')}
                    </p>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Cpu color="var(--accent-color)" size={24} />
                        <span className="tech-label" style={{ margin: 0 }}>PROTOCOL_ARCH::MQTT</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>{t('about.mqtt.title')}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, textAlign: 'justify' }}>
                        {t('about.mqtt.content')}
                    </p>
                </div>
            </div>

            {/* Researchers Section */}
            <section style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Users color="var(--accent-color)" size={32} />
                    <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{t('about.authors.title')}</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                    <div className="card" style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', margin: 0, letterSpacing: '-0.02em' }}>{t('about.authors.m_name')}</h3>
                                <span className="tech-label" style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>BACHELOR_COMPUTER_ENG_&_HARDWARE_LEAD</span>
                            </div>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', transition: 'transform 0.2s ease' }} className="hover-lift">
                                <Linkedin size={24} />
                            </a>
                        </div>
                        <div style={{ height: '2px', background: 'var(--border-color)', margin: '2rem 0' }} />
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {t('about.authors.m_desc')}
                        </p>
                    </div>

                    <div className="card" style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', margin: 0, letterSpacing: '-0.02em' }}>{t('about.authors.a_name')}</h3>
                                <span className="tech-label" style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>BACHELOR_COMPUTER_ENG_&_SYSTEMS_ARCHITECT</span>
                            </div>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', transition: 'transform 0.2s ease' }} className="hover-lift">
                                <Linkedin size={24} />
                            </a>
                        </div>
                        <div style={{ height: '2px', background: 'var(--border-color)', margin: '2rem 0' }} />
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {t('about.authors.a_desc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Footer */}
            <footer className="card" style={{ textAlign: 'center', background: 'var(--accent-color)', color: 'white', padding: '4rem' }}>
                <h2 style={{ color: 'white', fontSize: '2.2rem', marginBottom: '1.5rem' }}>{t('about.contact.title')}</h2>
                <p style={{ marginBottom: '3rem', opacity: 0.9, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>{t('about.contact.content')}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                            <Mail size={22} color="white" />
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '1.1rem' }}>research@biokinect.edu.br</span>
                    </div>
                </div>
            </footer>

            <div style={{ textAlign: 'center', padding: '5rem 0 2rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'JetBrains Mono', opacity: 0.5 }}>
                BIOKINECTCARE_SYSTEM // VERSION_0.9.5_STABLE // COMPILED_2026-03-28 // NO_MOCK_AUTH_DETECTED
            </div>
        </div>
    );
};

export default About;
