import React from 'react';

function Navbar() {
    return (
        <nav style={{ backgroundColor: 'gray', padding: '4px', position:'fixed', width:"100%"}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto', maxWidth: 'container' }}>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: 'lg' }}>
                    Team 10011
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
                    <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
                    <a href="/methodology" style={{ color: 'white', textDecoration: 'none' }}>Methodology</a>
                    <a href="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
