import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const FollowCamera = ({ vehicleRef }) => {
    const cameraRef = useRef();

    useFrame(() => {
        if (cameraRef.current && vehicleRef.current) {
            // Access vehicle's position
            const vehiclePosition = vehicleRef.current.position;
            const vehicleRotation = vehicleRef.current.rotation;

            // Calculate camera position based on vehicle's position and rotation
            const offset = [0, 5, -10]; // Adjust as needed
            const cameraPosition = [
                vehiclePosition.x + offset[2] * Math.sin(vehicleRotation.y),
                vehiclePosition.y + offset[1],
                vehiclePosition.z + offset[2] * Math.cos(vehicleRotation.y),
            ];

            cameraRef.current.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
            cameraRef.current.lookAt(vehiclePosition);
        }
    });

    return <perspectiveCamera ref={cameraRef} position={[0, 5, 10]} />;
};

export default FollowCamera;
