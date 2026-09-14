'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Cpu, BookOpen } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

interface TimelineEntry {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: React.ElementType;
}

const timelineData: TimelineEntry[] = [
  {
    period: '2024 — PRESENT',
    role: 'M.Tech Thesis — Autonomous Railway Inspection',
    organization: 'PIL LAB, IIT KANPUR — Under Prof. Tushar Sandhan',
    location: 'IIT Kanpur, India',
    description:
      'Currently conducting advanced postgraduate thesis research on aerial computer vision, deep perception pipelines, and high-fidelity physics simulation for automated railway inspection.',
    highlights: [
      'Developed a UE5 + COSYS-AirSim simulation environment for autonomous railway inspection and navigation validation.',
      'Integrated TEP-Net for rail-point detection and track segmentation to estimate railway ego-path for autonomous track following.',
      'Integrated perception, UAV state and inspection data through ROS2 and visualized real-time navigation and railway defects in Foxglove.',
      'Created controlled adverse-vision scenarios using NS Snow, motion blur, blur/deblur effects and colour degradation, and evaluated the RailEye + Prior-Eye retrieval pipeline under degraded perception conditions.',
      'Pantograph health monitor (ongoing): Planning to use Marigold v2 for depth estimation; worked with CAD and FBX models, mesh, and material integrations.',
    ],
    tags: [
      'Prof. Tushar Sandhan',
      'PIL Lab',
      'UE5',
      'COSYS-AirSim',
      'TEP-Net',
      'ROS2',
      'Foxglove',
      'Marigold v2',
    ],
    icon: Cpu,
  },
  {
    period: '2024 — 2026',
    role: 'M.Tech in Unmanned Aerial Systems (UAS)',
    organization: 'Indian Institute of Technology (IIT) Kanpur',
    location: 'Kanpur, India',
    description:
      'Specialized curriculum spanning aerial robotics, avionics fabrication, advanced computer vision, sensor fusion, and multi-drone collision avoidance.',
    highlights: [
      'Coursework & research under Prof. Abhishek (AE630), Prof. Ketan Rajawat (EE798T), Prof. Koteswar Rao (EE604), and Prof. Rajesh M. Hegde (EE708).',
      'Engineered BEMT propulsion sizing and fabricated an X-type PETG 3D-printed quadrotor with bench dynamometer and flight testing.',
      'Benchmarked FMCW Radar vs. Ultrasonic ranging in Gazebo/ArduPilot with linear Kalman filter collision risk estimation.',
      'Developed CRNN audio classification scoring 0.99405 on Kaggle, and multi-modal scene labeling with Mask R-CNN and BLIP.',
    ],
    tags: ['IIT Kanpur', 'M.Tech UAS', 'Flight Dynamics', 'Sensor Fusion', 'Deep Learning'],
    icon: BookOpen,
  },
  {
    period: '2020 — 2024',
    role: 'B.Tech in Computer Science & Engineering (AI Specialization)',
    organization: 'UIET Kanpur · CPI: 8.86 / 10.0',
    location: 'Kanpur, India',
    description:
      'Completed undergraduate degree in Computer Science and Engineering with an Artificial Intelligence specialization, graduating with an 8.86 CPI and scoring a perfect 10.0 SPI in semesters 5, 7, and 8.',
    highlights: [
      'Scored perfect 10.0 SPI in semesters 5, 7, and 8 across AI, Data Science, Design & Analysis of Algorithms, DBMS, Advanced Computer Networks, and Data Mining.',
      'Completed core curriculum: Machine Learning, Deep Learning, Data Structures with Python, OOPs, Digital Logic & Design, and Probability & Statistics.',
      'Capstone Project — LegalDocAI (Legal Advisor RAG System): Built an end-to-end legal RAG system with LangChain, FAISS, Sentence-Transformers, and Mistral-7B-Instruct over IPC, BNS 2023, and statutes.',
      'Engineered retrieval-grounded prompt constraints and safe fallbacks, achieving 94% response accuracy, 3% hallucination rate, and 2.5 s latency across 50 evaluated queries.',
    ],
    tags: ['UIET Kanpur', 'B.Tech CSE (AI)', 'CPI: 8.86', '10.0 SPI', 'LegalDocAI', 'LangChain', 'FAISS', 'Mistral-7B'],
    icon: GraduationCap,
  },
];

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" ref={containerRef} className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <SectionHeading
          tag="// 04 TRAJECTORY"
          title="Research & Academic Trajectory"
          subtitle="Postgraduate research under Prof. Tushar Sandhan at PIL Lab, IIT Kanpur, advancing autonomous aerial robotics and vision."
        />

        <div className="relative max-w-4xl mx-auto mt-20">
          {/* Central Vertical Progress Beam */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00F0FF] via-[#FF5500] to-[#00F0FF] shadow-[0_0_12px_#00F0FF]"
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-16">
            {timelineData.map((entry, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = entry.icon;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#121214] border-2 border-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                      <Icon size={18} className="text-[#00F0FF]" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className={`ml-12 sm:ml-0 sm:w-[46%] p-6 sm:p-8 rounded-3xl bg-[#121215] border border-white/5 hover:border-white/15 transition-all duration-300 ${
                      isEven ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                    }`}
                  >
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center space-x-1.5 font-mono text-[11px] text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-full border border-[#00F0FF]/20">
                        <Calendar size={11} />
                        <span>{entry.period}</span>
                      </span>

                      <span className="inline-flex items-center space-x-1 font-mono text-[11px] text-neutral-500">
                        <MapPin size={11} />
                        <span>{entry.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-sans text-white tracking-tight">
                      {entry.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-medium text-[#FF5500] mt-1 mb-4">
                      {entry.organization}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-2 mb-5">
                      {entry.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2 text-xs text-neutral-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {entry.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-neutral-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
