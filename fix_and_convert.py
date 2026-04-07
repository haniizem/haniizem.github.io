"""
Fix frames: 
1. Remove ghost artifact from train cabin window by darkening that area
2. Reconvert to high-quality WebP (quality=95, no resize)
"""
from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw
import os
import numpy as np

INPUT_DIR = Path(r"c:\Users\529495\Desktop\CV\PORTFOLIO\enhanced_frames")
OUTPUT_DIR = Path(r"c:\Users\529495\Desktop\CV\PORTFOLIO\hani-portfolio\public\frames_webp")
OUTPUT_DIR.mkdir(exist_ok=True)

QUALITY = 95  # Much higher quality - minimal compression artifacts

frames = sorted(INPUT_DIR.glob("*.jpg"))
print(f"Processing {len(frames)} frames at quality={QUALITY}...")

total_original = 0
total_webp = 0

for i, f in enumerate(frames):
    img = Image.open(f)
    img_array = np.array(img)
    
    # Fix ghost artifact in the train cabin window area
    # The cabin window is roughly in the top-left area of the frame
    # We'll detect unusually bright/skin-tone pixels in that region and darken them
    h, w = img_array.shape[:2]
    
    # Define the cabin window region (approximate based on frame layout)
    # Window area: roughly x=50-200, y=30-200 (varies by frame)
    window_x1 = int(w * 0.04)   # ~47px
    window_x2 = int(w * 0.18)   # ~212px  
    window_y1 = int(h * 0.02)   # ~13px
    window_y2 = int(h * 0.35)   # ~232px
    
    # Extract the window region
    window_region = img_array[window_y1:window_y2, window_x1:window_x2].copy()
    
    # Detect skin-tone / ghostly pixels (warm colors that shouldn't be there)
    # In a train window at night, most pixels should be dark blue/purple
    r, g, b = window_region[:,:,0], window_region[:,:,1], window_region[:,:,2]
    
    # Ghost pixels tend to have: higher red, skin-like warm tones
    # Detect pixels that are too warm/bright for a dark train window
    brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3
    warmth = r.astype(float) - b.astype(float)  # Positive = warm
    
    # Ghost mask: pixels that are warm (reddish) AND reasonably bright
    ghost_mask = (warmth > 15) & (brightness > 60) & (brightness < 200)
    
    if ghost_mask.any():
        ghost_count = ghost_mask.sum()
        if ghost_count > 50:  # Only fix if there's a significant ghost presence
            # Darken the ghost pixels to match surrounding dark window tones
            # Get average dark tone from non-ghost pixels in the region
            non_ghost = ~ghost_mask
            if non_ghost.any():
                avg_r = int(np.mean(r[non_ghost]))
                avg_g = int(np.mean(g[non_ghost]))
                avg_b = int(np.mean(b[non_ghost]))
            else:
                avg_r, avg_g, avg_b = 30, 20, 35  # Dark purple fallback
            
            # Blend ghost pixels toward the average dark color
            blend_factor = 0.7  # How much to push toward dark (0=keep, 1=full dark)
            window_region[ghost_mask, 0] = np.clip(
                r[ghost_mask] * (1 - blend_factor) + avg_r * blend_factor, 0, 255
            ).astype(np.uint8)
            window_region[ghost_mask, 1] = np.clip(
                g[ghost_mask] * (1 - blend_factor) + avg_g * blend_factor, 0, 255
            ).astype(np.uint8)
            window_region[ghost_mask, 2] = np.clip(
                b[ghost_mask] * (1 - blend_factor) + avg_b * blend_factor, 0, 255
            ).astype(np.uint8)
            
            # Apply the fix
            img_array[window_y1:window_y2, window_x1:window_x2] = window_region
            
            if (i + 1) % 20 == 0 or ghost_count > 500:
                print(f"  [{i+1}] Fixed {ghost_count} ghost pixels")
    
    # Convert back to PIL and save as high-quality WebP
    img_fixed = Image.fromarray(img_array)
    
    out = OUTPUT_DIR / f.with_suffix('.webp').name
    img_fixed.save(out, 'WebP', quality=QUALITY, method=6)
    
    orig_size = os.path.getsize(f)
    webp_size = os.path.getsize(out)
    total_original += orig_size
    total_webp += webp_size
    
    if (i + 1) % 40 == 0 or i == 0:
        print(f"  [{i+1}/{len(frames)}] {f.name} -> {webp_size/1024:.0f}KB (was {orig_size/1024:.0f}KB)")

print(f"\nDone!")
print(f"Original total: {total_original/1024/1024:.1f} MB")
print(f"WebP total:     {total_webp/1024/1024:.1f} MB")
print(f"Quality:        {QUALITY} (near-lossless)")
