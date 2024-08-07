import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { csv } from 'd3-fetch';

const tileSize = 100;  // Size of each tile

interface TerrainTileProps {
  tileX: number;
  tileY: number;
}

const TerrainTile: React.FC<TerrainTileProps> = ({ tileX, tileY }) => {
  const [tileData, setTileData] = useState<number[] | null>(null);

  useEffect(() => {
    const fetchTileData = async () => {
      const data = await csv(`../tiles/tile_${tileX}_${tileY}.csv`, d => Object.values(d).map(Number));
      setTileData(data.flat());
    };

    fetchTileData();
  }, [tileX, tileY]);

  const geometry = useMemo(() => {
    if (!tileData) return null;

    const width = tileSize;
    const height = tileSize;
    const geometry = new THREE.PlaneGeometry(1, 1, width - 1, height - 1);
    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < tileData.length; i++) {
      vertices[i * 3 + 2] = tileData[i];
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [tileData]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry} position={[tileX * tileSize, tileY * tileSize, 0]}>
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
};

const Terrain: React.FC = () => {
  const numTilesX = 1;  // Adjust according to your data
  const numTilesY = 1;  // Adjust according to your data

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <OrbitControls />
      <ambientLight intensity={0.9} />
      <directionalLight position={[50, 5, 5]} />
      {Array.from({ length: numTilesX }).map((_, tileX) =>
        Array.from({ length: numTilesY }).map((_, tileY) => (
          <TerrainTile key={`${tileX}-${tileY}`} tileX={tileX} tileY={tileY} />
        ))
      )}
    </Canvas>
  );
};

export default Terrain;
