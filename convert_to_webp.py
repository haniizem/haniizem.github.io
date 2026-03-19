"""Convert enhanced frames to WebP for much faster web loading"""
from pathlib import Path
from PIL import Image
import os

INPUT_DIR = Path("public/frames_enhanced")
OUTPUT_DIR = Path("public/frames_webp")
OUTPUT_DIR.mkdir(exist_ok=True)

QUALITY = 82  # Good balance between quality and file size

frames = sorted(INPUT_DIR.glob("*.jpg"))
print(f"Converting {len(frames)} frames to WebP (quality={QUALITY})...")

total_original = 0
total_webp = 0

for i, f in enumerate(frames):
    out = OUTPUT_DIR / f.with_suffix('.webp').name
    img = Image.open(f)
    # Resize to 1920x1080 max for web (no need for 4K on most screens)
    if img.width > 1920:
        ratio = 1920 / img.width
        new_size = (1920, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    img.save(out, 'WebP', quality=QUALITY, method=6)
    
    orig_size = os.path.getsize(f)
    webp_size = os.path.getsize(out)
    total_original += orig_size
    total_webp += webp_size
    
    if (i + 1) % 20 == 0 or i == 0:
        print(f"  [{i+1}/{len(frames)}] {f.name} -> {webp_size/1024:.0f}KB (was {orig_size/1024:.0f}KB)")

print(f"\nDone!")
print(f"Original total: {total_original/1024/1024:.1f} MB")
print(f"WebP total:     {total_webp/1024/1024:.1f} MB")
print(f"Savings:        {(1 - total_webp/total_original)*100:.0f}%")
