/* eslint-disable */
import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export function Pythonin(props) {
  const group = useRef()
  const propstext = useTexture({
    map: '/python/textures/Python_baseColor.png',
    normalMap: '/python/textures/Python_normal.png',
    roughnessMap: '/python/textures/Python_metallicRoughness.png',
  })
  const { nodes, materials } = useGLTF('/python/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.Python_Python_0.geometry} material={materials.Python} rotation={[-Math.PI / 2, 0, 0]} scale={0.12} >
          <meshStandardMaterial {...propstext} />
        </mesh>
      </group>
    </group>
    
  )
}

useGLTF.preload('./python/scene.gltf')