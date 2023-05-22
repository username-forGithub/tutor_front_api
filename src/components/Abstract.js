/* eslint-disable */
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Modelabstract(props) {
  const { nodes, materials } = useGLTF('./abstract/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.Material2.geometry} material={materials.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')