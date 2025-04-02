import { useEffect, useRef } from 'react';
import FuturisticButton from './FuturisticButton';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const basePath = import.meta.env.PROD ? '/futuristic-web-nexus' : '';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;

      // Calculate mouse position relative to the center of the container
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;

      // Apply the parallax effect to the image
      imageRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-10 animate-grid-line"></div>

      {/* Radiating glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 blur-[100px] animate-glow"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono tracking-tight text-white text-glow">
            <span className="block">Pratik Om</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan">Shrestha</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg">
            <span className="font-mono text-neon-purple">&gt;</span> "When going gets tough, the tough do what they do. While the wise find the game in it"
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <FuturisticButton size="lg" glowing onClick={scrollToAbout}>
              Learn More <ArrowDown className="ml-2 h-4 w-4" />
            </FuturisticButton>
          </div>
        </div>
        
        <div ref={containerRef} className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-neon-purple/30 to-neon-blue/10 p-1">
            <div className="absolute inset-0 rounded-full border border-white/20 overflow-hidden backdrop-blur-sm">
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-full border-4 border-neon-purple/30 animate-spin-slow"></div>
              <div className="absolute inset-3 rounded-full border-2 border-neon-blue/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
            </div>
            
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                ref={imageRef}
                src={`${basePath}/brp.jpg`}
                alt="Pratik Om Shrestha"
                className="w-full h-full object-cover"
              />
              
              {/* Add a futuristic scan effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 to-transparent opacity-60"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-[2px] bg-neon-purple/30 animate-scan"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-[2px] h-16 bg-gradient-to-b from-neon-purple/80 to-transparent animate-pulse"></div>
        <div className="mt-2 text-white/50 text-sm font-mono tracking-wider animate-pulse">SCROLL</div>
      </div>
    </section>
  );
};

export default HeroSection;
