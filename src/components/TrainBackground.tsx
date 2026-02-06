import { useRef, useEffect, useState, useCallback } from 'react';

// Total frames
const TOTAL_FRAMES = 240;
const FRAME_PATH = '/frames/ezgif-frame-';

// Generate frame paths
const getFramePath = (index: number): string => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `${FRAME_PATH}${frameNumber}.jpg`;
};

interface TrainBackgroundProps {
    children: React.ReactNode;
}

export function TrainBackground({ children }: TrainBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 1180, height: 670 });
    const [currentFrame, setCurrentFrame] = useState(0);

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = [];

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        setLoadProgress((prev) => Math.min(prev + 1, TOTAL_FRAMES));
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = getFramePath(i);
                });
                imagePromises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);

                if (loadedImages[0]) {
                    setCanvasSize({
                        width: loadedImages[0].naturalWidth,
                        height: loadedImages[0].naturalHeight,
                    });
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading frames:', error);
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    // Draw frame to canvas
    const drawFrame = useCallback(
        (frameIndex: number) => {
            if (!canvasRef.current || images.length === 0) return;

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            const img = images[frameIndex];
            if (img) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        },
        [images]
    );

    // Scroll handler to update frame based on scroll position
    useEffect(() => {
        if (images.length === 0) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(scrollTop / docHeight, 1);

            const frameIndex = Math.min(
                Math.floor(scrollProgress * (TOTAL_FRAMES - 1)),
                TOTAL_FRAMES - 1
            );

            setCurrentFrame(frameIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [images]);

    // Draw current frame when it changes
    useEffect(() => {
        drawFrame(currentFrame);
    }, [currentFrame, drawFrame]);

    // Draw initial frame
    useEffect(() => {
        if (images.length > 0) {
            drawFrame(0);
        }
    }, [images, drawFrame]);

    return (
        <div ref={containerRef} className="relative">
            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-base">
                    <div className="relative mb-8">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-2 border-accent-primary/20" />
                            <div
                                className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-primary"
                                style={{ animation: 'spin 1s linear infinite' }}
                            />
                            <div className="absolute inset-4 flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-accent-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-100"
                            style={{ width: `${(loadProgress / TOTAL_FRAMES) * 100}%` }}
                        />
                    </div>

                    <p className="mt-4 text-text-secondary text-sm font-light tracking-wider">
                        Loading experience... {Math.round((loadProgress / TOTAL_FRAMES) * 100)}%
                    </p>
                </div>
            )}

            {/* Fixed Canvas Background */}
            <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="w-full h-full object-cover"
                    style={{
                        opacity: isLoading ? 0 : 0.5,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background-base/70 via-background-base/50 to-background-base/80" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
