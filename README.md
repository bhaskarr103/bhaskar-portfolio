# Bhaskar Rajaura — Autonomous Systems & Drone Vision Portfolio

An Awwwards-caliber, high-performance **Scrollytelling** personal portfolio built for **Bhaskar Rajaura**, an aerospace and Unmanned Aerial Systems (UAS) engineer at **IIT Kanpur** specializing in autonomous drone inspection, computer vision (TEP-Net, SegFormer, YOLO), ROS2, and photorealistic simulation (CosysAirSim).

---

## Technical Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Dark editorial aesthetic, `#0A0A0A` palette, electric cyan `#00F0FF` and warm ember `#FF5500` accents)
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Rendering**: Pure HTML5 `<canvas>` (zero `<video>` tags) with manual `object-fit: cover` scale/crop math, rAF batching, resize handling, and reduced motion detection.
- **Typography**: Geist Sans & Geist Mono local font pairing.

---

## Directory Structure

```
/app
  layout.tsx               # Root layout, Lenis smooth scroll, CustomCursor, NoiseOverlay, Header
  page.tsx                 # Main scrollytelling editorial page
  globals.css              # Dark palette, custom grain, selection colors, sleek scrollbar
/components
  /canvas
    ScrollyCanvas.tsx      # Pinned scroll-scrubbed canvas engine (0-1 scroll progress)
    HeroCanvas.tsx         # Ambient 24fps rAF video-loop canvas with face-bias cover crop & warm grade
    useImageSequence.ts    # Preload hook with memory caching & progress percentage
    useScrollProgress.ts   # rAF-batched container scroll progress tracker
  /layout
    Header.tsx             # Floating pill nav (Hero) + Sticky blur header (Page) + Mobile drawer
    Footer.tsx             # Bold CTA, telemetry coordinates, back-to-top button
    CustomCursor.tsx       # Dot + trailing lerped ring with magnetic snap
    SmoothScroll.tsx       # Lenis smooth scroll provider
  /sections
    Hero.tsx               # Ambient video-loop canvas, monumental typography ("Bhaskar.")
    About.tsx              # Two-column layout, IIT Kanpur UAS stats, animated tech pills
    Projects.tsx           # Alternating cards for RailVisionAI, Hybrid UAV, CBF, Road Drone
    ProjectCard.tsx        # Project card with magnetic CTA & simulation modal
    ProcessScrolly.tsx     # Pinned drone inspection dissection powered by ScrollyCanvas
    Skills.tsx             # Infinite marquee ticker (pause on hover) + categorized matrix
    Timeline.tsx           # Vertical timeline with scroll-linked glowing laser progress beam
    Contact.tsx            # Glitch/distortion CTA: "Let's build something that flies."
  /ui
    MagneticButton.tsx     # Physics-based spring magnetic hover button
    AnimatedText.tsx       # Character & word stagger entrance
    SectionHeading.tsx     # Technical badge + large editorial heading
/public
  /sequence
    /hero/                 # 24fps ambient looping frames (frame_0001.jpg ... frame_0080.jpg)
    /process/              # Scroll-scrubbed inspection sequence frames (frame_0001.jpg ... frame_0080.jpg)
/scripts
  generate_sample_sequences.py # Python script for procedural high-tech sample frames
```

---

## Video-to-Frames Extraction Guide (FFmpeg)

When you are ready to replace the sample frames with your actual personal portrait or drone flight footage, extract frames using FFmpeg:

### 1. Ambient Hero Canvas Loop (`/public/sequence/hero/`)
```bash
# Recommended: 24fps, scaled to 1920x1080 (or 1280x720 for ultra-fast web preloading)
ffmpeg -i your_portrait_video.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 public/sequence/hero/frame_%04d.jpg
```
- **Frame rate**: 24 fps
- **Naming convention**: `frame_0001.jpg`, `frame_0002.jpg`, ...
- **Count**: 60 to 120 frames is ideal for a smooth looping ambient backdrop.
- **Vertical Bias**: The component has `verticalBias: 0.28` pre-configured so your face stays centered on narrow mobile viewports without clipping.

### 2. Process / Scrollytelling Sequence (`/public/sequence/process/`)
```bash
# Scrub sequence: 15-24fps
ffmpeg -i your_inspection_simulation.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 public/sequence/process/frame_%04d.jpg
```
- **Naming convention**: `frame_0001.jpg`, `frame_0002.jpg`, ...
- **Count**: Update `frameCount` in `ProcessScrolly.tsx` if you extract more or fewer than 80 frames.

---

## Running the Project

```bash
# Development mode
npm run dev

# Production build test
npm run build

# Start production server
npm start
```
