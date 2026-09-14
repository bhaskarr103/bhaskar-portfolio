"""
Sample Frame Sequence Generator for Bhaskar Rajaura's Portfolio
Generates 80 high-tech cinematic sample frames for Hero and Process sequences.
"""

import os
import math
from PIL import Image, ImageDraw

WIDTH = 1280
HEIGHT = 720
HERO_FRAMES = 80
PROCESS_FRAMES = 80

HERO_DIR = os.path.join("public", "sequence", "hero")
PROCESS_DIR = os.path.join("public", "sequence", "process")

os.makedirs(HERO_DIR, exist_ok=True)
os.makedirs(PROCESS_DIR, exist_ok=True)


def generate_hero_frames():
    print(f"Generating {HERO_FRAMES} hero frames...")
    for i in range(1, HERO_FRAMES + 1):
        t = (i - 1) / (HERO_FRAMES - 1)
        img = Image.new("RGB", (WIDTH, HEIGHT), color=(10, 10, 12))
        draw = ImageDraw.Draw(img)

        # Ambient warm dramatic backlight in upper center
        cx = int(WIDTH * 0.5)
        cy = int(HEIGHT * 0.4)
        max_rad = int(HEIGHT * 0.55)

        # Radial glow simulation
        for r in range(max_rad, 0, -25):
            frac = 1.0 - (r / max_rad)
            alpha_r = int(180 * (frac ** 1.8))
            alpha_g = int(60 * (frac ** 2.2))
            alpha_b = int(20 * (frac ** 2.5))
            draw.ellipse(
                [cx - r, cy - r, cx + r, cy + r],
                fill=(10 + alpha_r, 10 + alpha_g, 12 + alpha_b),
            )

        # Technical grid lines
        for x in range(0, WIDTH, 80):
            draw.line([(x, 0), (x, HEIGHT)], fill=(25, 25, 30), width=1)
        for y in range(0, HEIGHT, 80):
            draw.line([(0, y), (WIDTH, y)], fill=(25, 25, 30), width=1)

        # Central Autonomous Drone Silhouette / Wireframe
        drone_y = cy + int(math.sin(t * math.pi * 2) * 15)
        drone_x = cx

        # Drone arms
        arm_len = 160
        angle = t * math.pi * 0.5
        for a in [math.pi / 4, 3 * math.pi / 4, 5 * math.pi / 4, 7 * math.pi / 4]:
            x2 = drone_x + int(math.cos(a) * arm_len)
            y2 = drone_y + int(math.sin(a) * (arm_len * 0.45))
            draw.line([(drone_x, drone_y), (x2, y2)], fill=(220, 100, 30), width=3)
            # Motor rotors
            draw.ellipse([x2 - 35, y2 - 12, x2 + 35, y2 + 12], outline=(0, 240, 255), width=2)

        # Drone central fuselage / payload gimbal
        draw.ellipse(
            [drone_x - 30, drone_y - 20, drone_x + 30, drone_y + 20],
            fill=(25, 25, 30),
            outline=(255, 85, 0),
            width=2,
        )
        # Gimbal lens
        draw.ellipse(
            [drone_x - 10, drone_y - 8, drone_x + 10, drone_y + 8],
            fill=(0, 240, 255),
        )

        # Telemetry HUD text & coordinates
        draw.text((40, 40), f"SYS // BHASKAR-UAS-01 | FRAME: {i:04d}", fill=(0, 240, 255))
        draw.text((40, 60), f"ALT: {15.2 + math.sin(t * 6):.2f}m | HDG: 184.2°", fill=(180, 180, 180))
        draw.text((WIDTH - 280, 40), "IIT KANPUR UAS FLIGHT LAB", fill=(255, 120, 40))
        draw.text((WIDTH - 280, 60), "COSYSAIRSIM // ROS2_ACTIVE", fill=(140, 140, 140))

        # Save frame
        file_path = os.path.join(HERO_DIR, f"frame_{i:04d}.jpg")
        img.save(file_path, "JPEG", quality=85)

    print(f"Completed {HERO_FRAMES} hero frames.")


def generate_process_frames():
    print(f"Generating {PROCESS_FRAMES} process sequence frames...")
    for i in range(1, PROCESS_FRAMES + 1):
        t = (i - 1) / (PROCESS_FRAMES - 1)
        img = Image.new("RGB", (WIDTH, HEIGHT), color=(8, 9, 12))
        draw = ImageDraw.Draw(img)

        # Railway perspective lines
        vanishing_x = int(WIDTH * 0.5)
        vanishing_y = int(HEIGHT * 0.35)

        # Left & Right Rails
        track_spread = 220 + int(t * 80)
        draw.line([(vanishing_x, vanishing_y), (vanishing_x - track_spread, HEIGHT)], fill=(0, 240, 255), width=3)
        draw.line([(vanishing_x, vanishing_y), (vanishing_x + track_spread, HEIGHT)], fill=(0, 240, 255), width=3)

        # Sleepers / Ties
        for s in range(1, 15):
            sy = vanishing_y + int((HEIGHT - vanishing_y) * (s / 15.0) ** 1.8)
            sw = int(track_spread * (s / 15.0) ** 1.8)
            draw.line([(vanishing_x - sw, sy), (vanishing_x + sw, sy)], fill=(40, 50, 65), width=2)

        # Overhead Equipment (OHE) Catenary Cable
        ohe_y = int(HEIGHT * 0.18)
        draw.line([(0, ohe_y), (WIDTH, ohe_y + int(math.sin(t * 4) * 8))], fill=(255, 85, 0), width=2)
        draw.text((40, ohe_y - 20), "LIVE OHE CATENARY 25kV [EXCLUSION ZONE]", fill=(255, 85, 0))

        # Laser Scanline / Perception Sweep (moves downward across sequence)
        scan_y = int(vanishing_y + (HEIGHT - vanishing_y) * ((t * 2.2) % 1.0))
        draw.line([(0, scan_y), (WIDTH, scan_y)], fill=(0, 240, 255), width=2)

        # Stage specific annotations
        if t < 0.26:
            draw.text((40, 50), "STAGE 01 // SENSOR INGESTION & MONOCULAR DEPTH", fill=(0, 240, 255))
            draw.text((40, 75), "Point cloud alignment: OK | Radiometric balance: 1.02", fill=(200, 200, 200))
        elif t < 0.52:
            draw.text((40, 50), "STAGE 02 // TEP-NET SPATIO-TEMPORAL VISION INFERENCE", fill=(0, 240, 255))
            # Draw defect bounding box
            bx, by = vanishing_x - 40, int(HEIGHT * 0.65)
            draw.rectangle([bx, by, bx + 120, by + 60], outline=(255, 70, 0), width=2)
            draw.text((bx + 5, by + 5), "FASTENER_SHEAR_98.4%", fill=(255, 120, 50))
        elif t < 0.78:
            draw.text((40, 50), "STAGE 03 // RS19 MEMORY-GUIDED 3D PATH PLANNING", fill=(0, 240, 255))
            # Draw green B-spline clearance trajectory
            pts = []
            for step in range(0, 10):
                px = vanishing_x + int(math.sin(step * 0.8 + t * 5) * 60)
                py = vanishing_y + int((HEIGHT - vanishing_y) * (step / 10.0))
                pts.append((px, py))
            if len(pts) > 1:
                draw.line(pts, fill=(50, 255, 150), width=3)
            draw.text((40, 75), "Catenary clearance: 3.82m | Dynamic replanning @ 50Hz", fill=(50, 255, 150))
        else:
            draw.text((40, 50), "STAGE 04 // CONTROL BARRIER FUNCTION (CBF) SAFETY GATE", fill=(0, 240, 255))
            draw.text((40, 75), "Zero safety violations | QP solved in 1.4ms | Invariance guaranteed", fill=(0, 240, 255))

        # Bottom stats
        draw.text((40, HEIGHT - 40), f"SEQUENCE PROGRESS: {int(t * 100)}% | FRAME: {i:04d}/0080", fill=(140, 140, 150))
        draw.text((WIDTH - 300, HEIGHT - 40), "COSYSAIRSIM // ROS2 HUMBLE", fill=(140, 140, 150))

        file_path = os.path.join(PROCESS_DIR, f"frame_{i:04d}.jpg")
        img.save(file_path, "JPEG", quality=85)

    print(f"Completed {PROCESS_FRAMES} process frames.")


if __name__ == "__main__":
    generate_hero_frames()
    generate_process_frames()
    print("All sequence frames generated successfully.")
