import React from 'react';

const Card = ({ title, content }) => {
    return (
        <div style={{ backgroundColor: '#1F2937', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                {content}
            </div>
        </div>
    );
};

const Methodology = () => {
    return (
        <div style={{ backgroundColor: '#111827', color: '#FFFFFF', minHeight: '100vh', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Methodology</h1>
                <p style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Anomaly Detection and Crater Boulder Analysis</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Anomaly Detection Section */}
                <Card
                    title="Anomaly Detection -> ROI"
                    content={
                        <>
                            <div style={{ backgroundColor: '#4B5563', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Dataset</span>
                            </div>
                            <div style={{ backgroundColor: '#4B5563', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Anomaly Graph</span>
                            </div>
                        </>
                    }
                />

                {/* Crater Boulder Section */}
                <Card
                    title="Crater Boulder"
                    content={
                        <>
                            <div style={{ backgroundColor: '#4B5563', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Detection Stats</span>
                            </div>
                            <div style={{ backgroundColor: '#4B5563', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Dataset</span>
                            </div>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default Methodology;
