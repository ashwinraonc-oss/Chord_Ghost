import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { type GLTF } from "three-stdlib";
import { useRef } from "react";
import { OrthographicCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
// import { Backdrop } from "@react-three/drei";
import { useMemo } from "react";
import type { metalness } from "three/tsl";

type AmpSceneProps = {
  handleMicClick: () => void;
  submit_audio: () => void;
  handleReset: () => void;
  isRecording: boolean;
  handlePlayBack: () => void;
};
type MicSceneProps = {
  handleMicClick: () => void;
};
type NeonTreeProps = {
  neonRef: React.RefObject<THREE.Mesh | null>;
  isRecording: boolean;
};

export default function AmpScene({
  handleMicClick,
  submit_audio,
  handleReset,
  isRecording,
  handlePlayBack,
}: AmpSceneProps) {
  const neonRef = useRef<THREE.Mesh>(null);
  return (
    <Canvas orthographic dpr={[1, 2]} gl={{ antialias: true }}>
      <OrthographicCamera makeDefault position={[0, 0, 60]} zoom={8.2} />
      <directionalLight position={[0, 0, 0]} />
      <Environment preset="sunset" environmentIntensity={1.5} />
      <AmpModel
        handleMicClick={handleMicClick}
        submit_audio={submit_audio}
        handleReset={handleReset}
        isRecording={isRecording}
        handlePlayBack={handlePlayBack}
      />
      <group position={[-5, -10, 50]} rotation={[Math.PI, Math.PI, 21.5]}>
        <MicModel handleMicClick={handleMicClick} />
      </group>
      <group position={[-97, 10, -200]} rotation={[-Math.PI / 2, 0.2, Math.PI]}>
        <FloatingGuitar
          floatSpeed={1.2}
          floatHeight={2}
          phase={Math.PI - 30}
          floatAxis="z"
        >
          <NeonTree isRecording={isRecording} neonRef={neonRef} />
        </FloatingGuitar>
      </group>

      <group
        position={[70, 43, -30]}
        scale={1}
        rotation={[Math.PI, Math.PI, Math.PI + 4]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={Math.PI}>
            <CardboardGuitarE />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[40, 40, -30]}
        scale={1}
        rotation={[Math.PI, 0, Math.PI - 10]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={Math.PI / 2}>
            <CardboardGuitarA />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[70, -40, -50]}
        scale={0.8}
        rotation={[Math.PI, 0, Math.PI - 10]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={Math.PI - 30}>
            <CardboardGuitarA />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[-50, 45, -30]}
        scale={1.2}
        rotation={[Math.PI, Math.PI, Math.PI + 21]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={0}>
            <CardboardGuitarE />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[-95, -15, -50]}
        scale={1}
        rotation={[Math.PI, Math.PI, Math.PI + 21]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={50}>
            <CardboardGuitarA />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[0, -43, 0]}
        scale={1}
        rotation={[Math.PI, Math.PI, Math.PI - 5.5]}
      >
        <Center>
          <FloatingGuitar floatSpeed={1.2} floatHeight={2} phase={20}>
            <CardboardGuitarE />
          </FloatingGuitar>
        </Center>
      </group>
      <group
        position={[95, -45, -50]}
        rotation={[0, Math.PI + 20, 0]}
        scale={2}
      >
        <NeonPlanet />
      </group>
      <group
        position={[-110, -50, -200]}
        rotation={[0, Math.PI + 20, 0]}
        scale={10}
      >
        <TheSun />
      </group>

      {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
      <OrbitControls />
      <EffectComposer>
        <Bloom
          luminanceThreshold={1}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </Canvas>
  );
}

function AmpModel({
  handleMicClick,
  submit_audio,
  handleReset,
  isRecording,
  handlePlayBack,
}: AmpSceneProps) {
  const switch1ref = useRef<THREE.Mesh>(null);
  const switch2ref = useRef<THREE.Mesh>(null);
  const switch3ref = useRef<THREE.Mesh>(null);
  const knob1ref = useRef<THREE.Mesh>(null);
  const knobTargetRef = useRef(0);

  useFrame((_, delta) => {
    if (knob1ref.current) {
      knob1ref.current.rotation.x = THREE.MathUtils.damp(
        knob1ref.current.rotation.x,
        knobTargetRef.current,
        6, // smoothing speed — higher = snappier, lower = slower/floatier
        delta,
      );
    }
  });
  function turnKnob(handler: () => void) {
    knobTargetRef.current = knobTargetRef.current === 0 ? -Math.PI : 0;
    handler();
  }

  function flipSwitch(
    ref: React.RefObject<THREE.Mesh | null>,
    handler: () => void,
  ) {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.x === 0 ? Math.PI : 0;
    }
    handler();
  }
  type GLTFResult = GLTF & {
    nodes: {
      defaultMaterial001: THREE.Mesh;
      defaultMaterial002: THREE.Mesh;
      defaultMaterial003: THREE.Mesh;
      defaultMaterial004: THREE.Mesh;
      defaultMaterial005: THREE.Mesh;
      defaultMaterial006: THREE.Mesh;
      defaultMaterial009: THREE.Mesh;
      Knob1: THREE.Mesh;
      Knob2: THREE.Mesh;
      Knob3: THREE.Mesh;
      Knob4: THREE.Mesh;
      Knob5: THREE.Mesh;
      Knob6: THREE.Mesh;
      Knob7: THREE.Mesh;
      Knob8: THREE.Mesh;
      Knob9: THREE.Mesh;
      Light001: THREE.Mesh;
      Power: THREE.Mesh;
      Stands: THREE.Mesh;
      Switch2: THREE.Mesh;
      Switch3: THREE.Mesh;
      SwitchPower: THREE.Mesh;
    };
    materials: {
      body_1: THREE.MeshStandardMaterial;
      corners: THREE.MeshStandardMaterial;
      detail_1: THREE.MeshStandardMaterial;
      screens_1: THREE.MeshStandardMaterial;
      wire_1: THREE.MeshStandardMaterial;
      handle: THREE.MeshStandardMaterial;
      switches_1: THREE.MeshStandardMaterial;
      knob_1: THREE.MeshStandardMaterial;
      knobs_2: THREE.MeshStandardMaterial;
      light: THREE.MeshStandardMaterial;
      input_j_1: THREE.MeshStandardMaterial;
      rubber_stands: THREE.MeshStandardMaterial;
    };
  };
  const { nodes, materials } = useGLTF(
    "/models/GuitarAmp.glb",
  ) as unknown as GLTFResult;
  materials.light.emissive.set("red");
  materials.light.emissiveIntensity = 0.4;
  materials.screens_1.color.set("#1a1a1a");

  return (
    <Center>
      <group
        position={[0, -50, 0]}
        scale={30}
        rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
      >
        <mesh geometry={nodes.defaultMaterial001.geometry}>
          <meshStandardMaterial color="#ecf0f1" roughness={0.6} metalness={0} />
        </mesh>

        <mesh
          geometry={nodes.defaultMaterial002.geometry}
          material={materials.corners}
        />

        <mesh
          geometry={nodes.defaultMaterial003.geometry}
          material={materials.detail_1}
        />
        <mesh
          geometry={nodes.defaultMaterial004.geometry}
          material={materials.screens_1}
        >
          {/* <meshStandardMaterial color="#110d0b" roughness={0.8} metalness={0} /> */}
        </mesh>
        <mesh
          geometry={nodes.defaultMaterial005.geometry}
          material={materials.wire_1}
        />
        <mesh
          geometry={nodes.defaultMaterial006.geometry}
          material={materials.handle}
        />
        <mesh
          geometry={nodes.defaultMaterial009.geometry}
          material={materials.switches_1}
        />
        <mesh
          ref={knob1ref}
          onClick={() => turnKnob(handlePlayBack)}
          onPointerOver={() => {
            if (knob1ref.current) knob1ref.current.scale.set(1.2, 1.2, 1.2);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (knob1ref.current) knob1ref.current.scale.set(1, 1, 1);
            document.body.style.cursor = "default";
          }}
          geometry={nodes.Knob1.geometry}
          material={materials.knob_1}
          position={nodes.Knob1.position}
          rotation={nodes.Knob1.rotation}
        />
        <mesh
          geometry={nodes.Knob2.geometry}
          material={materials.knobs_2}
          position={nodes.Knob2.position}
          rotation={nodes.Knob2.rotation}
        />
        <mesh
          geometry={nodes.Knob3.geometry}
          material={materials.knobs_2}
          position={nodes.Knob3.position}
          rotation={nodes.Knob3.rotation}
        />
        <mesh
          geometry={nodes.Knob4.geometry}
          material={materials.knobs_2}
          position={nodes.Knob4.position}
          rotation={nodes.Knob4.rotation}
        />
        <mesh
          geometry={nodes.Knob5.geometry}
          material={materials.knobs_2}
          position={nodes.Knob5.position}
          rotation={nodes.Knob5.rotation}
        />
        <mesh
          geometry={nodes.Knob6.geometry}
          material={materials.knobs_2}
          position={nodes.Knob6.position}
          rotation={nodes.Knob6.rotation}
        />
        <mesh
          geometry={nodes.Knob7.geometry}
          material={materials.knobs_2}
          position={nodes.Knob7.position}
          rotation={nodes.Knob7.rotation}
        />
        <mesh
          geometry={nodes.Knob8.geometry}
          material={materials.knobs_2}
          position={nodes.Knob8.position}
          rotation={nodes.Knob8.rotation}
        />
        <mesh
          geometry={nodes.Knob9.geometry}
          material={materials.knobs_2}
          position={nodes.Knob9.position}
          rotation={nodes.Knob9.rotation}
        />
        <mesh
          geometry={nodes.Light001.geometry}
          material={materials.light}
          position={nodes.Light001.position}
          rotation={nodes.Light001.rotation}
        />
        <mesh geometry={nodes.Power.geometry} material={materials.input_j_1} />
        <mesh
          geometry={nodes.Stands.geometry}
          material={materials.rubber_stands}
        />
        <mesh
          ref={switch2ref}
          onClick={() => flipSwitch(switch2ref, submit_audio)}
          onPointerOver={() => {
            if (switch2ref.current) switch2ref.current.scale.set(1.2, 1.2, 1.2);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (switch2ref.current) switch2ref.current.scale.set(1, 1, 1);
            document.body.style.cursor = "default";
          }}
          geometry={nodes.Switch2.geometry}
          material={materials.switches_1}
          position={nodes.Switch2.position}
          rotation={nodes.Switch2.rotation}
        />
        <mesh
          ref={switch3ref}
          onClick={() => flipSwitch(switch3ref, handleReset)}
          onPointerOver={() => {
            if (switch3ref.current) switch3ref.current.scale.set(1.2, 1.2, 1.2);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (switch3ref.current) switch3ref.current.scale.set(1, 1, 1);
            document.body.style.cursor = "default";
          }}
          geometry={nodes.Switch3.geometry}
          material={materials.switches_1}
          position={nodes.Switch3.position}
          rotation={nodes.Switch3.rotation}
        />
        <mesh
          ref={switch1ref}
          onClick={() => flipSwitch(switch1ref, handleMicClick)}
          onPointerOver={() => {
            if (switch1ref.current) switch1ref.current.scale.set(1.2, 1.2, 1.2);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            if (switch1ref.current) switch1ref.current.scale.set(1, 1, 1);
            document.body.style.cursor = "default";
          }}
          geometry={nodes.SwitchPower.geometry}
          material={materials.switches_1}
          position={nodes.SwitchPower.position}
          rotation={nodes.SwitchPower.rotation}
        />
      </group>
    </Center>
  );
}
function MicModel({ handleMicClick }: MicSceneProps) {
  const { scene } = useGLTF("/models/MicModel.glb");
  const micRef = useRef<THREE.Object3D>(null);
  const baseScale = 0.05;
  return (
    <primitive
      ref={micRef}
      onClick={handleMicClick}
      onPointerOver={() => {
        if (micRef.current) micRef.current.scale.setScalar(baseScale * 1.1);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        if (micRef.current) micRef.current.scale.setScalar(baseScale);
        document.body.style.cursor = "default";
      }}
      object={scene}
      scale={baseScale}
    />
  );
}
function NeonTree({ neonRef, isRecording }: NeonTreeProps) {
  type NeonTreeGLTFResult = GLTF & {
    nodes: {
      Object_2: THREE.Mesh;
      Object_3: THREE.Mesh;
      Object_4: THREE.Mesh;
      Object_5: THREE.Mesh;
      Object_6: THREE.Mesh;
    };
    materials: {
      "Butterfly_Bush_8bf9d5ea-bde1-48da-8210-ffa9d922408f": THREE.MeshStandardMaterial;
      "Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8": THREE.MeshPhysicalMaterial;
      "Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9": THREE.MeshPhysicalMaterial;
      "Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75": THREE.MeshPhysicalMaterial;
      "Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb": THREE.MeshPhysicalMaterial;
    };
  };
  const { scene, materials } = useGLTF(
    "/models/NeonTree.glb",
  ) as unknown as NeonTreeGLTFResult;
  const glowIntensity = isRecording ? 6 : 0;

  materials[
    "Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8"
  ].emissiveIntensity = glowIntensity;
  materials["Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8"].needsUpdate =
    true;

  materials["Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9"].needsUpdate = true;

  materials["Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75"].needsUpdate = true;

  materials["Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb"].needsUpdate = true;
  console.log(isRecording);
  return <primitive ref={neonRef} object={scene} scale={0.09} />;
}

function NeonPlanet() {
  const { scene } = useGLTF("/models/neon_planet.glb");
  return <primitive object={scene}></primitive>;
}
function TheSun() {
  const { scene } = useGLTF("/models/the_sun.glb");

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material as THREE.MeshStandardMaterial;
      material.emissive = new THREE.Color("orange");
      material.emissiveIntensity = 3;
      material.needsUpdate = true;
    }
  });

  return <primitive object={scene} />;
}

function RedGuitar() {
  const { scene } = useGLTF("/models/red_guitar.glb");
  return <primitive object={scene}></primitive>;
}
function CardboardGuitarE() {
  const { scene } = useGLTF("/models/cardboard_electric_guitar.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} />;
}
function CardboardGuitarA() {
  const { scene } = useGLTF("/models/cardboard_guitar.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} />;
}
function PinkGuitar() {
  const { scene } = useGLTF("/models/pink_guitar.glb");
  return <primitive object={scene}></primitive>;
}
function BlueGuitar() {
  const { scene } = useGLTF("/models/blue_guitar.glb");
  return <primitive object={scene}></primitive>;
}
function FloatingGuitar({
  children,
  floatSpeed = 1,
  floatHeight = 2,
  phase = 0,
  floatAxis = "y",
}: {
  children: React.ReactNode;
  floatSpeed?: number;
  floatHeight?: number;
  phase?: number;
  floatAxis?: "y" | "z";
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const offset =
        Math.sin(state.clock.elapsedTime * floatSpeed + phase) * floatHeight;
      if (floatAxis === "y") {
        ref.current.position.y = offset;
      } else {
        ref.current.position.z = offset;
      }
    }
  });
  return <group ref={ref}>{children}</group>;
}
