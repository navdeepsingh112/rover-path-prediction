import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRaycastVehicle } from '@react-three/cannon'
import useControls from './utils/useControls'
import Beetle from './Beetle'
import Wheel from './Wheel'
import { Vector3 } from 'three'
import predefinedPoints  from './predefinesPoints'

const positions = predefinedPoints;

  
function Vehicle({ radius = 1.2, width = 1.2, height = -0.04, front = 1.3, back = -1.15, steer = 0.75, force = 2000, maxBrake = 1e5, manualBool, ...props }) {
    const chassis = useRef();
    const wheel1 = useRef();
    const wheel2 = useRef();
    const wheel3 = useRef();
    const wheel4 = useRef();
    const controls = useControls();
    let isKeyDown = false;
    let isCooldown = false;
    const [i, si] = useState(true);
    const [ii , sii] = useState(0);
    // const [inclination, setInclination] = useState(0);
  
  
    const wheelInfo = {
        radius,
        directionLocal: [0, -1, 0],
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 50,
        dampingCompression: 1.2,
        maxSuspensionForce: 100000,
        rollInfluence: 0,
        axleLocal: [-1, 0, 0],
        rotation: [0, -Math.PI / 2, 0],
        linearDamping: 0.9,
        angularDamping: 0.9,
        maxSuspensionTravel: 1,
        customSlidingRotationalSpeed: 10,
        useCustomSlidingRotationalSpeed: true
    };

    const wheelInfo1 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-width / 2 - 0.2, height + 0.7, front - 0.3] };
    const wheelInfo2 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [width / 2 + 0.2, height + 0.7, front - 0.4] };
    const wheelInfo3 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-width / 2 - 0.2, height + 0.7, back] };
    const wheelInfo4 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [width / 2 + 0.2, height + 0.7, back] };

    const [vehicle, api] = useRaycastVehicle(() => ({
        chassisBody: chassis,
        wheels: [wheel1, wheel2, wheel3, wheel4],
        wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
        indexForwardAxis: 2,
        indexRightAxis: 0,
        indexUpAxis: 1
    }));
    const translationDuration = 5000;
    const interval = 1; // Interval in milliseconds for updating the position

    useFrame(() => {
        const { forward, backward, left, right, brake, reset, next, prev, currentPosition } = controls.current;

            const moving = forward || backward;
        const mov2 = left || right;

        // Apply engine force and steering
        for (let e = 2; e < 4; e++) api.applyEngineForce(moving ? force * (forward && !backward ? -1 : 1) : 0, 2);
        for (let s = 0; s < 2; s++) api.setSteeringValue(mov2 ? steer * (left && !right ? 1 : -1) : 0, s);
        for (let b = 2; b < 4; b++) {
            if (i) {
                api.setBrake((!moving && !mov2) ? brake ? maxBrake : 70 : 0, 2);
            } else {
                api.setBrake(brake ? maxBrake : 0, 2);
            }
        }
      
            if (reset) {
                // vehicle.current.position.set(0, -0.5, 0);

                // vehicle.current.position.transformDirection(0, -0.5, 0);
                
                vehicle.current.translateOnAxis(new Vector3(0.5, 0, -0.5), 1);
                // vehicle.current.rotation.set(0, -Math.PI / 4, 0);
            }
        
    });
   useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'g') {
                si(!i);
            }
    //         else if(event.key == 'n'){
    //             sii((prevI) => (prevI + 1) % positions.length);
    // // const [i, si] = useState(true);
    // api.position.set(positions[ii][0], positions[ii][1], positions[ii][2]);
    //         }
    //     };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [i]);

    return (
        <group  ref={vehicle}  castShadow>
            <Beetle  ref={chassis} rotation={props.rotation}  angularVelocity={props.angularVelocity} />
            <Wheel ref={wheel1} radius={radius} leftSide />
            <Wheel ref={wheel2} radius={radius} />
            <Wheel ref={wheel3} radius={radius} leftSide />
            <Wheel ref={wheel4} radius={radius} />
        </group>
    );
}

export default Vehicle;
