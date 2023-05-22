/* eslint-disable */
import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from '../Loader';
import { Pythonin } from './Pythonin';

export function ModelPython(props) {

  const { nodes, materials } = useGLTF('/python/scene.gltf')
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
        position: [0, 0, 12],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed="5"
          // enablePan={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
        <ambientLight />
        <pointLight  intensity={5} position={[0, 1, -2]} />        
          <Pythonin /> 
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('./python/scene.gltf')