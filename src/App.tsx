import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Research } from './components/sections/Research';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2E9E4] dark:bg-[#0D1117] text-[#22223B] dark:text-[#E6EDF3] font-sans selection:bg-[#4A4E69]/20 dark:selection:bg-[#00D9FF]/30 selection:text-[#4A4E69] dark:selection:text-[#00D9FF] transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
