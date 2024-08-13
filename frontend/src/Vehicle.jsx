import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRaycastVehicle } from '@react-three/cannon'
import  useControls  from './utils/useControls'
import Beetle from './Beetle'
import Wheel from './Wheel'
import { Vector3 } from 'three'
import predefinedPoints  from './predefinesPoints'

const positions = predefinedPoints;

// Sample array of positions, staying within the bounds of your terrain

  
function Vehicle({ radius = 0.7, width = 1.2, height = -0.04, front = 1.3, back = -1.15, steer = 0.75, force = 2000, maxBrake = 1e5, manualBool, ...props }) {
    const chassis = useRef();
    const wheel1 = useRef();
    const wheel2 = useRef();
    const wheel3 = useRef();
    const wheel4 = useRef();
    const controls = useControls();

    const wheelInfo = {
        radius,
        directionLocal: [0, -1, 0],
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        maxSuspensionForce: 1e4,
        maxSuspensionTravel: 0.3,
        dampingRelaxation: 10,
        dampingCompression: 4.4,
        axleLocal: [-1, 0, 0],
        chassisConnectionPointLocal: [1, 0, 1],
        useCustomSlidingRotationalSpeed: true,
        customSlidingRotationalSpeed: -30,
        frictionSlip: 2
    };

    const wheelInfo1 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-width / 2, height, front] };
    const wheelInfo2 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [width / 2, height, front] };
    const wheelInfo3 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-width / 2, height, back] };
    const wheelInfo4 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [width / 2, height, back] };

    const [vehicle, api] = useRaycastVehicle(() => ({
        chassisBody: chassis,
        wheels: [wheel1, wheel2, wheel3, wheel4],
        wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
        indexForwardAxis: 2,
        indexRightAxis: 0,
        indexUpAxis: 1
    }));

    
    useFrame(() => {
        const { forward, backward, left, right, brake, reset, next, prev, currentPosition } = controls.current;

        if (next || prev) {

            console.log('currentPosition', currentPosition);
            if(next){
            const v1 = positions[currentPosition];
            const v2 = positions[currentPosition - 1];

            const direction = new Vector3(v1[0] - v2[0], 0, v1[2] - v2[2]);
            vehicle.current.translateX(direction.x);
            vehicle.current.translateZ(direction.z);

            

            // vehicle.current.translateX(v1[0]-v2[0] / Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[2]-v2[2]), 2)));
            // vehicle.current.translateZ(v1[2]-v2[2] / Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[2]-v2[2]), 2)));
            // vehicle.current.translateOnAxis(new Vector3(v1[0]-v2[0]/ Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[2]-v2[2]), 2)),0,v1[2]-v2[2] /Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[2]-v2[2]), 2))), Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[2]-v2[2]), 2)));

            const vector = new Vector3(v1[0], 0 , v1[2]).distanceTo(new Vector3(v2[0], 0 , v2[2]))
            
            
            vehicle.current.translateOnAxis(direction.normalize() , );
            }

            if(prev){
                const v1 = positions[currentPosition];
                const v2 = positions[currentPosition + 1];

                const direction = new Vector3(v1[0] - v2[0], 0, v1[2] - v2[2]);

                direction.normalize();

                vehicle.current.translateOnAxis(new Vector3(v1[0]-v2[0] / Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[1]-v2[1]), 2)+Math.pow((v1[2]-v2[2]), 2)) 
                ,(v1[1]-v2[1]) / Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[1]-v2[1]), 2)+Math.pow((v1[2]-v2[2]), 2)),
                (v1[2]-v2[2])/Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[1]-v2[1]), 2)+Math.pow((v1[2]-v2[2]), 2))), Math.sqrt(Math.pow((v1[0]-v2[0]), 2)+Math.pow((v1[1]-v2[1]), 2)+Math.pow((v1[2]-v2[2]), 2)));
            }

            // chassis.current.api.position.set(x, y, z);
            // chassis.current.api.velocity.set(0, 0, 0);
            // chassis.current.api.angularVelocity.set(0, 0, 0);
            // chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
        } else {
            for (let e = 2; e < 4; e++) api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2);
            for (let s = 0; s < 2; s++) api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s);
            for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b);
            if (reset) {
                // vehicle.current.position.set(0, -0.5, 0);

                // vehicle.current.position.transformDirection(0, -0.5, 0);
                
                vehicle.current.translateOnAxis(new Vector3(0.5, 0, -0.5), 1);
                // vehicle.current.rotation.set(0, -Math.PI / 4, 0);
            }
        }
    });

    return (
        <group ref={vehicle} position={[0, -0.4, 0]}>
            <Beetle ref={chassis} rotation={props.rotation} position={props.position} angularVelocity={props.angularVelocity} />
            <Wheel ref={wheel1} radius={radius} leftSide />
            <Wheel ref={wheel2} radius={radius} />
            <Wheel ref={wheel3} radius={radius} leftSide />
            <Wheel ref={wheel4} radius={radius} />
        </group>
    );
}

export default Vehicle;
