import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
// import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';
// useGLTF.preload('/Beetle.glb')

// Auto-generated by: https://github.com/pmndrs/gltfjsx
// Model via KrStolorz on Sketchfab, CC-BY-4.0
// https://sketchfab.com/3d-models/low-poly-volkswagen-beetle-f680ad7e98e445eaafed1a70f2c53911
// const Beetle = forwardRef(({ args = [1.7, 1, 4], mass = 500, ...props }, ref) => {
//     // const { nodes, materials } = useGLTF('/Beetle.glb')
//     const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide: (e) => console.log('bonk', e.body.userData), ...props }), ref)
//     return (
//         <mesh ref={ref} api={api}>
//             <group position={[0, -0.6, 0]}>
//                 <mesh castShadow material={materials['Black paint']} geometry={nodes.chassis_1.geometry} />
//                 <mesh castShadow material={materials.Rubber} geometry={nodes.chassis_2.geometry} />
//                 <mesh castShadow material={materials.Paint} geometry={nodes.chassis_3.geometry} />
//                 <mesh castShadow material={materials.Underbody} geometry={nodes.chassis_4.geometry} />
//                 <mesh castShadow material={materials.Chrom} geometry={nodes.chassis_5.geometry} />
//                 <mesh castShadow material={materials['Interior (dark)']} geometry={nodes.chassis_6.geometry} />
//                 <mesh castShadow material={materials['Interior (light)']} geometry={nodes.chassis_7.geometry} />
//                 <mesh castShadow material={materials.Reflector} geometry={nodes.chassis_8.geometry} />
//                 <mesh material={materials.Glass} geometry={nodes.chassis_9.geometry} material-transparent={false} material-color="black" />
//                 <mesh castShadow material={materials.Steel} geometry={nodes.chassis_10.geometry} />
//                 <mesh castShadow material={materials['Black plastic']} geometry={nodes.chassis_11.geometry} />
//                 <mesh material={materials.Headlight} geometry={nodes.chassis_12.geometry} />
//                 <mesh castShadow material={materials['Reverse lights']} geometry={nodes.chassis_13.geometry} />
//                 <mesh castShadow material={materials['Orange plastic']} geometry={nodes.chassis_14.geometry} />
//                 <mesh castShadow material={materials['Tail lights']} geometry={nodes.chassis_15.geometry} />
//                 <mesh castShadow material={materials['License Plate']} geometry={nodes.chassis_16.geometry} />
//             </group>
//         </mesh>
//     )
// })
const Beetle = forwardRef(({ args = [1.7, 1, 4], mass = 500, ...props }, ref) => {
    // Create a box with the given args (size)
    const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide: (e) => console.log('bonk', e.body.userData), ...props }), ref);

    return (
        <Box ref={ref} args={args} castShadow>
            <meshStandardMaterial attach="material" color="yellow" />
        </Box>
    );
});

export default Beetle
