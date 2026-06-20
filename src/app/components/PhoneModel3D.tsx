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
import { Bounds, Center, useTexture } from "@react-three/drei";
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
import { use3DProfile } from "../hooks/use3DProfile";
import { useIntersectionVisible } from "../hooks/useIntersectionVisible";
import { Model3DErrorBoundary } from "./Model3DErrorBoundary";
import { Model3DFallback, Model3DSpinner } from "./Model3DFallback";

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
const LOAD_TIMEOUT_MS = 22000;

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

function PhoneAssembly({ onReady }: { onReady: () => void }) {
  const object = useLoader(OBJLoader, PHONE_MODEL_PATH);
  const screenTexture = useTexture(PHONE_SCREEN_IMAGE);
  const phoneGeometry = useMemo(() => getPhoneGeometry(object), [object]);
  const screenPlacement = useMemo(() => {
    if (!phoneGeometry) return null;
    const img = screenTexture.image as HTMLImageElement | undefined;
    if (!img?.width || !img?.height) return null;
    return computeScreenPlacement(phoneGeometry, img.width, img.height);
  }, [phoneGeometry, screenTexture]);
  const readyRef = useRef(false);

  useLayoutEffect(() => {
    object.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.material = PHONE_BODY_MATERIAL;
    });
    object.updateMatrixWorld(true);

    if (!readyRef.current) {
      readyRef.current = true;
      onReady();
    }
  }, [object, onReady]);

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
  onReady,
}: {
  rotationY: MutableRefObject<number>;
  targetRotationY: MutableRefObject<number>;
  isDragging: MutableRefObject<boolean>;
  onReady: () => void;
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
          <PhoneAssembly onReady={onReady} />
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
  const profile = use3DProfile();
  const { ref: visibilityRef, visible } = useIntersectionVisible("120px 0px");
  const [contextLost, setContextLost] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const hasEverLoadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationY = useRef(FRONT_FACING_Y);
  const targetRotationY = useRef(FRONT_FACING_Y);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const didDrag = useRef(false);

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      visibilityRef(node);
    },
    [visibilityRef],
  );

  const handleModelReady = useCallback(() => {
    hasEverLoadedRef.current = true;
    setModelReady(true);
    setLoadTimedOut(false);
    setContextLost(false);
  }, []);

  useEffect(() => {
    if (!visible || modelReady || hasEverLoadedRef.current) return;

    const timer = window.setTimeout(() => {
      if (!hasEverLoadedRef.current) {
        setLoadTimedOut(true);
      }
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [visible, modelReady]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !visible) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetRotationY.current += event.deltaY * WHEEL_SENSITIVITY;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [visible]);

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

  const showFallback =
    !profile ||
    !profile.supported ||
    ((contextLost || loadTimedOut) && !hasEverLoadedRef.current);

  const fallback = (
    <Model3DFallback
      src={PHONE_SCREEN_IMAGE}
      alt="Addis Reality digital marketing phone preview"
      label="Phone marketing preview"
    />
  );

  return (
    <div
      ref={setContainerRef}
      className={`relative min-h-[320px] w-full cursor-pointer touch-pan-y active:cursor-grabbing ${className}`}
      aria-label="Tap to call Addis Reality"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="absolute inset-x-0 top-0 bottom-[-28px] min-h-[320px] sm:bottom-[-32px] sm:min-h-[360px]">
        {!profile ? (
          <Model3DSpinner label="Preparing 3D viewer…" />
        ) : showFallback ? (
          fallback
        ) : (
          <Model3DErrorBoundary
            fallback={fallback}
            onError={() => setContextLost(true)}
          >
            <div className="relative h-full w-full min-h-[320px] sm:min-h-[360px]">
              {!modelReady && (
                <div className="absolute inset-0 z-10">
                  <Model3DSpinner label="Loading device…" />
                </div>
              )}

              <Canvas
                  key={canvasKey}
                  camera={{ position: [0, 0.12, 3.22], fov: 30 }}
                  gl={{
                    antialias: profile.antialias,
                    alpha: true,
                    powerPreference: profile.isMobile
                      ? "default"
                      : "high-performance",
                    failIfMajorPerformanceCaveat: false,
                    preserveDrawingBuffer: false,
                  }}
                  dpr={profile.dpr}
                  frameloop={visible ? "always" : "never"}
                  className="!absolute inset-0 h-full w-full"
                  style={{ touchAction: "pan-y", pointerEvents: "none" }}
                  onCreated={({ gl }) => {
                    const canvas = gl.domElement;
                    const onLost = (event: Event) => {
                      event.preventDefault();
                      if (hasEverLoadedRef.current) {
                        setModelReady(false);
                        window.setTimeout(() => {
                          setCanvasKey((key) => key + 1);
                        }, 100);
                      } else {
                        setContextLost(true);
                      }
                    };
                    const onRestored = () => {
                      setContextLost(false);
                    };
                    canvas.addEventListener("webglcontextlost", onLost, false);
                    canvas.addEventListener(
                      "webglcontextrestored",
                      onRestored,
                      false,
                    );
                  }}
                >
                  <SceneLights />
                  <Suspense fallback={null}>
                    <Bounds fit margin={1.05}>
                      <PhoneModel
                        rotationY={rotationY}
                        targetRotationY={targetRotationY}
                        isDragging={isDragging}
                        onReady={handleModelReady}
                      />
                    </Bounds>
                  </Suspense>
                </Canvas>
            </div>
          </Model3DErrorBoundary>
        )}
      </div>
    </div>
  );
}

useLoader.preload(OBJLoader, PHONE_MODEL_PATH);
useTexture.preload(PHONE_SCREEN_IMAGE);
