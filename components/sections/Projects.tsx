'use client';

import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard, { ProjectData } from './ProjectCard';

const projects: ProjectData[] = [
  {
    id: 'railvision-ai',
    tag: '// FLAGSHIP RESEARCH · M.TECH THESIS',
    title: 'RailVisionAI: Autonomous Drone Rail Inspection',
    tagline: 'End-to-end aerial vision pipeline using TEP-Net and UE5 + CosysAirSim with OHE catenary obstacle avoidance.',
    period: '2024 — PRESENT',
    courseMeta: 'M.Tech. Thesis Research — PIL Lab IIT Kanpur',
    instructor: 'Prof. Tushar Sandhan',
    description:
      'Engineered an autonomous multirotor inspection system designed for railway infrastructure monitoring. Overcomes extreme challenges of narrow track geometries, Overhead Equipment (OHE) live 25kV catenaries, and high-speed defect localization in real-time.',
    keyContributions: [
      'Developed a UE5 + COSYS-AirSim simulation environment for autonomous railway inspection and navigation validation.',
      'Integrated TEP-Net for rail-point detection and track segmentation to estimate railway ego-path for autonomous track following.',
      'Integrated perception, UAV state and inspection data through ROS2 and visualized real-time navigation and railway defects in Foxglove.',
      'Created controlled adverse-vision scenarios using NS Snow, motion blur, blur/deblur effects and colour degradation, evaluating RailEye + Prior-Eye retrieval under degraded perception.',
    ],
    techStack: ['Python', 'TEP-Net', 'UE5', 'CosysAirSim', 'ROS2', 'Foxglove', 'PyTorch'],
    hasDemo: true,
    youtubeUrl: 'https://youtu.be/4ytX4RLVaxc',
    metrics: [
      { label: 'Defect Precision', value: '98.4% Confidence' },
      { label: 'Inspection Stream', value: 'ROS2 + Foxglove' },
    ],
  },
  {
    id: 'fmcw-radar-ultrasonic',
    tag: '// M.TECH COURSE PROJECT · EE798T',
    title: 'FMCW Radar vs Ultrasonic for Close-Range Encounter Prevention',
    tagline: 'Sensor benchmarking and Kalman-filtered collision risk architecture in Gazebo / ArduPilot swarm environments.',
    period: 'Jan’26 – May’26',
    courseMeta: 'M.Tech. Course Project — EE798T',
    instructor: 'Prof. Ketan Rajawat',
    description:
      'Rigorous comparative analysis of millimeter-wave FMCW radar versus ultrasonic acoustic ranging for aerial collision mitigation during close-proximity multi-UAV encounters.',
    keyContributions: [
      'Simulated multi-drone collision scenarios in Gazebo/ArduPilot and compared FMCW radar and ultrasonic sensing under noise, dropouts and range limitations.',
      'Developed GPU LiDAR ray-based sensor models and evaluated detection range, response time, safe distance and sensor interference across head-on, cross-intersection and lateral encounters.',
      'Designed a moving-average + linear Kalman filtering pipeline and ROS2 perception-to-action architecture for real-time Safe/Warn/Danger collision-risk estimation.',
    ],
    techStack: ['Gazebo', 'ArduPilot', 'FMCW Radar', 'Ultrasonic', 'ROS2', 'Kalman Filter', 'GPU LiDAR'],
    simulationUrl: 'https://gitlab.com/rajaurabhaskar123-group/low-cost-collision-avoidance-in-swarm-env.git',
    metrics: [
      { label: 'Risk Hierarchy', value: 'Safe / Warn / Danger' },
      { label: 'Encounter Types', value: 'Head-on, Cross & Lateral' },
    ],
  },
  {
    id: 'quadrotor-uav-design',
    tag: '// M.TECH COURSE PROJECT · AE630',
    title: 'Design, Fabrication and Experimental Validation of a Quadrotor UAV',
    tagline: 'BEMT propulsion sizing, PETG additive manufacturing, and bench/flight testing of an autonomous multirotor.',
    period: 'Jan’26 – May’26',
    courseMeta: 'M.Tech. Course Project — AE630',
    instructor: 'Prof. Abhishek',
    description:
      'Complete aerospace engineering lifecycle of an autonomous quadrotor UAV from computational aerodynamic sizing to bench dynamometer characterization and outdoor autonomous flight trials.',
    keyContributions: [
      'Developed a BEMT-based propulsion sizing and GTOW convergence methodology in Python for a 300 g payload and 20 min endurance target.',
      'Designed and fabricated an X-type quadrotor using CAD and PETG FDM 3D printing, followed by complete avionics system integration.',
      'Conducted 1400–6400 RPM motor-propeller bench tests and outdoor flight testing to validate thrust, hover performance and endurance.',
    ],
    techStack: ['Python', 'BEMT Aerodynamics', 'CAD Design', 'PETG 3D Printing', 'Bench Dyno', 'Flight Testing'],
    simulationUrl: 'https://github.com/bhaskarr103/AE-630-AUTONOMOUS-UNMANNED-AERIAL-SYSTEMS.git',
    metrics: [
      { label: 'Payload / Endurance', value: '300 g / 20 min' },
      { label: 'Dyno Testing', value: '1400–6400 RPM' },
    ],
  },
  {
    id: 'scene-recognition-labeling',
    tag: '// M.TECH COURSE PROJECT · EE604',
    title: 'Scene Recognition and Automatic Multi-Modal Labeling',
    tagline: 'Unified spatial-temporal vision pipeline combining Mask R-CNN, optical flow, and BLIP captioning.',
    period: 'Aug’25 – Nov’25',
    courseMeta: 'M.Tech. Course Project — EE604',
    instructor: 'Prof. Koteswar Rao Jerripothula',
    description:
      'Constructed a multi-stage vision framework parsing complex imagery into structured spatial masks, velocity flow fields, and natural language semantic descriptions.',
    keyContributions: [
      'Integrated Mask R-CNN, SIFT/ORB and Farneback Optical Flow for object detection, feature extraction and motion analysis.',
      'Developed rule-based action inference and BLIP-based captioning for automated per-object and global scene annotation.',
      'Constructed a high-throughput annotation pipeline generating detailed spatial and kinematic metadata from image sequences.',
    ],
    techStack: ['Mask R-CNN', 'BLIP Captioning', 'Farneback Flow', 'SIFT / ORB', 'PyTorch', 'OpenCV'],
    simulationUrl: 'https://github.com/bhaskarr103/Scene-Recoginition-And-Automatic-Labeling-from-Images.git',
    metrics: [
      { label: 'Segmentation', value: 'Mask R-CNN + SIFT' },
      { label: 'Semantics', value: 'BLIP Captioning' },
    ],
  },
  {
    id: 'spoken-digit-recognition',
    tag: '// M.TECH COMPETITION · EE708',
    title: 'Spoken Digit Classification using Deep CRNN Architecture',
    tagline: 'Top-tier Kaggle competition submission pairing Mel spectrogram analysis with Convolutional Recurrent Networks.',
    period: 'Jan’26 – May’26',
    courseMeta: 'M.Tech. Course Project — EE708 — Kaggle Competition',
    instructor: 'Prof. Rajesh M. Hegde',
    description:
      'Engineered an end-to-end audio classification network processing raw temporal waveforms into spectral representations without relying on pre-trained backbones.',
    keyContributions: [
      'Converted raw audio into Mel spectrograms and developed CNN-based models for spoken-digit classification without pretrained models.',
      'Developed a CRNN architecture combining CNN feature extraction with recurrent temporal modelling for improved recognition.',
      'Achieved 0.99405 public and 0.99359 private Kaggle leaderboard scores, ranking among the top participants.',
    ],
    techStack: ['Audio Processing', 'Mel Spectrograms', 'CRNN', 'PyTorch', 'Recurrent Nets', 'Kaggle'],
    metrics: [
      { label: 'Public Leaderboard', value: '0.99405' },
      { label: 'Private Leaderboard', value: '0.99359' },
    ],
  },
  {
    id: 'legaldoc-ai-rag',
    tag: '// CAPSTONE AI PROJECT · B.TECH CSE',
    title: 'LegalDocAI: Retrieval-Augmented Generation Legal Advisor',
    tagline: 'High-precision legal Q&A and statutory analysis over IPC & BNS 2023 using Mistral-7B-Instruct and LangChain.',
    period: '2023 — 2024',
    courseMeta: 'B.Tech Capstone Project — UIET Kanpur',
    description:
      'Engineered an enterprise-grade Retrieval-Augmented Generation (RAG) system synthesizing legal statutes, penal codes, and uploaded judicial records with strict hallucination safeguards.',
    keyContributions: [
      'Developed a legal RAG system using LangChain, FAISS, Sentence-Transformers and Mistral-7B-Instruct over IPC, BNS 2023 and uploaded legal documents.',
      'Designed retrieval-grounded prompt constraints and safe fallbacks to reduce unsupported legal responses and improve answer reliability.',
      'Achieved 94% response accuracy, 3% hallucination rate and 2.5 s average response time across 50 evaluated benchmark queries.',
    ],
    techStack: ['Mistral-7B', 'LangChain', 'FAISS', 'Sentence-Transformers', 'Python', 'Vector Search', 'RAG'],
    metrics: [
      { label: 'Response Accuracy', value: '94.0%' },
      { label: 'Hallucination Rate', value: '3.0%' },
    ],
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="work" className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <SectionHeading
          tag="// 02 SELECTED WORK"
          title="Autonomous Systems, Vision & Robotics"
          subtitle="A curated portfolio of M.Tech thesis research, sensor benchmark studies, UAV fabrication, and deep computer vision architectures at IIT Kanpur."
        />

        {/* Alternating Project Cards List */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
