"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Html,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import {
  DoubleSide,
  MeshStandardMaterial,
  SRGBColorSpace,
  type Group,
  type Material,
  type Mesh,
  type MeshStandardMaterial as MeshStandardMaterialType,
  type Texture,
} from "three";

// highres.glb is geometry-only (no materials/UVs) — textured.glb has embedded colors
const MODEL_PATH = "/3D/textured.glb";
const SWAY_SPEED = 0.22;
const DRAG_SENSITIVITY = 0.006;
// Front-only arc — no full 360° (back of model stays hidden)
const MIN_ROTATION_Y = -0.55;
const MAX_ROTATION_Y = 0.55;

function clampRotation(angle: number) {
  return Math.max(MIN_ROTATION_Y, Math.min(MAX_ROTATION_Y, angle));
}

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="text-center">
        <div className="mx-auto mb-2 h-9 w-9 animate-spin rounded-full border-2 border-[#C79D6D] border-t-transparent" />
        <p className="text-xs font-medium text-[#C79D6D]">
          Loading 3D… {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

function configureTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
}

function fixMaterial(material: Material) {
  if (!(material instanceof MeshStandardMaterial)) return;

  const mat = material as MeshStandardMaterialType;

  if (mat.map) configureTexture(mat.map);
  if (mat.emissiveMap) configureTexture(mat.emissiveMap);

  mat.metalness = 0.05;
  mat.roughness = 0.85;
  mat.envMapIntensity = 0;
  mat.color.setScalar(1);
  mat.side = DoubleSide;
  mat.needsUpdate = true;
}

function Model({
  rotationY,
  isDragging,
}: {
  rotationY: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
}) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<Group>(null);
  const swayDirection = useRef(1);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((material) => {
          fixMaterial(material);
          return material;
        });
      } else {
        fixMaterial(mesh.material);
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isDragging.current) {
      rotationY.current += delta * SWAY_SPEED * swayDirection.current;

      if (rotationY.current >= MAX_ROTATION_Y) {
        rotationY.current = MAX_ROTATION_Y;
        swayDirection.current = -1;
      } else if (rotationY.current <= MIN_ROTATION_Y) {
        rotationY.current = MIN_ROTATION_Y;
        swayDirection.current = 1;
      }
    }

    groupRef.current.rotation.y = rotationY.current;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function AboutModel3D() {
  const [mounted, setMounted] = useState(false);
  const rotationY = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPointerX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const deltaX = event.clientX - lastPointerX.current;
    lastPointerX.current = event.clientX;
    rotationY.current = clampRotation(
      rotationY.current + deltaX * DRAG_SENSITIVITY,
    );
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (!mounted) {
    return (
      <div className="flex aspect-square min-h-[280px] w-full items-center justify-center sm:min-h-[360px] lg:min-h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C79D6D] border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square min-h-[280px] w-full cursor-grab touch-none active:cursor-grabbing sm:min-h-[360px] lg:min-h-[400px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <Canvas
        camera={{ position: [0, 0.35, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.05} />
        <hemisphereLight
          args={["#ffffff", "#2a3540", 0.9]}
          position={[0, 1, 0]}
        />
        <directionalLight position={[6, 10, 6]} intensity={0.5} />
        <directionalLight position={[-4, 2, -3]} intensity={0.25} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip margin={1.2}>
            <Model rotationY={rotationY} isDragging={isDragging} />
          </Bounds>
          <ContactShadows
            position={[0, -0.85, 0]}
            opacity={0.35}
            scale={9}
            blur={2.8}
            far={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
