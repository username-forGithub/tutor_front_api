/* eslint-disable */
import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from '../Loader';

export function Modelphpnew(props) {
  const { nodes, materials } = useGLTF('/php/scene.gltf')
  return (
    <Canvas
      shadows
      frameloop='demand'
      // dpr={[10, 2]}
      // gl={{ preserveDrawingBuffer: true }}
      camera={{
        // fov: 110,
        // near: 0.001,
        // far: 100,
        position: [0, 0, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed="-2"
          // enablePan={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
        <ambientLight />
        {/* <pointLight intensity={5} position={[0, 1, -2]} /> */}
        <pointLight position={[4, 3, 2]} />        
        <group {...props} dispose={null}>
          <mesh 
            geometry={nodes.Object_2.geometry} 
            material={materials.Textured} 
            rotation={[-Math.PI / 2, 0, 0]} 
            scale={3}         
          >
          </mesh>
        </group>        
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('./php/scene.gltf')