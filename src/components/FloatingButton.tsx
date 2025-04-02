
import { useEffect, useRef, useState } from 'react';
import { Rocket } from 'lucide-react';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button only when scrolled down
        if (entry.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      observer.observe(heroSection);
    }
    
    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const handleClick = () => {
    window.location.href = 'mailto:contact@pratikomshrestha.com.np';
  };

  return (
    <div 
      ref={buttonRef}
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-40 transition-all duration-500 cursor-pointer ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full opacity-75 blur-sm animate-pulse"></div>
        <div className="relative flex items-center justify-center w-14 h-14 bg-black/80 rounded-full border border-white/20 backdrop-blur">
          <Rocket className="w-6 h-6 text-white transform -rotate-45" />
        </div>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
        <div className="text-xs font-mono text-neon-purple animate-pulse">Let's Chat</div>
      </div>
    </div>
  );
};

export default FloatingButton;
