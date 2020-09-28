import React, { useState, useRef } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      enablePan={false}
      enableZoom={false}
      autoRotate
      autoRotateSpeed={45}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const BaseButton = () => {
  return (
    <mesh position={[0, -0.2, 0]} receiveShadow>
      <cylinderBufferGeometry attach="geometry" args={[0.6, 1.8, 0.65, 60]} />
      <meshPhysicalMaterial attach="material" color="#7A181B" />
    </mesh>
  );
};

const BaseButton2 = () => {
  return (
    <mesh position={[0, -0.4, 0]} receiveShadow>
      <cylinderBufferGeometry attach="geometry" args={[1.9, 1.9, 0.2, 60]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
};

const Ring = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1, 1, 1] : [0.9, 0.9, 0.9],
    color: hovered ? "#15151E" : "#CC7B32"
  });

  return (
    <a.mesh
      position={[0, -0.6, 0]}
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <torusBufferGeometry attach="geometry" args={[2.2, 0.2, 40, 40]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

const AnimatedButton = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1, 0.4, 1] : [1, 0.9, 1],
    color: hovered ? "#15151E" : "#CC7B32"
  });

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <cylinderBufferGeometry attach="geometry" args={[0.2, 1, 1, 57]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

export default () => (
  <>
    <div className="bg" />
    <h1>
      THE
      <br />
      <span>FlYING</span>
      <br />
      <span>SAUCER</span>
    </h1>
    <h2>
      {" "}
      HOLD TO ORBIT THE MODEL.
      <br />
      <span id="extra">
        ALSO CLICK, HOVER, DRAG AND WHATEVER. JUST DO IT, DO IT BRO!
      </span>
    </h2>
    <div id="info">
      <h3>DESIGN BY IGNACIO MINOLLI</h3>
      <h4>SEPTEMBER 27, 2020</h4>
    </div>
    <Canvas shadowMap camera={{ position: [0, 0.6, 4] }}>
      <ambientLight intensity={0.6} />
      <spotLight
        castShadow
        penumbra={1}
        position={[15, 4, 12]}
        color={"white"}
        intensity={1}
      />
      <Controls />
      <AnimatedButton />
      <BaseButton />
      <BaseButton2 />
      <Ring />
    </Canvas>
  </>
);
