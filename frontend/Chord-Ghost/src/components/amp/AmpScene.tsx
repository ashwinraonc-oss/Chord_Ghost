import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { type GLTF } from "three-stdlib";
import { useRef } from "react";
import { OrthographicCamera } from "@react-three/drei";
import {
  EffectComposer,
  SelectiveBloom,
  Bloom,
} from "@react-three/postprocessing";
// import { Backdrop } from "@react-three/drei";

type AmpSceneProps = {
  handleMicClick: () => void;
  submit_audio: () => void;
  handleReset: () => void;
  isRecording: boolean;
};
type MicSceneProps = {
  handleMicClick: () => void;
};
type NeonTreeProps = {
  neonRef: React.RefObject<THREE.Mesh | null>;
  isRecording: boolean;
};
// camera={{ fov: 50, position: [0, 0, 100] }
export default function AmpScene({
  handleMicClick,
  submit_audio,
  handleReset,
  isRecording,
}: AmpSceneProps) {
  const neonRef = useRef<THREE.Mesh>(null);
  return (
    <Canvas orthographic dpr={[1, 2]} gl={{ antialias: true }}>
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[500, 300]} />
        <meshStandardMaterial color="#66250a" />
      </mesh>
      <OrthographicCamera makeDefault position={[0, 0, 60]} zoom={8} />
      {/* <ambientLight intensity={0.5} /> */}
      {/* <pointLight position={[-100, 0, 30]} color="#ffb266" intensity={1} /> */}
      <directionalLight position={[5, 5, 5]} />
      <Environment preset="sunset" environmentIntensity={1} />
      <AmpModel
        handleMicClick={handleMicClick}
        submit_audio={submit_audio}
        handleReset={handleReset}
        isRecording={isRecording}
      />
      <group position={[-5, -10, 50]} rotation={[Math.PI, Math.PI, 21.5]}>
        <MicModel handleMicClick={handleMicClick} />
      </group>
      <group position={[-100, 10, 10]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <NeonTree isRecording={isRecording} neonRef={neonRef} />
      </group>
      <OrbitControls enableRotate={false} enableZoom={false} />
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
}: AmpSceneProps) {
  const switch1ref = useRef<THREE.Mesh>(null);
  const switch2ref = useRef<THREE.Mesh>(null);
  const switch3ref = useRef<THREE.Mesh>(null);

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
  materials.screens_1.color.set("orange");
  return (
    <Center>
      <group
        position={[0, -50, 0]}
        scale={30}
        rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
      >
        <mesh geometry={nodes.defaultMaterial001.geometry}>
          <meshStandardMaterial color="#e0dad5" roughness={0.6} metalness={0} />
        </mesh>

        <mesh
          geometry={nodes.defaultMaterial002.geometry}
          material={materials.corners}
        />
        <mesh
          geometry={nodes.defaultMaterial003.geometry}
          material={materials.detail_1}
        />
        <mesh geometry={nodes.defaultMaterial004.geometry}>
          <meshStandardMaterial color="#110d0b" roughness={0.8} metalness={0} />
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
          geometry={nodes.Switch2.geometry}
          material={materials.switches_1}
          position={nodes.Switch2.position}
          rotation={nodes.Switch2.rotation}
        />
        <mesh
          ref={switch3ref}
          onClick={() => flipSwitch(switch3ref, handleReset)}
          geometry={nodes.Switch3.geometry}
          material={materials.switches_1}
          position={nodes.Switch3.position}
          rotation={nodes.Switch3.rotation}
        />
        <mesh
          ref={switch1ref}
          onClick={() => flipSwitch(switch1ref, handleMicClick)}
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
  return <primitive onClick={handleMicClick} object={scene} scale={0.05} />;
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
  const glowIntensity = isRecording ? 25 : 0;
  materials["Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8"].emissive.set(
    "blue",
  );
  materials[
    "Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8"
  ].emissiveIntensity = glowIntensity;
  materials["Sonata_28_0f4f3201-ebe1-46fe-97a5-133aa3aaf8a8"].needsUpdate =
    true;

  materials["Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9"].emissive.set(
    "green",
  );
  materials["Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_3_f3084e0e-1c4a-447d-9cfd-6f11110831d9"].needsUpdate = true;

  materials["Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75"].emissive.set(
    "yellow",
  );
  materials["Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_5_82008ba2-51b4-48d3-8f93-1440fdcc0c75"].needsUpdate = true;

  materials["Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb"].emissive.set(
    "green",
  );
  materials["Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb"].emissiveIntensity =
    glowIntensity;
  materials["Sonata_9_2c03ab2d-c77c-42f5-a7d0-40c365fe9adb"].needsUpdate = true;
  console.log(isRecording);
  return <primitive ref={neonRef} object={scene} scale={0.09} />;
}
