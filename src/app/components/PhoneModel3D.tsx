"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bounds, Center, Html, useProgress, useTexture } from "@react-three/drei";
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
import {
  PHONE_MODEL_PATH,
  PHONE_SCREEN_IMAGE,
} from "../lib/phoneModelAssets";

const DRAG_SENSITIVITY = 0.028;
const WHEEL_SENSITIVITY = 0.009;
const ROTATION_LERP_DRAG = 22;
const AUTO_SPIN_SPEED = (2 * Math.PI) / 14;
const FRONT_FACING_Y = Math.PI;
const PHONE_UPRIGHT_ROTATION: [number, number, number] = [
  Math.PI / 2,
  0,
  Math.PI,
];
const PHONE_SCALE = 1.88;
const SCREEN_INSET_X = 0.975;
const SCREEN_TOP_INSET_RATIO = 0.034;
const SCREEN_BOTTOM_INSET_RATIO = 0.062;
const SCREEN_FILL_SCALE = 0.94;
const SCREEN_SURFACE_OFFSET = 0.003;
const TAP_MOVE_THRESHOLD_PX = 10;

const PHONE_BODY_MATERIAL = new MeshStandardMaterial({
  color: "#0a0c10",
  metalness: 0.72,
  roughness: 0.32,
  emissive: "#030405",
  emissiveIntensity: 0.06,
  side: DoubleSide,
});

type ScreenPlacement = {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
};

function prepareScreenTexture(texture: Texture) {
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.offset.set(0, 0);
  texture.center.set(0.5, 0.5);
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
  imageWidth: number,
  imageHeight: number,
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

  const topInset = size.z * SCREEN_TOP_INSET_RATIO;
  const bottomInset = size.z * SCREEN_BOTTOM_INSET_RATIO;
  const maxW = size.x * SCREEN_INSET_X;
  const maxH = size.z - topInset - bottomInset;
  const imageAspect = imageWidth / imageHeight;

  let planeW = maxW;
  let planeH = maxW / imageAspect;

  if (planeH < maxH) {
    planeH = maxH;
    planeW = maxH * imageAspect;
  }

  planeW *= SCREEN_FILL_SCALE;
  planeH *= SCREEN_FILL_SCALE;

  const screenCenterZ = box.max.z - topInset - maxH / 2;

  return {
    position: [center.x, box.max.y + SCREEN_SURFACE_OFFSET, screenCenterZ],
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
  }, [screenTexture]);

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
  const screenPlacement = useMemo(() => {
    if (!phoneGeometry) return null;
    const img = screenTexture.image as HTMLImageElement | undefined;
    if (!img?.width || !img?.height) return null;
    return computeScreenPlacement(phoneGeometry, img.width, img.height);
  }, [phoneGeometry, screenTexture]);

  useLayoutEffect(() => {
    object.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.material = PHONE_BODY_MATERIAL;
    });
    object.updateMatrixWorld(true);
  }, [object]);

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

  useFrame((_, delta) => {
    if (!spinRef.current) return;

    if (isDragging.current) {
      const t = Math.min(1, delta * ROTATION_LERP_DRAG);
      rotationY.current +=
        (targetRotationY.current - rotationY.current) * t;
    } else {
      rotationY.current += delta * AUTO_SPIN_SPEED;
      targetRotationY.current = rotationY.current;
    }

    spinRef.current.rotation.y = rotationY.current;
  });

  return (
    <group ref={spinRef}>
      <group rotation={PHONE_UPRIGHT_ROTATION}>
        <Center>
          <PhoneAssembly />
        </Center>
      </group>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 8, 6]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-2.5, 1, 4]} intensity={0.5} color="#C79D6D" />
    </>
  );
}

type PhoneModel3DProps = {
  className?: string;
  onPhoneClick?: () => void;
};

export function PhoneModel3D({
  className = "",
  onPhoneClick,
}: PhoneModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const rotationY = useRef(FRONT_FACING_Y);
  const targetRotationY = useRef(FRONT_FACING_Y);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const didDrag = useRef(false);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (node) setCanvasReady(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetRotationY.current += event.deltaY * WHEEL_SENSITIVITY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [canvasReady]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    didDrag.current = false;
    lastPointerX.current = event.clientX;
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const deltaFromStartX = event.clientX - pointerStartX.current;
    const deltaFromStartY = event.clientY - pointerStartY.current;
    if (Math.hypot(deltaFromStartX, deltaFromStartY) > TAP_MOVE_THRESHOLD_PX) {
      didDrag.current = true;
    }

    const deltaX = event.clientX - lastPointerX.current;
    lastPointerX.current = event.clientX;
    targetRotationY.current += deltaX * DRAG_SENSITIVITY;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const moved = Math.hypot(
      event.clientX - pointerStartX.current,
      event.clientY - pointerStartY.current,
    );

    isDragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!didDrag.current && moved < TAP_MOVE_THRESHOLD_PX) {
      onPhoneClick?.();
    }
  };

  const showCanvas = canvasReady;

  return (
    <div
      ref={setContainerRef}
      className={`relative h-full w-full cursor-pointer touch-pan-y active:cursor-grabbing ${className}`}
      aria-label="Tap to call Addis Reality"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="absolute inset-x-0 top-0 bottom-[-28px] sm:bottom-[-32px]">
        {!showCanvas ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C79D6D]/80 border-t-transparent" />
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0.12, 3.22], fov: 30 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.25]}
            frameloop="always"
            className="h-full w-full"
            style={{ pointerEvents: "none" }}
          >
            <SceneLights />
            <Suspense fallback={<Loader />}>
              <Bounds fit margin={1.05}>
                <PhoneModel
                  rotationY={rotationY}
                  targetRotationY={targetRotationY}
                  isDragging={isDragging}
                />
              </Bounds>
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  );
}

useLoader.preload(OBJLoader, PHONE_MODEL_PATH);
useTexture.preload(PHONE_SCREEN_IMAGE);
