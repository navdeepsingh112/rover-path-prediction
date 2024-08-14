// Import the JSON files
import tiledata from '../public/dtm.json';
import points from './points.json';

// Initialize an empty array for the new array of arrays
const predefinedPoints = [];

// Iterate through the points array and combine data as required
points.forEach(point => {
  const x = point[0];
  const z = point[1];
  const y = tiledata[x][z]+10; // Assuming tiledata is indexed by points[x][y]

  predefinedPoints.push([x, y, -z]);
});

// Define predefinedPoints array as specified
// const predefinedPoints = [
//   [5 + 2, 29.1, -3.5 - 2],
//   [9.7 + 5, 29.1, -15 - 5],
//   [17.9 + 5, 29.1, -10 - 5]
// ];

// Export the combined data and predefinedPoints
export default predefinedPoints;
