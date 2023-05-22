/* eslint-disable */
import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from '../Loader';
export function ModelReact(props) {
  const { nodes, materials } = useGLTF('/react/scene.gltf')
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
          autoRotateSpeed="6"
          // enablePan={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
        <ambientLight />
        <pointLight position={[4, 3, 2]} />
        <group {...props} dispose={null}>
          <group scale={0.01}>
            <mesh geometry={nodes['React-Logo_Material002_0'].geometry} material={materials['Material.002']} position={[0, 7.94, 18.1]} rotation={[0, 0, -Math.PI / 2]} scale={[39.17, 39.17, 52.73]} />
          </group>
        </group>
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('./react/scene.gltf')