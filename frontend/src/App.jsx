import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshPortalMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Debug, Physics, useBox, useConvexPolyhedron, useHeightfield } from '@react-three/cannon';

const TerrainTile2 = ({heights}) => {
  const terrainRef = useRef();
  const [terrain] = useHeightfield(() => ({
    args: [heights, { elementSize: 1 }],
    rotation: [-Math.PI / 2, 0, 0],
  }), terrainRef,[heights]);

  return (
    <mesh ref={terrainRef} receiveShadow>
      <primitive object={terrain} />
      <meshStandardMaterial color="green" wireframe/>
    </mesh>
  );
}
const RandomTerrain = ({height}) => {
  const generateRandomHeights = () => {
    const heights = [];
    for (let i = 0; i < 100; i++) {
      const row = [];
      for (let j = 0; j < 100; j++) {
        row.push(Math.random() * 10);
      }
      heights.push(row);
    }
    console.log(heights);
    return heights;
  };

  const randomHeights = useMemo(() =>{
    console.log(height);
    return height}, []);

  return (
    <TerrainTile2 heights={randomHeights} />
  );
};
const ControllableBox = () => {

  const [ref, api] = useBox(() => ({
    mass: 30,
    position: [10, 24, -10],
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
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

window.isKeyPressed = (key) => {
  if (!window.pressedKeys) window.pressedKeys = {};
  return window.pressedKeys[key] || false;
};

window.addEventListener('keydown', (e) => {
  window.pressedKeys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  window.pressedKeys[e.key] = false;
});

const Terrain = () => {
  const [loading, setLoading] = useState(true);
  const [tileData, setTileData] = useState(null);

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

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <PerspectiveCamera fov={300} position={[0,20,-30]}/>
      <OrbitControls enablePan={true} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[50, 50, 50]} />
      <Physics gravity={[0, -100, 0]}>
        <Debug scale={1.1}>
          {/* {!loading && <TerrainTile2 heights={tileData} />} */}
          {!loading && <RandomTerrain height={tileData} />}
          <ControllableBox />
        </Debug>
      </Physics>
    </Canvas>
  );
};

export default Terrain;
