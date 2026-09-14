'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Terminal, CheckCircle2, X, ExternalLink, GitBranch, Video } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export interface ProjectData {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  period?: string;
  courseMeta?: string;
  instructor?: string;
  description: string;
  keyContributions: string[];
  techStack: string[];
  hasDemo?: boolean;
  demoType?: 'canvas-sim' | 'video' | 'youtube';
  youtubeUrl?: string;
  simulationUrl?: string;
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  paperUrl?: string;
}

export interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isReversed = index % 2 === 1;
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Extract YouTube ID if applicable
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(project.youtubeUrl);

  const handleInspectClick = () => {
    if (project.youtubeUrl) {
      setDemoModalOpen(true);
    } else if (project.simulationUrl) {
      window.open(project.simulationUrl, '_blank', 'noopener,noreferrer');
    } else if (project.hasDemo) {
      setDemoModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-6 sm:p-10 rounded-3xl bg-[#111113] border border-white/5 hover:border-white/10 transition-colors duration-300 ${
          isReversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Media / Visual Representation Column */}
        <div
          className={`lg:col-span-6 relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group ${
            isReversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Procedural Visual Graphics / Radar / HUD Display */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#12141A] to-[#0A0A0C] flex flex-col justify-between p-6">
            {/* Top HUD Header */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>NODE // {project.id.toUpperCase()}</span>
              </span>
              <span className="text-neutral-500">
                {project.youtubeUrl ? 'VIDEO // DEMO' : project.simulationUrl ? 'REPO // SIMULATION' : '24FPS // STREAM'}
              </span>
            </div>

            {/* Center Radar / Perception Visualization Canvas Simulator */}
            <div className="relative flex flex-col items-center justify-center my-auto">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-[#00F0FF]/20 flex items-center justify-center">
                {/* Rotating scanner sweep */}
                <div
                  className="absolute inset-0 rounded-full border-t border-[#00F0FF]/80 animate-spin"
                  style={{ animationDuration: '6s' }}
                />
                <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#FF5500]/40 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                  </div>
                </div>
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-white/10" />
                  <div className="absolute h-full w-[1px] bg-white/10" />
                </div>
              </div>

              <div className="mt-3 font-mono text-[11px] text-[#00F0FF]/80 tracking-wider text-center max-w-xs truncate">
                {project.tag}
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/5 pt-3">
              <span>{project.period || 'M.TECH IITK'}</span>
              <span className="text-white/60">
                {project.youtubeUrl ? 'YOUTUBE VERIFIED' : 'ACTIVE BUILD'}
              </span>
            </div>
          </div>

          {/* Interactive Play Overlay for Demo */}
          {(project.hasDemo || project.youtubeUrl || project.simulationUrl) && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handleInspectClick}
                className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white text-black font-sans font-semibold text-sm hover:bg-[#00F0FF] transition-colors shadow-2xl scale-95 group-hover:scale-100 duration-300"
              >
                {project.youtubeUrl ? (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>Watch Simulation Video</span>
                  </>
                ) : project.simulationUrl ? (
                  <>
                    <GitBranch size={16} />
                    <span>Inspect Simulation Code</span>
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    <span>Launch Telemetry Feed</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Text Content Column */}
        <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
                {project.tag}
              </span>
              {project.period && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10">
                  {project.period}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              {project.title}
            </h3>

            {/* Course Meta & Professor */}
            {project.courseMeta && (
              <div className="mt-1 font-mono text-xs text-[#FF5500] font-medium tracking-wide">
                {project.courseMeta}
                {project.instructor && <span className="text-neutral-400"> — {project.instructor}</span>}
              </div>
            )}

            {project.tagline && (
              <p className="mt-2 text-sm sm:text-base text-neutral-400 font-light">
                {project.tagline}
              </p>
            )}
          </div>

          <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            {project.description}
          </p>

          {/* Key Contributions */}
          <div className="space-y-2">
            {project.keyContributions.map((point, i) => (
              <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 size={15} className="text-[#00F0FF] shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>

          {/* Metrics Badges if present */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <div className="font-mono text-[10px] uppercase text-neutral-500">{m.label}</div>
                  <div className="font-sans font-semibold text-white text-sm sm:text-base mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.youtubeUrl ? (
              <MagneticButton
                onClick={() => setDemoModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-[#00F0FF] transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Play size={14} fill="currentColor" />
                  <span>Inspect Simulation</span>
                </span>
              </MagneticButton>
            ) : project.simulationUrl ? (
              <MagneticButton
                href={project.simulationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-[#00F0FF] transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <ExternalLink size={14} />
                  <span>Inspect Simulation</span>
                </span>
              </MagneticButton>
            ) : project.hasDemo ? (
              <MagneticButton
                onClick={() => setDemoModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-[#00F0FF] transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Eye size={14} />
                  <span>Inspect Simulation</span>
                </span>
              </MagneticButton>
            ) : null}

            {project.youtubeUrl && (
              <MagneticButton
                href={project.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 font-sans text-xs font-medium hover:text-white hover:border-[#00F0FF]/50 transition-colors"
              >
                <span className="flex items-center space-x-1.5">
                  <Video size={13} />
                  <span>YouTube</span>
                </span>
              </MagneticButton>
            )}

            {project.simulationUrl && (
              <MagneticButton
                href={project.simulationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 font-sans text-xs font-medium hover:text-white hover:border-[#00F0FF]/50 transition-colors"
              >
                <span className="flex items-center space-x-1.5">
                  <GitBranch size={13} />
                  <span>Repository</span>
                </span>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>

      {/* Interactive Simulation / Video Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl rounded-2xl bg-[#121214] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <div>
                  <h4 className="font-sans font-bold text-white text-lg">{project.title}</h4>
                  <p className="font-mono text-xs text-neutral-400">
                    {project.courseMeta || 'CosysAirSim Simulation + Perception Engine'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video or Canvas Demo Screen */}
            {youtubeId ? (
              <div className="relative w-full aspect-video rounded-xl bg-black border border-white/10 overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-xl bg-black border border-white/10 overflow-hidden flex flex-col justify-between p-6">
                <div className="flex justify-between items-start font-mono text-xs text-[#00F0FF]">
                  <div>
                    <div>SIM: ACTIVE</div>
                    <div>ROS2_SYNC: 100HZ</div>
                  </div>
                  <div className="text-right text-emerald-400">
                    <div>PERCEPTION: ONLINE</div>
                    <div>PRECISION: OPTIMAL</div>
                  </div>
                </div>

                <div className="relative mx-auto my-auto text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-[#00F0FF] flex items-center justify-center animate-spin">
                    <Terminal size={24} className="text-[#00F0FF]" />
                  </div>
                  <div className="mt-4 font-mono text-xs text-white">{project.title}</div>
                </div>

                <div className="flex justify-between font-mono text-[10px] text-neutral-500 border-t border-white/10 pt-2">
                  <span>TELEMETRY FEED</span>
                  <span>STATUS: NOMINAL</span>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-6 flex items-center justify-between">
              {project.youtubeUrl && (
                <a
                  href={project.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-[#00F0FF] hover:underline"
                >
                  <ExternalLink size={13} />
                  <span>Open directly on YouTube</span>
                </a>
              )}
              {project.simulationUrl && (
                <a
                  href={project.simulationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-[#00F0FF] hover:underline"
                >
                  <GitBranch size={13} />
                  <span>View Repository Code</span>
                </a>
              )}
              <button
                onClick={() => setDemoModalOpen(false)}
                className="ml-auto px-6 py-2 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-[#00F0FF] transition-colors"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
