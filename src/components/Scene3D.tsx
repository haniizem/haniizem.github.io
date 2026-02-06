import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Tunnel ring geometry
function TunnelRing({ z, opacity }: { z: number; opacity: number }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.z += 0.002;
        }
    });

    return (
        <mesh ref={ref} position={[0, 0, z]}>
            <torusGeometry args={[15, 0.1, 8, 64]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={opacity * 0.6} />
        </mesh>
    );
}

// Tech tunnel with rings
function TechTunnel({ scrollProgress }: { scrollProgress: number }) {
    const rings = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => ({
            z: -i * 20 - 50,
            opacity: 1 - (i / 30) * 0.7,
        }));
    }, []);

    return (
        <group position={[0, 0, scrollProgress * 200]}>
            {rings.map((ring, i) => (
                <TunnelRing key={i} z={ring.z} opacity={ring.opacity} />
            ))}
        </group>
    );
}

// Stylized futuristic train
function FuturisticTrain({ scrollProgress }: { scrollProgress: number }) {
    const trainRef = useRef<THREE.Group>(null);
    const headlightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (trainRef.current) {
            // Subtle floating motion
            trainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            trainRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
        }
        if (headlightRef.current) {
            headlightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        }
    });

    const trainZ = -30 + scrollProgress * 50;

    return (
        <group ref={trainRef} position={[0, -2, trainZ]} rotation={[0, 0, 0]}>
            {/* Main body - sleek futuristic shape */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1.5, 2, 12, 8, 1, false]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Front nose cone */}
            <mesh position={[0, 0, 7]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[1.5, 4, 8]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Glowing accent lines */}
            <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[0.1, 0.1, 14]} />
                <meshBasicMaterial color="#8b5cf6" />
            </mesh>
            <mesh position={[1.5, 0.5, 0]}>
                <boxGeometry args={[0.1, 0.1, 14]} />
                <meshBasicMaterial color="#ec4899" />
            </mesh>
            <mesh position={[-1.5, 0.5, 0]}>
                <boxGeometry args={[0.1, 0.1, 14]} />
                <meshBasicMaterial color="#ec4899" />
            </mesh>

            {/* Windows */}
            {[-3, 0, 3].map((zPos, i) => (
                <mesh key={i} position={[1.6, 0.5, zPos]}>
                    <boxGeometry args={[0.1, 0.8, 1.5]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} />
                </mesh>
            ))}

            {/* Headlight */}
            <pointLight
                ref={headlightRef}
                position={[0, 0, 9]}
                color="#ffffff"
                intensity={2}
                distance={30}
            />

            {/* Engine glow */}
            <pointLight
                position={[0, 0, -6]}
                color="#ec4899"
                intensity={3}
                distance={15}
            />
        </group>
    );
}

// Floating particles 
function ParticleField({ count = 500, scrollProgress }: { count?: number; scrollProgress: number }) {
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 400 - 200;
        }
        return pos;
    }, [count]);

    useFrame(() => {
        if (points.current) {
            points.current.rotation.y += 0.0002;
            points.current.position.z = scrollProgress * 200;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.3}
                color="#8b5cf6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Floating content panel in 3D space
function FloatingPanel({
    position,
    rotation = [0, 0, 0],
    children,
    visible = true
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    children: React.ReactNode;
    visible?: boolean;
}) {
    if (!visible) return null;

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={position} rotation={rotation as any}>
                {/* Glass panel background */}
                <mesh>
                    <planeGeometry args={[8, 5]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        transparent
                        opacity={0.85}
                        metalness={0.5}
                        roughness={0.3}
                    />
                </mesh>
                {/* Glowing border */}
                <lineSegments position={[0, 0, 0.01]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(8, 5)]} />
                    <lineBasicMaterial color="#8b5cf6" />
                </lineSegments>
            </group>
        </Float>
    );
}

// Camera controller that follows scroll
function CameraController({ scrollProgress }: { scrollProgress: number }) {
    const { camera } = useThree();

    useFrame(() => {
        // Camera path through the tunnel
        const targetZ = 20 - scrollProgress * 250;
        const targetY = 2 + Math.sin(scrollProgress * Math.PI * 2) * 3;

        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
        camera.lookAt(0, 0, camera.position.z - 30);
    });

    return null;
}

// Main 3D Scene
interface Scene3DProps {
    scrollProgress: number;
}

export function Scene3D({ scrollProgress }: Scene3DProps) {
    return (
        <Canvas
            camera={{ position: [0, 2, 20], fov: 75 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}
            gl={{ antialias: true, alpha: true }}
        >
            {/* Ambient lighting */}
            <ambientLight intensity={0.2} />

            {/* Main purple accent light */}
            <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={0.8} />

            {/* Background stars */}
            <Stars radius={100} depth={50} count={2000} factor={4} fade speed={0.5} />

            {/* Tech tunnel */}
            <TechTunnel scrollProgress={scrollProgress} />

            {/* Futuristic train */}
            <FuturisticTrain scrollProgress={scrollProgress} />

            {/* Particle atmosphere */}
            <ParticleField scrollProgress={scrollProgress} />

            {/* Camera animation */}
            <CameraController scrollProgress={scrollProgress} />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a0a', 30, 150]} />
        </Canvas>
    );
}

export default Scene3D;
