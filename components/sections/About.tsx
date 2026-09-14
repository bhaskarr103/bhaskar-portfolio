'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';

const skillChips = [
  'Python',
  'ROS2 Humble',
  'CosysAirSim',
  'PyTorch',
  'TEP-Net',
  'YOLOv8',
  'SegFormer',
  'Control Barrier Functions (CBF)',
  'C++',
  'PX4 Autopilot',
  'Gazebo',
  'Simulink / MATLAB',
  'OpenCV',
  'RS19 Path Planning',
  'LangChain & RAG',
  'FAISS & Vector DBs',
  'Mistral-7B / LLMs',
];

const metrics = [
  {
    label: 'Lab & Institution',
    value: 'PIL Lab · IITK',
    detail: 'Under Prof. Tushar Sandhan — M.Tech UAS',
    icon: Award,
  },
  {
    label: 'Flagship Thesis',
    value: 'RailVisionAI',
    detail: 'Autonomous Railway Inspection & Adverse Perception',
    icon: Compass,
  },
  {
    label: 'Sensing & Avoidance',
    value: 'FMCW Radar & Sonar',
    detail: 'Kalman-Filtered Swarm Collision Mitigation',
    icon: ShieldCheck,
  },
  {
    label: 'Simulation & Design',
    value: 'UE5 + AirSim & CAD',
    detail: 'Synthetic Datasets, PETG Prototyping & Bench Dyno',
    icon: Cpu,
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <SectionHeading
          tag="// 01 PROFILE & RESEARCH"
          title="Bridging Computer Vision & Autonomous Flight"
          subtitle="Engineering resilient autonomous aerial systems operating at the intersection of deep learning perception, formal safety controllers, and real-time robotics."
        />

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed"
          >
            <p>
              I am an aerospace and robotics engineer pursuing my{' '}
              <span className="text-white font-medium">M.Tech in Unmanned Aerial Systems (UAS)</span> at{' '}
              <span className="text-[#00F0FF] font-medium">IIT Kanpur</span>, currently working under{' '}
              <span className="text-white font-medium">Prof. Tushar Sandhan</span> in the{' '}
              <span className="text-[#FF5500] font-medium">PIL Lab</span>.
            </p>

            <p>
              I completed my{' '}
              <span className="text-white font-medium">B.Tech in Computer Science and Engineering (with specialization in Artificial Intelligence)</span>{' '}
              at <span className="text-white font-medium">UIET Kanpur</span>, graduating with a{' '}
              <span className="text-[#00F0FF] font-semibold">CPI of 8.86</span> and achieving a{' '}
              <span className="text-[#FF5500] font-semibold">perfect 10.0 SPI in my 5th, 7th, and 8th semesters</span> across advanced coursework in Artificial Intelligence, Data Science, Design & Analysis of Algorithms, DBMS, and Advanced Computer Networks.
            </p>

            <p>
              My academic foundation is backed by comprehensive coursework across Machine Learning, Deep Learning, Data Structures with Python, Object-Oriented Programming, Digital Logic & Design, and Probability & Statistics.
            </p>

            <p>
              My flagship thesis research centers on{' '}
              <span className="text-white font-medium">
                autonomous drone-based railway inspection and navigation
              </span>
              . By architecting high-fidelity simulations in <span className="text-white">Unreal Engine 5 + COSYS-AirSim</span>, 
              I integrate <span className="text-[#00F0FF]">TEP-Net</span> for railhead and catenary perception, 
              stream state estimation across <span className="text-white">ROS2</span>, and evaluate multi-modal robustness under 
              severe adverse environmental conditions.
            </p>

            <p>
              For my final-year B.Tech capstone, I developed <span className="text-white font-medium">LegalDocAI: Legal Advisor</span>—a specialized legal RAG system leveraging LangChain, FAISS, Sentence-Transformers, and Mistral-7B-Instruct over the Indian Penal Code (IPC), Bharatiya Nyaya Sanhita (BNS 2023), and uploaded legal statutes. By implementing retrieval-grounded prompt constraints and safe fallbacks, the pipeline achieved <span className="text-white font-medium">94% response accuracy</span>, a <span className="text-[#00F0FF] font-medium">3% hallucination rate</span>, and <span className="text-white font-medium">2.5 s average latency</span> across 50 evaluated legal queries.
            </p>

            <p>
              My broader engineering spans close-range drone collision avoidance (FMCW radar vs. ultrasonic benchmarking), 
              complete quadrotor CAD design, BEMT sizing and PETG 3D fabrication, and deep computer vision architectures.
            </p>

            {/* Interactive Animated Skill Chips */}
            <div className="pt-6">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center space-x-2">
                <Code2 size={14} className="text-[#00F0FF]" />
                <span>CORE STACK & TOOLS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillChips.map((chip, idx) => (
                  <motion.div
                    key={chip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                  >
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-[#00F0FF]/50 hover:text-white transition-colors duration-200 cursor-default">
                      {chip}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume / Contact CTA */}
            <div className="pt-4 flex items-center space-x-4">
              <MagneticButton
                href="#work"
                className="px-6 py-3 rounded-full bg-white text-black font-sans text-sm font-semibold hover:bg-[#00F0FF] hover:text-black transition-colors"
              >
                Explore Projects
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Stat / Metric Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-[#121214] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between h-52 hover:bg-[#151518]"
                >
                  {/* Glowing hover accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/5 rounded-full blur-2xl group-hover:bg-[#00F0FF]/10 transition-colors" />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                      {metric.label}
                    </span>
                    <Icon size={18} className="text-neutral-400 group-hover:text-[#00F0FF] transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                      {metric.value}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-white/5 group-hover:bg-[#00F0FF]/30 transition-colors duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
