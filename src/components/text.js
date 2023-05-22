/* eslint-disable */
import React, { useRef } from 'react'
import { useGLTF, Float } from '@react-three/drei'

export function TextModel(props) {
  const { nodes, materials } = useGLTF('/title.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Text.geometry} material={materials.uu} rotation={[Math.PI / 2, 0, 0]} scale={3}/>
    </group>

  )
}

useGLTF.preload('/title.gltf')
