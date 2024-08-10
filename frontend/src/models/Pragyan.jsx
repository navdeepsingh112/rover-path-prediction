import { useBox, useCylinder, useHingeConstraint } from '@react-three/cannon';
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
    const [chassisRef, chassisApi] = useBox(() => ({ mass: 500, position: [100, 203, -90],    collisionFilterGroup: 1,
        collisionFilterMask: 1}));
    const gltf = useGLTF('/rover3/rover.gltf');
    return (
        <mesh ref={chassisRef}>
            <primitive object={gltf.scene} />
        </mesh>
    );
}

function RoverWheel({ position }) {
    const gltf = useGLTF('/tyre/tyre.gltf');
    return (
        <mesh position={position}>
            <primitive object={gltf.scene}/>
        </mesh>
    );
}

const Pragyan = () => {
    const [ref, api] = useBox(() => ({
        mass: 30,
        position: [10, -50, -10],
        collisionFilterGroup: 1, // Enable collision detection for the box
        collisionFilterMask: 1, // Collide with the terrain
      }));
    
//     const gltf = useGLTF('/rover3/rover.gltf');
//   const [ref, api] = useBox(() => ({ mass: 100, position: [100, 203, -100],
//         collisionFilterGroup: 1, // Enable collision detection for the box
//         collisionFilterMask: 1, // Collide with the terrain 
//     }));

//     const [ref2,api2] = useCylinder(() => ({
//         mass: 100,
//         position: [100, 203, -100],
//         args: [1, 1, 1, 32],
//         collisionFilterGroup: 1, // Enable collision detection for the box
//         collisionFilterMask: 1, // Collide with the terrain
//     }));

//     useFrame(() => {
//         api.velocity.set(0, 0, 0);
//         api.angularVelocity.set(0, 0, 0);
//         api2.velocity.set(0, 0, 0);
//         api2.angularVelocity.set(0, 0, 0);
//     }

//     );


   
    // const [wheelFLRef] = useCylinder(() => ({ mass: 50, position: [-1, 0.5, 1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
    //     collisionFilterMask: 1}));
    // const [wheelFRRef] = useCylinder(() => ({ mass: 50, position: [1, 0.5, 1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
    //     collisionFilterMask: 1}));
    // const [wheelRLRef] = useCylinder(() => ({ mass: 50, position: [-1, 0.5, -1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
    //     collisionFilterMask: 1}));
    // const [wheelRRRef] = useCylinder(() => ({ mass: 50, position: [1, 0.5, -1], args: [0.4, 0.4, 0.1, 16]  ,    collisionFilterGroup: 1,
    //     collisionFilterMask: 1}));

    // useHingeConstraint(chassisRef, wheelFLRef, { axisA: [0, 1, 0], axisB: [0, 1, 0], pivotA: [-1, 0, 1], pivotB: [0, 0, 0] });
    // useHingeConstraint(chassisRef, wheelFRRef, { axisA: [0, 1, 0], axisB: [0, 1, 0], pivotA: [1, 0, 1], pivotB: [0, 0, 0] });
    // useHingeConstraint(chassisRef, wheelRLRef, { axisA: [0, 1, 0], axisB: [0, 1, 0], pivotA: [-1, 0, -1], pivotB: [0, 0, 0] });
    // useHingeConstraint(chassisRef, wheelRRRef, { axisA: [0, 1, 0], axisB: [0, 1, 0], pivotA: [1, 0, -1], pivotB: [0, 0, 0] });
    // useRoverControls(chassisApi);
  return (
    <>
    
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="blue" />
    </mesh>
    </>
        
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