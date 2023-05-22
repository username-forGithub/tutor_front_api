/* eslint-disable */
import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from '../Loader';

export function ModelRuby(props) {
  const { nodes, materials } = useGLTF('/ruby/scene.gltf')
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
        // position: [0, 0, 10],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed="-6"
          // enablePan={false}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 2.5}
          enableRotate={false}
        />
        <ambientLight />
        <pointLight  intensity={3} position={[0, 1, -2]} />
        <pointLight  intensity={2} position={[0, 0, 20]} />
        <group scale={.8} {...props} dispose={null}>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Material.002']} position={[0, -1, 0]} rotation={[-Math.PI, 0, 0]} scale={1.98} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['Material.002']} position={[0, -1, 0]} rotation={[-Math.PI, 0, 0]} scale={2.01} />
        </group>
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('./ruby/scene.gltf')