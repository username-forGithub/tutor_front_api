/* eslint-disable */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function ModelGlobe(props) {
  const { nodes, materials } = useGLTF('/globe/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* <mesh geometry={nodes['Sphere001_Material_#449_0'].geometry} material={materials.Material_449} rotation={[0, 0, 2.62]} scale={0.05} /> */}
        <mesh geometry={nodes['Sphere002_Material_#450_0'].geometry} material={materials.Material_450} rotation={[0, 0, 0]} scale={0.04} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')