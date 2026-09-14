import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import ProcessScrolly from "@/components/sections/ProcessScrolly";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#EDEDED] overflow-x-hidden">
      {/* 1. Hero / Ambient Video Loop Canvas Section */}
      <Hero />

      {/* 2. About Section: Bio & Metric Grid */}
      <About />

      {/* 3. Featured Projects / Work Showcase */}
      <Projects />

      {/* 4. ScrollyCanvas Scrollytelling Deep-Dive Section */}
      <ProcessScrolly />

      {/* 5. Skills & Tools Matrix & Marquee Strip */}
      <Skills />

      {/* 6. Education & Trajectory Timeline */}
      <Timeline />

      {/* 7. Contact & Transmission CTA */}
      <Contact />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
