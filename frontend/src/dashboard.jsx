import React from 'react';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
    const numBoulders = 50; // Example data
    const numCraters = 30; // Example data
    const scientificSpots = [
        { name: 'Spot 1', reason: 'Rich in mineral deposits' },
        { name: 'Spot 2', reason: 'Possible water ice presence' },
        { name: 'Spot 3', reason: 'High elevation for observation' },
        { name: 'Spot 4', reason: 'Low radiation levels' },
        { name: 'Spot 5', reason: 'Unique geological formations' },
        { name: 'Spot 6', reason: 'Potential microbial life indicators' },
        { name: 'Spot 7', reason: 'High reflectance area' },
        { name: 'Spot 8', reason: 'Ancient crater site' },
        { name: 'Spot 9', reason: 'Volcanic activity evidence' },
        { name: 'Spot 10', reason: 'Magnetic anomalies detected' },
    ];

    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
    };

    const headerStyle = {
        fontSize: '24px',
        marginBottom: '10px',
    };

    const listStyle = {
        listStyleType: 'none',
        paddingLeft: '0',
    };

    const listItemStyle = {
        marginBottom: '5px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        color: '#f0f0f0',
    };

    const countStyle = {
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
    };

    // Line graph data
    const reluctanceData = {
        labels: ['400nm', '500nm', '600nm', '700nm', '800nm'],
        datasets: [
            {
                label: 'Reluctance',
                data: [0.5, 0.6, 0.7, 0.8, 0.9],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                lineTension: 0.1,
            },
        ],
    };

    return (
        <div style={containerStyle}>
            <div style={countStyle}>
                <p><strong>Number of Boulders:</strong> {numBoulders}</p>
                <p><strong>Number of Craters:</strong> {numCraters}</p>
            </div>
            <h2 style={headerStyle}>Top 10 Scientific Spots</h2>
            <ul style={listStyle}>
                {scientificSpots.map((spot, index) => (
                    <li key={index} style={listItemStyle}>
                        <strong>{spot.name}</strong>: {spot.reason}
                    </li>
                ))}
            </ul>
            {/* <Line data={reluctanceData} /> */}
        </div>
    );
};

export default Dashboard;
