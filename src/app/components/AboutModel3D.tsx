"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, useGLTF } from "@react-three/drei";
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
import { ABOUT_MODEL_PATH, preloadAboutModelAssets } from "../lib/aboutModelAssets";
import { use3DProfile } from "../hooks/use3DProfile";
import { useIntersectionVisible } from "../hooks/useIntersectionVisible";
import { Model3DErrorBoundary } from "./Model3DErrorBoundary";
import { Model3DFallback, Model3DSpinner } from "./Model3DFallback";

const SWAY_SPEED = 0.22;
const DRAG_SENSITIVITY = 0.006;
const MIN_ROTATION_Y = -0.55;
const MAX_ROTATION_Y = 0.55;
const LOAD_TIMEOUT_MS = 28000;
const ABOUT_FALLBACK_IMAGE = "/img/ar-image/photo_2026-06-20_16-40-33.jpg";

function clampRotation(angle: number) {
  return Math.max(MIN_ROTATION_Y, Math.min(MAX_ROTATION_Y, angle));
}

function configureTexture(texture: Texture, maxAnisotropy: number) {
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
}

function fixMaterial(material: Material, maxAnisotropy: number) {
  if (!(material instanceof MeshStandardMaterial)) return;

  const mat = material as MeshStandardMaterialType;

  if (mat.map) configureTexture(mat.map, maxAnisotropy);
  if (mat.emissiveMap) configureTexture(mat.emissiveMap, maxAnisotropy);

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
  maxAnisotropy,
  onReady,
}: {
  rotationY: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
  maxAnisotropy: number;
  onReady: () => void;
}) {
  const { scene } = useGLTF(ABOUT_MODEL_PATH);
  const groupRef = useRef<Group>(null);
  const swayDirection = useRef(1);
  const readyRef = useRef(false);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = false;
      mesh.receiveShadow = false;

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((material) => {
          fixMaterial(material, maxAnisotropy);
          return material;
        });
      } else {
        fixMaterial(mesh.material, maxAnisotropy);
      }
    });

    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }
  }, [scene, maxAnisotropy, onReady]);

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

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#2a3540", 0.75]} position={[0, 1, 0]} />
      <directionalLight position={[6, 10, 6]} intensity={0.55} />
    </>
  );
}

export default function AboutModel3D() {
  const profile = use3DProfile();
  const { ref: visibilityRef, visible } = useIntersectionVisible("120px 0px");
  const [contextLost, setContextLost] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const rotationY = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      visibilityRef(node);
    },
    [visibilityRef],
  );

  const handleModelReady = useCallback(() => {
    setModelReady(true);
    setLoadTimedOut(false);
  }, []);

  useEffect(() => {
    if (!visible || modelReady) return;

    preloadAboutModelAssets();

    const timer = window.setTimeout(() => {
      setLoadTimedOut(true);
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [visible, modelReady]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;

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

  const showFallback =
    !profile ||
    !profile.supported ||
    contextLost ||
    loadTimedOut;

  const fallback = (
    <Model3DFallback
      src={ABOUT_FALLBACK_IMAGE}
      alt="Addis Reality office and creative workspace"
      label="Addis Reality workspace preview"
    />
  );

  return (
    <div
      ref={setContainerRef}
      className="relative aspect-square min-h-[280px] w-full cursor-grab touch-pan-y active:cursor-grabbing sm:min-h-[360px] lg:min-h-[400px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      {!profile ? (
        <Model3DSpinner label="Preparing 3D viewer…" />
      ) : showFallback ? (
        fallback
      ) : (
        <Model3DErrorBoundary
          fallback={fallback}
          onError={() => setContextLost(true)}
        >
          <div className="relative h-full w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[400px]">
            {!modelReady && (
              <div className="absolute inset-0 z-10">
                <Model3DSpinner label="Loading 3D model…" />
              </div>
            )}

            {visible && (
              <Canvas
                camera={{ position: [0, 0.35, 4.2], fov: 42 }}
                gl={{
                  antialias: profile.antialias,
                  alpha: true,
                  powerPreference: profile.isMobile ? "default" : "high-performance",
                  failIfMajorPerformanceCaveat: false,
                  preserveDrawingBuffer: false,
                }}
                dpr={profile.dpr}
                frameloop={visible ? "always" : "never"}
                className="!absolute inset-0 h-full w-full"
                style={{ touchAction: "pan-y" }}
                onCreated={({ gl }) => {
                  const canvas = gl.domElement;
                  const onLost = (event: Event) => {
                    event.preventDefault();
                    setContextLost(true);
                  };
                  canvas.addEventListener("webglcontextlost", onLost, false);
                }}
              >
                <SceneLights />
                <Suspense fallback={null}>
                  <Bounds fit clip margin={1.2}>
                    <Model
                      rotationY={rotationY}
                      isDragging={isDragging}
                      maxAnisotropy={profile.maxAnisotropy}
                      onReady={handleModelReady}
                    />
                  </Bounds>
                </Suspense>
              </Canvas>
            )}
          </div>
        </Model3DErrorBoundary>
      )}
    </div>
  );
}

useGLTF.preload(ABOUT_MODEL_PATH);
