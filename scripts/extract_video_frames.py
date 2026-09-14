"""
Extract frames from user's video into public/sequence/hero/
"""

import os
import cv2

VIDEO_PATH = r"C:\Users\rajau\Downloads\Robot_head_camera_orbit_1080p_20260914123212.mp4"
OUTPUT_DIR = os.path.join("public", "sequence", "hero")
TARGET_WIDTH = 1280
TARGET_HEIGHT = 720
JPEG_QUALITY = 85

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Clear existing sample frames in hero directory
for f in os.listdir(OUTPUT_DIR):
    if f.startswith("frame_") and f.endswith(".jpg"):
        os.remove(os.path.join(OUTPUT_DIR, f))

cap = cv2.VideoCapture(VIDEO_PATH)
frame_idx = 1
total_extracted = 0

print(f"Extracting frames from {VIDEO_PATH} to {OUTPUT_DIR}...")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Resize to target resolution for optimal web performance
    resized = cv2.resize(frame, (TARGET_WIDTH, TARGET_HEIGHT), interpolation=cv2.INTER_AREA)

    output_path = os.path.join(OUTPUT_DIR, f"frame_{frame_idx:04d}.jpg")
    cv2.imwrite(output_path, resized, [int(cv2.IMWRITE_JPEG_QUALITY), JPEG_QUALITY])

    frame_idx += 1
    total_extracted += 1

cap.release()
print(f"Successfully extracted {total_extracted} frames to {OUTPUT_DIR}!")
