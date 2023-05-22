/* eslint-disable */
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from "./Loader";
import { Modelabstract } from "./Abstract";
import { TextModel } from "./text";
const LogosCanvas = () => {

  return (
    <Canvas
      shadows
      frameloop='demand'
      camera={{
        position: [0, 0, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableRotate={false}
        />
        <ambientLight intensity={5}/>
        <pointLight intensity={5} position={[0, 1, -2]} />
        <pointLight position={[4, 3, 2]} />
        <TextModel />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default LogosCanvas;