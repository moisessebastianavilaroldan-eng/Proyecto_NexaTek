import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { ProblemsSolutions } from '../components/sections/ProblemsSolutions';
import { Services } from '../components/sections/Services';
import { Projects } from '../components/sections/Projects';
import { Team } from '../components/sections/Team';
import { Methodology } from '../components/sections/Methodology';
import { TechStack } from '../components/sections/TechStack';
import { Faq } from '../components/sections/Faq';
import { CtaBanner } from '../components/sections/CtaBanner';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  const location = useLocation();

  // Scroll suave al ancla si la URL contiene un hash (ej: /#contacto)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <ProblemsSolutions />
        <Services />
        <Projects />
        <Team />
        <Methodology />
        <TechStack />
        <Faq />
        <CtaBanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
