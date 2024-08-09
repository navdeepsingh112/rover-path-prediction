import React, { useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Physics, useBox, useHeightfield } from '@react-three/cannon';

const TerrainTile = () => {
  const [tileData, setTileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractSubArray = (data, startRow, endRow, startCol, endCol) => {
    return data.slice(startRow, endRow).map(row => row.slice(startCol, endCol));
  };

  useEffect(() => {
    const jsonFilePath = './data.json';

    fetch(jsonFilePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const subArray = extractSubArray(data, 500, 700, 500, 700);
        setTileData(subArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      });
  }, []);

  const heightfieldData = useMemo(() => {
    if (!tileData || tileData.length === 0) return [[0]];
    return tileData;
  }, [tileData]);

  const [ref] = useHeightfield(() => ({
    args: [heightfieldData, { elementSize: 1 }],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 1.18, 0],  // Adjust position to match the elevation range
    scale: [20, 20, 20],
  }), null, [heightfieldData]);  

  const geometry = useMemo(() => {
    if (!tileData || tileData.length === 0) return null;

    const width = tileData.length;
    const height = tileData[0].length;

    const geometry = new THREE.PlaneGeometry(1, 1, width - 1, height - 1);
    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const index = i * height + j;
        vertices[index * 3 + 2] = tileData[i][j]; // Set the Z value (height)
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, [tileData]);

  if (!geometry) return null;

  return (
    <>
      {!loading && (
        <mesh
          ref={ref}
          geometry={geometry}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          castShadow
          scale={[20, 20, 20]}
        >
          {/* <meshStandardMaterial color="gray" /> */}
          <meshPhongMaterial color="gray" />
        </mesh>
      )}
    </>
  );
};

const ControllableBox = () => {
  const [ref, api] = useBox(() => ({
    mass: 3,
    position: [0, 0, 0],
    args: [0.5, 0.5, 0.5],
  }));

  useFrame(() => {
    const velocity = [0, 0, 0];
    const speed = 5;

    if (window.isKeyPressed('ArrowUp')) velocity[2] -= speed;
    if (window.isKeyPressed('ArrowDown')) velocity[2] += speed;
    if (window.isKeyPressed('ArrowLeft')) velocity[0] -= speed;
    if (window.isKeyPressed('ArrowRight')) velocity[0] += speed;

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
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls />
      <ambientLight intensity={0.9} />
      <directionalLight position={[50, 50, 50]} />
      <Physics>
        <TerrainTile />
        <ControllableBox />
      </Physics>
    </Canvas>
  );
};

export default Terrain;
