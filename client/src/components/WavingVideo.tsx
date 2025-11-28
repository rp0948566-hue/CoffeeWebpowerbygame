import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useVideoTexture } from '@react-three/drei';
import * as THREE from 'three';

interface WavingVideoProps {
  videoUrl: string;
  isPlaying?: boolean;
  onReady?: () => void;
}

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // The "Cloth/Flag" Wave Math - creates realistic fabric wave
    float wave1 = sin(pos.x * 2.0 + uTime * 2.5) * uAmplitude;
    float wave2 = cos(pos.x * 1.5 + uTime * 1.8) * (uAmplitude * 0.6);
    float wave3 = sin(pos.y * 1.2 + uTime * 2.0) * (uAmplitude * 0.3);
    
    // Combine waves for cloth-like movement
    pos.z += wave1 + wave2;
    pos.y += cos(pos.x * 2.0 + uTime * 2.0) * (uAmplitude * 0.4);
    pos.z += wave3;
    
    // Subtle mouse tilt effect
    pos.z += uMouse.x * 0.3 * (1.0 - abs(uv.x - 0.5) * 2.0);
    pos.z += uMouse.y * 0.2 * (1.0 - abs(uv.y - 0.5) * 2.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
  }
`;

export function WavingVideo({ videoUrl, isPlaying = true, onReady }: WavingVideoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, mouse } = useThree();
  
  const [amplitude, setAmplitude] = useState(1.5); // Start with high amplitude (wild waving)
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const targetAmplitude = useRef(1.5);
  const timeRef = useRef(0);
  
  // Load video texture
  const texture = useVideoTexture(videoUrl, {
    crossOrigin: 'anonymous',
    muted: false,
    loop: true,
    start: isPlaying,
  });

  // Notify when texture is ready
  useEffect(() => {
    if (texture && onReady) {
      onReady();
    }
  }, [texture, onReady]);

  // Create shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 1.5 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTexture: { value: texture },
      uOpacity: { value: 0 },
    }),
    [texture]
  );

  // Entry animation - calm down from wild waving to stable
  useEffect(() => {
    // Fade in
    const fadeIn = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // Start calming down after 500ms
    const calmDown = setTimeout(() => {
      targetAmplitude.current = 0;
    }, 800);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(calmDown);
    };
  }, []);

  // Handle hover - gentle wave restart
  useEffect(() => {
    if (isHovered) {
      targetAmplitude.current = 0.15;
    } else {
      targetAmplitude.current = 0;
    }
  }, [isHovered]);

  // Animation loop
  useFrame((state, delta) => {
    timeRef.current += delta;
    
    // Smooth amplitude transition (damping)
    const dampingFactor = 0.03;
    setAmplitude((prev) => {
      const diff = targetAmplitude.current - prev;
      return prev + diff * dampingFactor;
    });

    // Update shader uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uAmplitude.value = amplitude;
      materialRef.current.uniforms.uMouse.value.set(mouse.x * 0.5, mouse.y * 0.5);
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  // Calculate responsive size (16:9 aspect ratio)
  const scale = Math.min(viewport.width * 0.8, viewport.height * 0.8);
  const width = scale * 1.2;
  const height = (scale * 1.2) * (9 / 16);

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      scale={[1, 1, 1]}
    >
      <planeGeometry args={[width, height, 64, 36]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function WavingVideoFallback() {
  return (
    <mesh>
      <planeGeometry args={[8, 4.5, 1, 1]} />
      <meshBasicMaterial color="#1a1a2e" opacity={0.8} transparent />
    </mesh>
  );
}
