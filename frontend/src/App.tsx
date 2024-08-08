import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { csv } from 'd3-fetch';

const TerrainTile = () => {
  const [tileData, setTileData] = useState<number[] | null>(null);

  // useEffect(() => {
  //   const fetchTileData = async () => {
  //     const data = await csv(`data.csv`, d => {
  //       // Convert each value in the row to a number, replacing empty values with 0
  //       console.log(d);
  //       return Object.values(d).map(value => {
  //         const num = Number(value);
  //         return isNaN(num) ? 0 : num;
  //       });
  //     });
  //     console.log(data);
  //     // Fill in missing values if the row has fewer columns than expected
  //     const maxColumns = Math.max(...data.map(row => row.length));
  //     const completeData = data.map(row => {
  //       while (row.length < maxColumns) {
  //         row.push(0);
  //       }
  //       // console.log(row,'jj')
  //       return row;
  //     });

  //     console.log(completeData);
  //     setTileData(completeData);
  //   };

  //   fetchTileData();
  // }, []);
  const extractSubArray = (data, startRow, endRow, startCol, endCol) => {
    return data.slice(startRow, endRow).map(row => row.slice(startCol, endCol));
  };
  useEffect(() => {
    // Path to the JSON file (ensure the path is correct)
    const jsonFilePath = './data.json';

    // Fetch the JSON file
    fetch(jsonFilePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        // Set the data in state
        const subArray = extractSubArray(data, 500, 600, 500, 600);
        console.log(subArray);
        setTileData(subArray);
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      });
  }, []); 
  // useEffect(() => {
  //   // Path to your CSV file
  //   const csvFilePath = 'data.csv';

  //   // Fetch and parse the CSV file
  //   csv(csvFilePath)
  //     .then(data => {
  //       // Limit the data to the first 500 rows if more exist
  //       const limitedData = data.slice(0, 500);

  //       // Log the parsed and limited data to the console
  //       console.log(limitedData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the CSV file:', error);
  //     });
  // }, []); 
  // const geometry = useMemo(() => {
  //   if (!tileData) return null;

  //   const width = 500;
  //   const height = 500;

  //   const geometry = new THREE.PlaneGeometry(1, 1, width - 1, height - 1);
  //   const vertices = geometry.attributes.position.array;

  //   for (let i = 0; i < tileData.length; i++) {
  //     vertices[i * 3 + 2] = tileData[i];
  //   }

  //   geometry.computeVertexNormals();
  //   return geometry;
  // }, [tileData]);

  // if (!geometry) return null;

  // return (
  //   <mesh geometry={geometry}>
  //     <meshStandardMaterial color="gray" wireframe />
  //   </mesh>
  // );
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

    geometry.computeVertexNormals();
    return geometry;
  }, [tileData]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
};

const Terrain: React.FC = () => {

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <OrbitControls />
      <ambientLight intensity={0.9} />
      <directionalLight position={[50, 5, 5]} />
      <TerrainTile />
    </Canvas>
  );
};

export default Terrain;
