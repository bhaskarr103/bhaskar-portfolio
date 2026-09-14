'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Eye, Cpu, Navigation, Activity } from 'lucide-react';
import ScrollyCanvas from '../canvas/ScrollyCanvas';
import { useScrollProgress } from '../canvas/useScrollProgress';

interface ProcessPhase {
  range: [number, number];
  phaseNumber: string;
  title: string;
  subtitle: string;
  tag: string;
  details: string[];
  telemetry: { label: string; val: string }[];
  icon: React.ElementType;
}

const phases: ProcessPhase[] = [
  {
    range: [0.0, 0.26],
    phaseNumber: '01',
    tag: 'PERCEPTION & SENSOR INGESTION',
    title: 'High-Altitude 4K Feed & Monocular Depth',
    subtitle: 'Synthetic camera streams from CosysAirSim undergo radiometric calibration and optical distortion correction at 60Hz.',
    details: [
      'Multi-spectral camera synchronization with onboard IMU telemetry',
      'Dynamic exposure compensation under high-contrast overhead sun',
      'Point cloud reconstruction of rail corridor and track ballast',
    ],
    telemetry: [
      { label: 'STREAM', val: '4K @ 60 FPS' },
      { label: 'CALIBRATION', val: 'SUB-PIXEL' },
      { label: 'LATENCY', val: '< 8.2 ms' },
    ],
    icon: Eye,
  },
  {
    range: [0.26, 0.52],
    phaseNumber: '02',
    tag: 'SPATIO-TEMPORAL VISION INFERENCE',
    title: 'TEP-Net Anomaly & Fastener Detection',
    subtitle: 'Specialized lightweight Transformer extracts spatio-temporal features to flag microscopic fastener shear and railhead fissures.',
    details: [
      'Dual-stream attention mechanism isolating high-frequency surface fractures',
      'OHE catenary cable wire segmentation for collision hazard bounds',
      'Real-time bounding box regression running on TensorRT edge runtime',
    ],
    telemetry: [
      { label: 'MODEL', val: 'TEP-Net v2' },
      { label: 'PRECISION', val: '98.4%' },
      { label: 'COMPUTE', val: 'TENSORRT' },
    ],
    icon: Cpu,
  },
  {
    range: [0.52, 0.78],
    phaseNumber: '03',
    tag: 'MEMORY-GUIDED TRAJECTORY OPTIMIZATION',
    title: 'RS19 Path Planning & Catenary Avoidance',
    subtitle: 'Online replanner computes dynamically feasible B-spline paths guaranteeing 3.5m clearance from 25kV electric catenaries.',
    details: [
      'Topological memory graphs preventing redundant coverage sweeps',
      'Wind gust rejection model in CosysAirSim aerodynamic loop',
      'Real-time waypoint generation streaming over ROS2 micro-nodes',
    ],
    telemetry: [
      { label: 'PLANNER', val: 'RS19 HYBRID' },
      { label: 'CLEARANCE', val: '3.8 m [SAFE]' },
      { label: 'REPLAN_RATE', val: '50 HZ' },
    ],
    icon: Navigation,
  },
  {
    range: [0.78, 1.0],
    phaseNumber: '04',
    tag: 'FORMAL CONTROL & ACTUATION',
    title: 'Control Barrier Functions (CBF) Safety Filter',
    subtitle: 'Zero safety-margin violations guaranteed via quadratic programming (QP) solving at 100Hz before PX4 motor mixer dispatch.',
    details: [
      'Control Lyapunov Function (CLF) tracking objective merged with safety barrier',
      'Formal mathematical proof of forward invariance under actuator saturation',
      'Hardware-in-the-loop (HIL) validated on multirotor testbench at IIT Kanpur',
    ],
    telemetry: [
      { label: 'FILTER', val: 'CLF-CBF-QP' },
      { label: 'INVARIANCE', val: 'PROVED' },
      { label: 'LOOP', val: '100 HZ' },
    ],
    icon: ShieldAlert,
  },
];

export const ProcessScrolly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full h-[420vh] bg-[#0A0A0A] text-white"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* ScrollyCanvas Image Sequence Scrubbing Engine */}
        <div className="absolute inset-0 z-0">
          <ScrollyCanvas
            progress={scrollProgress}
            framePrefix="/sequence/process"
            frameCount={80}
            startIndex={1}
            verticalBias={0.5}
            loadingLabel="CALIBRATING INSPECTION PIPELINE"
          />
        </div>

        {/* Global HUD Header Overlay */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <Activity size={14} className="text-[#00F0FF] animate-pulse" />
            <span className="font-mono text-xs text-white tracking-widest uppercase">
              SCROLLYTELLING // INSPECTION ARCHITECTURE
            </span>
          </div>

          {/* Scroll progress readout */}
          <div className="font-mono text-xs text-[#00F0FF] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            PHASE PROGRESS: {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        {/* Progress Tracker Line (Right Side) */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center space-y-4 pointer-events-none">
          {phases.map((phase, idx) => {
            const isActive =
              scrollProgress >= phase.range[0] && scrollProgress <= phase.range[1];
            return (
              <div key={idx} className="flex items-center space-x-3">
                <span
                  className={`font-mono text-[10px] transition-colors duration-300 ${
                    isActive ? 'text-[#00F0FF] font-bold' : 'text-neutral-600'
                  }`}
                >
                  {phase.phaseNumber}
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00F0FF] scale-125 shadow-[0_0_10px_#00F0FF]'
                      : 'bg-white/20'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Dynamic Milestone Overlay Cards Synced to Scroll Milestones */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pointer-events-none">
          {phases.map((phase) => {
            const isVisible =
              scrollProgress >= phase.range[0] && scrollProgress < phase.range[1];
            const Icon = phase.icon;

            if (!isVisible) return null;

            return (
              <motion.div
                key={phase.phaseNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-xl p-6 sm:p-8 rounded-3xl bg-[#101014]/85 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                {/* Header with Phase Tag and Icon */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold">
                      STAGE {phase.phaseNumber}
                    </span>
                    <span className="font-mono text-xs tracking-wider text-neutral-400">
                      {phase.tag}
                    </span>
                  </div>
                  <Icon size={18} className="text-[#00F0FF]" />
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {phase.subtitle}
                </p>

                {/* Bullet details */}
                <div className="space-y-2 mb-6">
                  {phase.details.map((detail, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shrink-0 mt-1.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Telemetry Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                  {phase.telemetry.map((t, i) => (
                    <div key={i} className="p-2 rounded-xl bg-black/40 border border-white/5 text-center">
                      <div className="font-mono text-[9px] uppercase text-neutral-500">{t.label}</div>
                      <div className="font-mono text-xs font-semibold text-[#00F0FF] mt-0.5">{t.val}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll scrub prompt at the bottom */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
            CONTINUE SCROLLING TO DISSECT ARCHITECTURE
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessScrolly;
