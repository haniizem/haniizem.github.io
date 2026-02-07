import { useRef, useEffect, useState, useCallback } from 'react';

// Configuration
const TOTAL_FRAMES = 240;
const FRAME_PATH = '/frames_esrgan/ezgif-frame-';
const LERP_FACTOR = 0.25; // Higher = more responsive, smoother
const BATCH_SIZE = 20; // Load frames in batches for faster initial display

// Generate frame path with zero-padded index
const getFramePath = (index: number): string => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `${FRAME_PATH}${frameNumber}.jpg`;
};

export function TrainBackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isInitialLoaded, setIsInitialLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const animationRef = useRef<number>();

    // Preload frames with priority loading (first frames load first)
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

        // Priority order: load first 30 frames immediately, then rest
        const priorityFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        const remainingFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(i => i >= 30);
        const loadOrder = [...priorityFrames, ...remainingFrames];

        const loadFrame = (index: number) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = getFramePath(index);
                img.onload = () => {
                    images[index] = img;
                    loadedCount++;
                    setLoadProgress(loadedCount);

                    // Show content once first 30 frames are loaded
                    if (loadedCount >= 30 && !isInitialLoaded) {
                        imagesRef.current = images;
                        setIsInitialLoaded(true);
                    }
                    resolve();
                };
                img.onerror = () => {
                    loadedCount++;
                    setLoadProgress(loadedCount);
                    resolve();
                };
            });
        };

        // Load priority frames first (in parallel batches)
        const loadBatch = async (startIdx: number) => {
            const batch = loadOrder.slice(startIdx, startIdx + BATCH_SIZE);
            await Promise.all(batch.map(frameIdx => loadFrame(frameIdx)));

            if (startIdx + BATCH_SIZE < loadOrder.length) {
                // Small delay between batches to not block the main thread
                setTimeout(() => loadBatch(startIdx + BATCH_SIZE), 10);
            } else {
                // All frames loaded
                imagesRef.current = images;
            }
        };

        loadBatch(0);
    }, [isInitialLoaded]);

    // Draw frame function
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const images = imagesRef.current;
        const imgIndex = Math.round(frameIndex);
        const img = images[imgIndex];
        if (!img || !img.complete) return;

        // Get device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;

        // Set canvas size accounting for DPR (high resolution rendering)
        const canvasWidth = displayWidth * dpr;
        const canvasHeight = displayHeight * dpr;

        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.scale(dpr, dpr);
        }

        // Calculate object-fit: cover dimensions
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = displayWidth / displayHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = displayHeight;
            drawWidth = displayHeight * imgRatio;
            offsetX = (displayWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = displayWidth;
            drawHeight = displayWidth / imgRatio;
            offsetX = 0;
            offsetY = (displayHeight - drawHeight) / 2;
        }

        // Clear canvas
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        // High quality rendering with sharpening
        ctx.imageSmoothingEnabled = false; // Disable smoothing for sharper edges

        // Apply enhancement: slight contrast and sharpness boost
        ctx.filter = 'contrast(1.08) brightness(1.02)';

        // Draw the frame with enhancements
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Reset filter for overlay
        ctx.filter = 'none';

        // Add lighter overlay for better text readability
        const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
        gradient.addColorStop(0, 'rgba(5, 2, 10, 0.45)');
        gradient.addColorStop(0.3, 'rgba(8, 4, 16, 0.35)');
        gradient.addColorStop(0.7, 'rgba(8, 4, 16, 0.35)');
        gradient.addColorStop(1, 'rgba(5, 2, 10, 0.5)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
    }, []);

    // Smooth animation loop
    useEffect(() => {
        if (!isInitialLoaded) return;

        drawFrame(0);

        const animate = () => {
            // Smooth interpolation between current and target frame
            const diff = targetFrameRef.current - currentFrameRef.current;

            if (Math.abs(diff) > 0.1) {
                currentFrameRef.current += diff * LERP_FACTOR;
                drawFrame(currentFrameRef.current);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
            targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
        };

        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };

        // Start animation loop
        animationRef.current = requestAnimationFrame(animate);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isInitialLoaded, drawFrame]);

    return (
        <>
            {/* Loading indicator */}
            {!isInitialLoaded && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'linear-gradient(135deg, #0a0510 0%, #1a1025 100%)',
                        zIndex: -1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        Loading... {Math.round((loadProgress / 30) * 100)}%
                    </div>
                </div>
            )}

            {/* Canvas background */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none',
                    display: isInitialLoaded ? 'block' : 'none',
                }}
            />
        </>
    );
}
