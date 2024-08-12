// import React, { useEffect, useState, useMemo, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { MeshPortalMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';
// import { Debug, Physics, useBox, useConvexPolyhedron, useHeightfield } from '@react-three/cannon';

// const TerrainTile2 = ({heights}) => {
//   const terrainRef = useRef();
//   const [terrain] = useHeightfield(() => ({
//     args: [heights, { elementSize: 1 }],
//     rotation: [-Math.PI / 2, 0, 0],
//   }), terrainRef,[heights]);

//   return (
//     <mesh ref={terrainRef} receiveShadow>
//       <primitive object={terrain} />
//       <meshStandardMaterial color="green" wireframe/>
//     </mesh>
//   );
// }
// const RandomTerrain = ({height}) => {
//   const generateRandomHeights = () => {
//     const heights = [];
//     for (let i = 0; i < 100; i++) {
//       const row = [];
//       for (let j = 0; j < 100; j++) {
//         row.push(Math.random() * 10);
//       }
//       heights.push(row);
//     }
//     console.log(heights);
//     return heights;
//   };

//   const randomHeights = useMemo(() =>{
//     console.log(height);
//     return height}, []);

//   return (
//     <TerrainTile2 heights={randomHeights} />
//   );
// };

// const Terrain = () => {
//   const [loading, setLoading] = useState(true);
//   const [tileData, setTileData] = useState(null);

//   const extractSubArray = (data, startRow, endRow, startCol, endCol) => {
//     return data.slice(startRow, endRow).map(row => row.slice(startCol, endCol).map(cell => Math.abs(cell)));
//   };

//   useEffect(() => {
//     const jsonFilePath = 'data.json';

//     fetch(jsonFilePath)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data,'darta');
//         const subArray = extractSubArray(data, 500, 700, 500, 700);
//         console.log(subArray);
//         const heights = subArray.map(row => row.map(cell => cell));
//         console.log(heights);
//         setTileData(heights);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching JSON file:', error);
//       });
//   }, []);

//   return (
//     <Canvas style={{ width: '100vw', height: '100vh' }}>
//       <PerspectiveCamera fov={300} position={[0,20,-30]}/>
//       <OrbitControls enablePan={true} />
//       <ambientLight intensity={0.9} />
//       <directionalLight position={[50, 50, 50]} />
//       <Physics gravity={[0, -100, 0]}>
//         <Debug scale={1.1}>
//           {/* {!loading && <TerrainTile2 heights={tileData} />} */}
//           {<RandomTerrain height={tileData} />}
//           <ControllableBox />
//         </Debug>
//       </Physics>
//     </Canvas>
//   );
// };

// export default Terrain;

// import React from "react";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useHeightfield } from '@react-three/cannon';
import { MeshPortalMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Pragyan from './models/Pragyan';
import Vehicle from './Vehicle'
// import "./styles.css";
const ControllableBox = () => {

  const [ref, api] = useBox(() => ({
    mass: 30,
    position: [10, 50, -10],
    collisionFilterGroup: 1, // Enable collision detection for the box
    collisionFilterMask: 1, // Collide with the terrain
  }));

  useFrame(() => {
    const velocity = [0, 0, 0];
    const speed = 5;

    if (window.isKeyPressed('ArrowUp')) velocity[2] -= speed;
    if (window.isKeyPressed('ArrowDown')) velocity[2] += speed;
    if (window.isKeyPressed('ArrowLeft')) velocity[0] -= speed;
    if (window.isKeyPressed('ArrowRight')) velocity[0] += speed;
    if (window.isKeyPressed('*')) velocity[1] += speed;
    if (window.isKeyPressed('/')) velocity[1] -= speed;

    api.velocity.set(velocity[0], velocity[1], velocity[2]);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
     
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

window.isKeyPressed = (key) => {
  if (!window.pressedKeys) window.pressedKeys = {};
  return window.pressedKeys[key] || false;
};

window.addEventListener('keydown', (e) => {
  if(e.key!='v')
{  window.pressedKeys[e.key] = true;
}});

window.addEventListener('keyup', (e) => {
if(e.key!='v'){
  window.pressedKeys[e.key] = false;}
});

const positions = [
  [10, 112, 13],
  [10, 115, 16],
  [10, 115, 10],
  [10, 112, 3],
  [10, 115, 16],
  [18, 115, 10]
];

function Marble() {
  const [ref] = useSphere(() => ({
    mass: 10,
    position: [2, 5, 0]
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry
        attach="geometry"
        args={[1, 32, 32]}
      ></sphereGeometry>
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function Box({ position }) {
  const [ref] = useBox(() => ({
    mass: 10,
    position: position,
    args: [2, 2, 2]
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
const Plane = ({ tileData }) => {
  const [ref] = useHeightfield(() => ({
    args: [tileData, { elementSize: 1 }], // elementSize defines the size of each tile in world units
    rotation: [-Math.PI / 2, 0, 0], // Rotate plane to be horizontal
    position: [0, 0, 0], // Adjust the position if necessary
  }));

  const geometry = useMemo(() => {
    if (!tileData || tileData.length === 0) return null;

    const width = tileData.length;
    const height = tileData[0].length;

    // Create a new BufferGeometry
    const geometry = new THREE.BufferGeometry();

    // Calculate the total number of vertices
    const numVertices = width * height;

    // Create a Float32Array for positions (x, y, z for each vertex)
    const positions = new Float32Array(numVertices * 3);

    // Fill the positions array with custom points
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const index = i * height + j;

        // Custom x, y, z positions
        positions[index * 3 + 0] = i; // x
        positions[index * 3 + 1] = j; // y
        positions[index * 3 + 2] = tileData[i][j]; // z (height)
      }
    }

    // Set the position attribute to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Optionally, create index for better performance in rendering
    const indices = [];
    for (let i = 0; i < width - 1; i++) {
      for (let j = 0; j < height - 1; j++) {
        const a = i * height + j;
        const b = (i + 1) * height + j;
        const c = (i + 1) * height + (j + 1);
        const d = i * height + (j + 1);

        // Two triangles forming the square
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    geometry.setIndex(indices);

    // Compute normals for lighting calculations
    geometry.computeVertexNormals();

    return geometry;
  }, [tileData]);

  return (
    <mesh ref={ref} geometry={geometry} receiveShadow>
      {/* <Vehicle position={[10, 50, -10]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} /> */}
      <meshLambertMaterial attach="material" color="white" />
    </mesh> 
  );
};
export default function App() {
  const [loading, setLoading] = useState(true);
  const [tileData, setTileData] = useState([[0,0],[0,0]]);

  const extractSubArray = (data, startRow, endRow, startCol, endCol) => {
      return data.slice(startRow, endRow).map(row => row.slice(startCol, endCol).map(cell => Math.abs(cell)));
    };

  useEffect(() => {
      const jsonFilePath = 'data.json';

      fetch(jsonFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data, 'darta');
          const subArray = extractSubArray(data, 500, 700, 500, 700);
          console.log(subArray);
          const heights = subArray.map(row => row.map(cell => cell));
          console.log(heights);
          setTileData(heights);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching JSON file:', error);
        });
    }, []);
  const vehicleRef = useRef();
  return (
    <Canvas  shadows>
      {/* <color attach="background" args={["#94ebd8"]} /> */}
      {/* <OrbitControls enablePan={true} /> */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[50, 5, 5]} />

      <Physics>
        {!loading && (
          <>
            <Plane tileData={tileData} />/
            {/* <ControllableBox /> */}
            {/* <PerspectiveCamera makeDefault position={[10, 50, 40]} /> */}
            <Vehicle  position={[10, 200, -10]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
            {/* <FollowCamera vehicleRef={vehicleRef} /> */}
            {/* <ControllableBox /> */}
            {/* <Vehicle position={[10, 200, -10]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} /> */}
          </>
        )}
      </Physics>
    </Canvas>
  );
}
// const FollowCamera = ({ vehicleRef }) => {
//   const cameraRef = useRef();

//   useFrame(() => {
//     if (cameraRef.current && vehicleRef.current) {
//       // Access vehicle's position
//       const vehiclePosition = vehicleRef.current.position;
//       const vehicleRotation = vehicleRef.current.rotation;

//       // Calculate camera position based on vehicle's position and rotation
//       const offset = [0, 5, -10]; // Adjust as needed
//       const cameraPosition = [ 
//         vehiclePosition.x + offset[2] * Math.sin(vehicleRotation.y),
//         vehiclePosition.y + offset[1],
//         vehiclePosition.z + offset[2] * Math.cos(vehicleRotation.y),
//       ];

//       cameraRef.current.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
//       cameraRef.current.lookAt(vehiclePosition);
//     }
//   });

//   return <perspectiveCamera makeDefault ref={cameraRef} position={[0, 30, 10]} />;
// };