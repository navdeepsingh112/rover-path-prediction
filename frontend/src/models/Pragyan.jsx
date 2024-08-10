import { useBox, useCylinder, useHingeConstraint, useSpring, useRaycastVehicle } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function useRoverControls(chassisApi) {
  useEffect(() => {
    const handleKeyDown = (e) => {
    switch (e.key) {
        case 'w':
            chassisApi.applyLocalForce([0, 0, -150], [0, 0, 0]);
            break;
        case 's':
            chassisApi.applyLocalForce([0, 0, 150], [0, 0, 0]);
            break;
        case 'a':
            chassisApi.applyTorque([0, 150, 0]);
            break;
        case 'd':
            chassisApi.applyTorque([0, -150, 0]);
            break;
        default:
            break;
    }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chassisApi]);
}

function RoverBody() {
    // const [chassisRef, chassisApi] = useBox(() => ({ mass: 500, position: [100, 203, -90],    collisionFilterGroup: 1,
    //     collisionFilterMask: 1}));
    const gltf = useGLTF('/rover3/rover.gltf');
    return (
        // <mesh ref={chassisRef}>
            <primitive object={gltf.scene} />
        // </mesh>
    );
}

function RoverWheel() {
    const gltf = useGLTF('/tyre/tyre.gltf');
    return (
        // <mesh position={position}>
            <primitive object={gltf.scene}/>
        // </mesh>
    );
}

// const Pragyan = () => {
//     const [wheelFLRef] = useCylinder(() => ({ mass: 50, position: [-1, 0.5, 1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
//         collisionFilterMask: 1}));
//     const [wheelFRRef] = useCylinder(() => ({ mass: 50, position: [1, 0.5, 1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
//         collisionFilterMask: 1}));
//     const [wheelRLRef] = useCylinder(() => ({
//         mass: 30, position: [10, 50, -10],  collisionFilterGroup: 1,
//         collisionFilterMask: 1}));
//     const [wheelRRRef] = useCylinder(() => ({
//         mass: 30,
//         position: [10, 50, -10],
//         collisionFilterGroup: 1, // Enable collision detection for the box
//         collisionFilterMask: 1,
// }));
//     const [ref, api] = useBox(() => ({
//         mass: 30,
//         position: [10, 50, -10],
//         collisionFilterGroup: 1, // Enable collision detection for the box
//         collisionFilterMask: 1, // Collide with the terrain
//     }));

//     useFrame(() => {
//         const velocity = [0, 0, 0];
//         const speed = 5;

//         if (window.isKeyPressed('ArrowUp')) velocity[2] -= speed;
//         if (window.isKeyPressed('ArrowDown')) velocity[2] += speed;
//         if (window.isKeyPressed('ArrowLeft')) velocity[0] -= speed;
//         if (window.isKeyPressed('ArrowRight')) velocity[0] += speed;
//         if (window.isKeyPressed('*')) velocity[1] += speed;
//         if (window.isKeyPressed('/')) velocity[1] -= speed;

//         api.velocity.set(velocity[0], velocity[1], velocity[2]);
//     });

//     return (
//        <group> 
//         <mesh ref={ref} castShadow receiveShadow>
//             {/* <boxGeometry args={[0.5, 0.5, 0.5]} />
//              */}
//              <RoverBody />
//         <RoverWheel key={1}/>
//         {/* <mesh ref={wheelFRRef} > */}
//         <RoverWheel key={3} />
//         {/* </mesh> */}
//         <mesh ref={wheelRLRef} >
//         <RoverWheel key={2}/>
//         </mesh>
//         <mesh ref={wheelRRRef} >
//         <RoverWheel key={4}/>
//         </mesh>
//             <meshStandardMaterial color="blue" />
//         </mesh>
//         </group>
//     );
// };
// const Pragyan = () => {
//     const [wheelFLRef] = useCylinder(() => ({
//         mass: 50,
//         position: [-1, 0.5, 1],
//         args: [0.4, 0.4, 0.1, 16],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1
//     }));

//     const [wheelFRRef] = useCylinder(() => ({
//         mass: 50,
//         position: [1, 0.5, 1],
//         args: [0.4, 0.4, 0.1, 16],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1
//     }));

//     const [wheelRLRef] = useCylinder(() => ({
//         mass: 50,
//         position: [-1, 0.5, -1],
//         args: [0.4, 0.4, 0.1, 16],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1
//     }));

//     const [wheelRRRef] = useCylinder(() => ({
//         mass: 50,
//         position: [1, 0.5, -1],
//         args: [0.4, 0.4, 0.1, 16],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1
//     }));

//     const [ref, api] = useBox(() => ({
//         mass: 30,
//                 position: [10, 30, -10],
//         // args: [2, 0.5, 4], // Adjusted box size to match the vehicle body
//         collisionFilterGroup: 1, // Enable collision detection for the box
//                 collisionFilterMask: 1,
//     }));

//     useFrame(() => {
//         const velocity = [0, 0, 0];
//         const speed = 5;

//         if (window.isKeyPressed('ArrowUp')) velocity[2] -= speed;
//         if (window.isKeyPressed('ArrowDown')) velocity[2] += speed;
//         if (window.isKeyPressed('ArrowLeft')) velocity[0] -= speed;
//         if (window.isKeyPressed('ArrowRight')) velocity[0] += speed;
//         if (window.isKeyPressed('*')) velocity[1] += speed;
//         if (window.isKeyPressed('/')) velocity[1] -= speed;

//         api.velocity.set(velocity[0], velocity[1], velocity[2]);
//     });

//     return (
//         <group ref={ref}>
//             <mesh castShadow receiveShadow>
//                 <boxGeometry args={[2, 0.5, 4]} />
//                 <meshStandardMaterial color="blue" />
//             </mesh>
//             <mesh ref={wheelFLRef} position={[-1, 0.5, 1]}>
//                 <RoverWheel key={1} />
//             </mesh>
//             <mesh ref={wheelFRRef} position={[1, 0.5, 1]}>
//                 <RoverWheel key={2} />
//             </mesh>
//             <mesh ref={wheelRLRef} position={[-1, 0.5, -1]}>
//                 <RoverWheel key={3} />
//             </mesh>
//             <mesh ref={wheelRRRef} position={[1, 0.5, -1]}>
//                 <RoverWheel key={4} />
//             </mesh>
//         </group>
//     );
// };
// const Pragyan = () => {
//     // Create a plane for the vehicle to interact with
//     // Vehicle body
//     const [bodyRef,api] = useBox(() => ({
//         mass: 100,
//         position: [10, 31, -10],
//         args: [2, 0.5, 4], // Box dimensions
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1,
//     }));

//     // Wheels
//     const [wheelFLRef] = useCylinder(() => ({
//         mass: 50,
//         position: [9, 30.5, -8.5],
//         args: [0.4, 0.4, 0.2, 16], // Wheel dimensions
//         rotation: [Math.PI / 2, 0, 0],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1,
//     }));

//     const [wheelFRRef] = useCylinder(() => ({
//         mass: 50,
//         position: [11, 30.5, -8.5],
//         args: [0.4, 0.4, 0.2, 16], // Wheel dimensions
//         rotation: [Math.PI / 2, 0, 0],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1,
//     }));

//     const [wheelRLRef] = useCylinder(() => ({
//         mass: 50,
//         position: [9, 30.5, -11.5],
//         args: [0.4, 0.4, 0.2, 16], // Wheel dimensions
//         rotation: [Math.PI / 2, 0, 0],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1,
//     }));

//     const [wheelRRRef] = useCylinder(() => ({
//         mass: 50,
//         position: [11, 30.5, -11.5],
//         args: [0.4, 0.4, 0.2, 16], // Wheel dimensions
//         rotation: [Math.PI / 2, 0, 0],
//         collisionFilterGroup: 1,
//         collisionFilterMask: 1,
//     }));

//     // Springs to keep the wheels attached to the body
//     useSpring(bodyRef, wheelFLRef, {
//         restLength: 0.5,
//         stiffness: 100,
//         damping: 1,
//         localAnchorA: [-1, -0.5, 1.5],
//         localAnchorB: [0, 0, 0],
//     });

//     useSpring(bodyRef, wheelFRRef, {
//         restLength: 0.5,
//         stiffness: 100,
//         damping: 1,
//         localAnchorA: [1, -0.5, 1.5],
//         localAnchorB: [0, 0, 0],
//     });

//     useSpring(bodyRef, wheelRLRef, {
//         restLength: 0.5,
//         stiffness: 100,
//         damping: 1,
//         localAnchorA: [-1, -0.5, -1.5],
//         localAnchorB: [0, 0, 0],
//     });

//     useSpring(bodyRef, wheelRRRef, {
//         restLength: 0.5,
//         stiffness: 100,
//         damping: 1,
//         localAnchorA: [1, -0.5, -1.5],
//         localAnchorB: [0, 0, 0],
//     });
//     useFrame(() => {
//         const velocity = [0, 0, 0];
//         const speed = 5;

//         if (window.isKeyPressed('ArrowUp')) velocity[2] -= speed;
//         if (window.isKeyPressed('ArrowDown')) velocity[2] += speed;
//         if (window.isKeyPressed('ArrowLeft')) velocity[0] -= speed;
//         if (window.isKeyPressed('ArrowRight')) velocity[0] += speed;
//         if (window.isKeyPressed('*')) velocity[1] += speed;
//         if (window.isKeyPressed('/')) velocity[1] -= speed;

//         api.velocity.set(velocity[0], velocity[1], velocity[2]);
//     });
//     return (
//         <group>
//             <mesh ref={bodyRef} castShadow receiveShadow>
//                 <boxGeometry args={[2, 0.5, 4]} />
//                 <meshStandardMaterial color="blue" />
//             </mesh>
//             <mesh ref={wheelFLRef}>
//                 <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
//                 <meshStandardMaterial color="black" />
//             </mesh>
//             <mesh ref={wheelFRRef}>
//                 <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
//                 <meshStandardMaterial color="black" />
//             </mesh>
//             <mesh ref={wheelRLRef}>
//                 <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
//                 <meshStandardMaterial color="black" />
//             </mesh>
//             <mesh ref={wheelRRRef}>
//                 <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
//                 <meshStandardMaterial color="black" />
//             </mesh>
//         </group>
//     );
// };
const Pragyan = () => {
    // Create the vehicle body
    const chassisBody = useRef();
    const wheelInfos = [
        { radius: 0.5, directionLocal: [0, 0, -1], suspensionStiffness: 30, suspensionRestLength: 0.3, frictionSlip: 5, dampingRelaxation: 2.3, dampingCompression: 4.4, maxSuspensionForce: 100000, rollInfluence: 0.01, axleLocal: [0, 1, 0], chassisConnectionPointLocal: [1, 1, 0], maxSuspensionTravel: 0.3, customSlidingRotationalSpeed: -30, useCustomSlidingRotationalSpeed: true },
        { chassisConnectionPointLocal: [1, -1, 0] },
        { chassisConnectionPointLocal: [-1, 1, 0] },
        { chassisConnectionPointLocal: [-1, -1, 0] },
    ];

    const wheels = useRef([useRef(), useRef(), useRef(), useRef()]);

    useRaycastVehicle(() => ({
        chassisBody,
        wheelInfos,
        wheels: wheels.current,
    }));

    // Handling keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            const up = (e.type === 'keyup');
            switch (e.key) {
                case 'ArrowUp':
                    chassisBody.current.applyEngineForce(up ? 0 : -1000, 2);
                    chassisBody.current.applyEngineForce(up ? 0 : -1000, 3);
                    break;
                case 'ArrowDown':
                    chassisBody.current.applyEngineForce(up ? 0 : 1000, 2);
                    chassisBody.current.applyEngineForce(up ? 0 : 1000, 3);
                    break;
                case 'b':
                    chassisBody.current.setBrake(1000000, 0);
                    chassisBody.current.setBrake(1000000, 1);
                    chassisBody.current.setBrake(1000000, 2);
                    chassisBody.current.setBrake(1000000, 3);
                    break;
                case 'ArrowRight':
                    chassisBody.current.setSteeringValue(up ? 0 : -0.5, 0);
                    chassisBody.current.setSteeringValue(up ? 0 : -0.5, 1);
                    break;
                case 'ArrowLeft':
                    chassisBody.current.setSteeringValue(up ? 0 : 0.5, 0);
                    chassisBody.current.setSteeringValue(up ? 0 : 0.5, 1);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyDown);
        };
    }, []);

    return (
        <group>
            <mesh ref={chassisBody} castShadow receiveShadow>
                <boxGeometry args={[2, 1, 0.5]} />
                <meshStandardMaterial color="blue" />
            </mesh>
            {wheels.current.map((wheel, i) => (
                <mesh key={i} ref={wheel} castShadow receiveShadow>
                    <cylinderGeometry args={[0.5, 0.5, 0.2, 20]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            ))}
        </group>
    );
};
{/*<group>*/}
        {/* <mesh > */}
        {/* <RoverBody /> */}
        {/* </mesh> */}
        {/* <mesh ref={wheelFLRef} position={[-1, 0.5, 1]}>
        <RoverWheel key={1}/>
        </mesh>
        <mesh ref={wheelFRRef} position={[1, 0.5, 1]}>
        <RoverWheel key={3} />
        </mesh>
        <mesh ref={wheelRLRef} position={[-1, 0.5, -1]}>
        <RoverWheel key={2}/>
        </mesh>
        <mesh ref={wheelRRRef} position={[1, 0.5, -1]}>
        <RoverWheel key={4}/>
        </mesh> */}
    {/* </group> */}
export default Pragyan;