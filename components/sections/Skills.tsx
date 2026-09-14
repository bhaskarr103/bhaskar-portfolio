'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Compass } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const marqueeTools = [
  'PYTHON',
  'ROS2 HUMBLE',
  'COSYSAIRSIM',
  'PYTORCH',
  'YOLOV8',
  'SEGFORMER',
  'TEP-NET',
  'CONTROL BARRIER FUNCTIONS',
  'PX4 AUTOPILOT',
  'GAZEBO',
  'MATLAB & SIMULINK',
  'OPENCV',
  'C++',
  'TENSORRT',
  'DOCKER',
  'LATEX',
  'GIT',
  'NEXT.JS',
];

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  items: { name: string; level: string; detail: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Perception & Computer Vision',
    icon: EyeIcon,
    description: 'Deep neural networks optimized for real-time edge robotics and aerial defect identification.',
    items: [
      { name: 'PyTorch & TorchVision', level: '95%', detail: 'Custom loss functions, spatial attention mechanisms' },
      { name: 'TEP-Net / Transformer CV', level: '92%', detail: 'Spatio-temporal railway infrastructure feature extraction' },
      { name: 'YOLOv8 & Object Detection', level: '94%', detail: 'Real-time fastener and catenary cable localization' },
      { name: 'OpenCV & Point Clouds', level: '88%', detail: 'Perspective rectification, homography, LiDAR fusion' },
    ],
  },
  {
    title: 'Autonomy, Control & Safety',
    icon: Compass,
    description: 'Formal mathematical safety filters and trajectory generation pipelines for multirotors.',
    items: [
      { name: 'Control Barrier Functions (CBF)', level: '90%', detail: 'CLF-CBF-QP real-time safety-critical filters' },
      { name: 'ROS2 Humble / Iron', level: '93%', detail: 'Custom msg types, lifecycle nodes, zero-copy IPC' },
      { name: 'Path Planning (RS19 / A*)', level: '89%', detail: 'Memory-guided topological trajectory synthesis' },
      { name: 'PX4 Autopilot & MAVLink', level: '85%', detail: 'Offboard control modes, state estimation, sensor logging' },
    ],
  },
  {
    title: 'Simulation & Aerodynamics',
    icon: Cpu,
    description: 'High-fidelity synthetic physics environments and aircraft sizing computational codes.',
    items: [
      { name: 'CosysAirSim (Unreal Engine)', level: '94%', detail: 'Photorealistic multirotor dynamics & sensor simulation' },
      { name: 'Hybrid UAV Sizing Codebase', level: '92%', detail: 'Iterative GTOW convergence & demand energy modeling' },
      { name: 'MATLAB / Simulink', level: '86%', detail: 'Nonlinear flight dynamics & state space modeling' },
      { name: 'Gazebo & SITL / HITL', level: '84%', detail: 'Hardware-in-the-loop autonomous regression testing' },
    ],
  },
  {
    title: 'Languages & Engineering Stack',
    icon: Terminal,
    description: 'Production systems programming, mathematical optimization, and full-stack telemetry.',
    items: [
      { name: 'Python (NumPy, SciPy)', level: '96%', detail: 'Scientific computing, optimization, mathematical analysis' },
      { name: 'Modern C++ (17/20)', level: '86%', detail: 'Low-latency robotics algorithms, memory-safe execution' },
      { name: 'Linux / Ubuntu & Shell', level: '90%', detail: 'Embedded deployment, RT-preempt kernel tuning' },
      { name: 'Full-Stack & Next.js / Canvas', level: '82%', detail: 'Interactive mission dashboards & telemetry visualizations' },
    ],
  },
];

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <SectionHeading
          tag="// 03 TECHNICAL STACK"
          title="Engineering Toolkit & Core Competencies"
          subtitle="A comprehensive spectrum spanning high-level machine learning frameworks, formal control theory, and aerospace simulation engines."
        />
      </div>

      {/* Infinite Horizontal Marquee Strip (Pause on Hover) */}
      <div className="relative w-full py-6 my-10 border-y border-white/5 bg-[#0D0D10] overflow-hidden group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...marqueeTools, ...marqueeTools].map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-6 mx-6 font-mono text-sm sm:text-base font-semibold tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300 select-none"
            >
              <span>{tool}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Technical Matrix */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="p-8 rounded-3xl bg-[#121215] border border-white/5 hover:border-white/15 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-400 font-light mb-6">
                  {category.description}
                </p>

                {/* Subskills items */}
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-neutral-200 font-medium">{item.name}</span>
                        <span className="text-[#00F0FF]">{item.level}</span>
                      </div>
                      {/* Skill progress bar */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF5500] rounded-full"
                          style={{ width: item.level }}
                        />
                      </div>
                      <div className="text-[11px] text-neutral-500 font-light">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
