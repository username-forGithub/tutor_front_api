/* eslint-disable */
import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export function Modelphp(props) {
  const group = useRef()
  // const colorMap = useLoader(TextureLoader, './textures/Textured_baseColor.jpeg')
  // const propstext = useTexture({
  //   map: './textures/Python_baseColor.png',
  //   normalMap: './textures/Python_normal.png',
  //   roughnessMap: './textures/Python_metallicRoughness.png',
  // })
  const { nodes, materials } = useGLTF('./php/scene.gltf')
  return (
    // <group {...props} dispose={null}>
    //   <group scale={0.001}>
    //     <mesh geometry={nodes.Python_Python_0.geometry} material={materials.Python} rotation={[-Math.PI / 2, 0, 0]} scale={100} >
    //       {/* <meshStandardMaterial {...propstext} /> */}
    //     </mesh>
    //   </group>
    // </group>
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Object_2.geometry} 
        material={materials.Textured} 
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={3}         
      >
      </mesh>
    </group>
  )
}

useGLTF.preload('/scene.gltf')