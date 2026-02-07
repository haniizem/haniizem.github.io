"""
Batch upscale frames using Finegrain Image Enhancer on Hugging Face
With SSL verification disabled for corporate networks
"""
import os
import ssl
from pathlib import Path

# Disable SSL verification for corporate proxies BEFORE importing gradio
os.environ['CURL_CA_BUNDLE'] = ''
os.environ['REQUESTS_CA_BUNDLE'] = ''
os.environ['HF_HUB_DISABLE_SSL_VERIFICATION'] = '1'
os.environ['GRADIO_ANALYTICS_ENABLED'] = 'False'

# Monkey-patch SSL
ssl._create_default_https_context = ssl._create_unverified_context

import warnings
warnings.filterwarnings('ignore')

import httpx
# Monkey-patch httpx to disable SSL verification
_original_client_init = httpx.Client.__init__
def _patched_client_init(self, *args, **kwargs):
    kwargs['verify'] = False
    return _original_client_init(self, *args, **kwargs)
httpx.Client.__init__ = _patched_client_init

_original_async_client_init = httpx.AsyncClient.__init__
def _patched_async_client_init(self, *args, **kwargs):
    kwargs['verify'] = False
    return _original_async_client_init(self, *args, **kwargs)
httpx.AsyncClient.__init__ = _patched_async_client_init

from gradio_client import Client, handle_file

# Configuration
INPUT_DIR = Path("public/frames")
OUTPUT_DIR = Path("public/frames_finegrain")
SPACE_NAME = "finegrain/finegrain-image-enhancer"

def main():
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Connect to Finegrain Space
    print(f"Connecting to {SPACE_NAME}...")
    client = Client(SPACE_NAME)
    
    # Get list of input frames
    frames = sorted(INPUT_DIR.glob("*.jpg"))
    total = len(frames)
    print(f"Found {total} frames to process")
    
    for i, frame_path in enumerate(frames):
        output_path = OUTPUT_DIR / frame_path.name
        
        # Skip if already processed
        if output_path.exists():
            print(f"[{i+1}/{total}] Skipping {frame_path.name} (already exists)")
            continue
        
        print(f"[{i+1}/{total}] Processing {frame_path.name}...")
        
        try:
            # Call the Finegrain API
            result = client.predict(
                input_image=handle_file(str(frame_path)),
                prompt="",
                negative_prompt="",
                seed=42,
                upscale_factor=4,
                controlnet_scale=0.6,
                controlnet_decay=1.0,
                condition_scale=6,
                tile_width=112,
                tile_height=144,
                denoise_strength=0.35,
                num_inference_steps=18,
                solver="DDIM",
                api_name="/process"
            )
            
            # Copy result to output directory
            if result:
                import shutil
                shutil.copy(result, output_path)
                print(f"  Saved to {output_path}")
            
        except Exception as e:
            print(f"  Error: {e}")
            continue
    
    print(f"\nDone! Processed frames saved to {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
