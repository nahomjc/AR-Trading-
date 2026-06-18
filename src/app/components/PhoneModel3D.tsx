"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import {
  ClampToEdgeWrapping,
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector3,
  type BufferGeometry,
  type Group,
  type Mesh,
  type Texture,
} from "three";

const PHONE_MODEL_PATH = "/3D/white_mesh%20(1).obj";
const PHONE_SCREEN_IMAGE = "/img/advert/images__2_-removebg-preview.png";
const DRAG_SENSITIVITY = 0.007;
const WHEEL_SENSITIVITY = 0.0025;
const ROTATION_LERP_DRAG = 22;
const ROTATION_LERP_IDLE = 12;
const SWAY_SPEED = 0.75;
const SWAY_AMPLITUDE = 0.24;
const FRONT_FACING_Y = Math.PI;
const MIN_ROTATION_Y = FRONT_FACING_Y - 0.52;
const MAX_ROTATION_Y = FRONT_FACING_Y + 0.52;
const PHONE_UPRIGHT_ROTATION: [number, number, number] = [
  Math.PI / 2,
  0,
  Math.PI,
];
const PHONE_SCALE = 1.88;
/** How much of the display opening the screenshot fills (bezels stay visible) */
const SCREEN_INSET = 0.97;
const SCREEN_SURFACE_OFFSET = 0.0025;

type ScreenPlacement = {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
};

function clampRotation(angle: number) {
  return Math.max(MIN_ROTATION_Y, Math.min(MAX_ROTATION_Y, angle));
}

function prepareScreenTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.offset.set(0, 0);
  texture.center.set(0.5, 0.5);
  texture.needsUpdate = true;
}

function applyCoverTexture(texture: Texture, planeAspect: number) {
  const img = texture.image as HTMLImageElement | undefined;
  if (!img?.width || !img?.height) return;

  const imageAspect = img.width / img.height;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.center.set(0.5, 0.5);

  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1);
  } else {
    texture.repeat.set(1, imageAspect / planeAspect);
  }

  texture.offset.set(
    (1 - texture.repeat.x) / 2,
    (1 - texture.repeat.y) / 2,
  );
  texture.needsUpdate = true;
}

function getPhoneGeometry(object: Group): BufferGeometry | null {
  let geometry: BufferGeometry | null = null;
  object.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.isMesh && !geometry) {
      geometry = mesh.geometry;
    }
  });
  return geometry;
}

function computeScreenPlacement(
  geometry: BufferGeometry,
): ScreenPlacement {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) {
    return {
      position: [0, 0.08, 0],
      rotation: [-Math.PI / 2, 0, 0],
      width: 0.9,
      height: 1.65,
    };
  }

  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  const planeW = size.x * SCREEN_INSET;
  const planeH = size.z * SCREEN_INSET;

  return {
    position: [
      center.x,
      box.max.y + SCREEN_SURFACE_OFFSET,
      center.z,
    ],
    rotation: [-Math.PI / 2, 0, 0],
    width: planeW,
    height: planeH,
  };
}

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="text-center">
        <div className="mx-auto mb-2 h-9 w-9 animate-spin rounded-full border-2 border-[#C79D6D]/80 border-t-transparent" />
        <p className="text-xs font-medium text-[#C79D6D]">
          Loading device… {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

function PhoneScreen({
  placement,
  screenTexture,
}: {
  placement: ScreenPlacement;
  screenTexture: Texture;
}) {
  const material = useMemo(() => {
    return new MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: DoubleSide,
      toneMapped: false,
    });
  }, [screenTexture]);

  useLayoutEffect(() => {
    prepareScreenTexture(screenTexture);
    applyCoverTexture(
      screenTexture,
      placement.width / placement.height,
    );
  }, [screenTexture, placement.width, placement.height]);

  return (
    <mesh
      position={placement.position}
      rotation={placement.rotation}
      material={material}
      renderOrder={20}
    >
      <planeGeometry args={[placement.width, placement.height]} />
    </mesh>
  );
}

function PhoneAssembly() {
  const object = useLoader(OBJLoader, PHONE_MODEL_PATH);
  const screenTexture = useTexture(PHONE_SCREEN_IMAGE);
  const phoneGeometry = useMemo(() => getPhoneGeometry(object), [object]);
  const [screenPlacement, setScreenPlacement] = useState<ScreenPlacement | null>(
    null,
  );

  useLayoutEffect(() => {
    object.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = new MeshStandardMaterial({
        color: "#0a0c10",
        metalness: 0.72,
        roughness: 0.32,
        emissive: "#030405",
        emissiveIntensity: 0.06,
        side: DoubleSide,
      });
    });

    object.updateMatrixWorld(true);
  }, [object]);

  const placeScreen = () => {
    if (!phoneGeometry) return;

    const img = screenTexture.image as HTMLImageElement | undefined;
    if (!img?.width || !img?.height) return;

    setScreenPlacement(computeScreenPlacement(phoneGeometry));
  };

  useEffect(() => {
    placeScreen();

    const img = screenTexture.image as HTMLImageElement | undefined;
    if (img && !img.complete) {
      img.addEventListener("load", placeScreen);
      return () => img.removeEventListener("load", placeScreen);
    }
  }, [phoneGeometry, screenTexture]);

  useFrame(() => {
    if (screenPlacement) return;
    placeScreen();
  });

  return (
    <group scale={PHONE_SCALE}>
      <primitive object={object} />
      {screenPlacement && (
        <PhoneScreen
          placement={screenPlacement}
          screenTexture={screenTexture}
        />
      )}
    </group>
  );
}

function PhoneModel({
  rotationY,
  targetRotationY,
  isDragging,
}: {
  rotationY: MutableRefObject<number>;
  targetRotationY: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
}) {
  const spinRef = useRef<Group>(null);
  const swayPhase = useRef(0);

  useFrame((_, delta) => {
    if (!spinRef.current) return;

    let goal = targetRotationY.current;

    if (!isDragging.current) {
      swayPhase.current += delta * SWAY_SPEED;
      const sway = Math.sin(swayPhase.current) * SWAY_AMPLITUDE;
      goal = clampRotation(targetRotationY.current + sway);
    }

    const lerpSpeed = isDragging.current
      ? ROTATION_LERP_DRAG
      : ROTATION_LERP_IDLE;
    const t = Math.min(1, delta * lerpSpeed);
    rotationY.current += (goal - rotationY.current) * t;
    spinRef.current.rotation.y = rotationY.current;
  });

  return (
    <group ref={spinRef}>
      <group rotation={PHONE_UPRIGHT_ROTATION}>
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0}>
          <Center>
            <PhoneAssembly />
          </Center>
        </Float>
      </group>
    </group>
  );
}

type PhoneModel3DProps = {
  className?: string;
};

export function PhoneModel3D({ className = "" }: PhoneModel3DProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationY = useRef(FRONT_FACING_Y);
  const targetRotationY = useRef(FRONT_FACING_Y);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const applyRotationDelta = (delta: number) => {
    targetRotationY.current = clampRotation(targetRotationY.current + delta);
  };

  useEffect(() => {
    if (!mounted) return;

    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetRotationY.current = clampRotation(
        targetRotationY.current + event.deltaY * WHEEL_SENSITIVITY,
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mounted]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPointerX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const deltaX = event.clientX - lastPointerX.current;
    lastPointerX.current = event.clientX;
    applyRotationDelta(deltaX * DRAG_SENSITIVITY);
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
      <div
        className={`flex h-full min-h-[320px] w-full items-center justify-center ${className}`}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C79D6D]/80 border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.02, 2.98], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.75]}
          className="h-full w-full"
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[3, 8, 6]}
            intensity={0.95}
            color="#ffffff"
          />
          <directionalLight
            position={[-4, 2, 3]}
            intensity={0.25}
            color="#93c5fd"
          />
          <pointLight
            position={[-2.5, 1, 4]}
            intensity={0.65}
            color="#C79D6D"
          />
          <pointLight position={[2.5, 0, 3]} intensity={0.3} color="#22d3ee" />
          <spotLight
            position={[0, 4, 5]}
            intensity={0.5}
            angle={0.35}
            penumbra={0.9}
            color="#ffffff"
          />

          <Suspense fallback={<Loader />}>
            <Bounds fit margin={0.88}>
              <PhoneModel
                rotationY={rotationY}
                targetRotationY={targetRotationY}
                isDragging={isDragging}
              />
            </Bounds>
            <ContactShadows
              position={[0, -1.08, 0]}
              opacity={0.45}
              scale={4.5}
              blur={2.2}
              far={1.8}
              color="#0ea5e9"
            />
            <Environment preset="studio" environmentIntensity={0.4} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

useLoader.preload(OBJLoader, PHONE_MODEL_PATH);
useTexture.preload(PHONE_SCREEN_IMAGE);
