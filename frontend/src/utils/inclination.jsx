import React, { useEffect, useState } from 'react';

function InclinationDisplay() {
    const [inclination, setInclination] = useState(0);

    // Subscribe to inclination changes in the Vehicle component
    useEffect(() => {
        function handleInclinationChange(event) {
            setInclination(event.detail.inclination);
        }

        window.addEventListener('inclinationChange', handleInclinationChange);

        return () => {
            window.removeEventListener('inclinationChange', handleInclinationChange);
        };
    }, []);

    return (
        <div style={{ position: 'absolute', top: 10, right: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px' }}>
            Inclination: {inclination}°
        </div>
    );
}

export default InclinationDisplay;
