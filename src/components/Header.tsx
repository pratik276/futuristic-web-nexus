
import { useState, useEffect } from 'react';
import FuturisticButton from './FuturisticButton';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 flex items-center justify-center">
            <div className="absolute inset-0 border border-neon-purple rounded-full animate-spin-slow opacity-50"></div>
            <div className="absolute inset-1 border border-neon-blue rounded-full animate-spin-slow opacity-50" style={{ animationDirection: 'reverse', animationDuration: '10s' }}></div>
            <span className="text-white font-bold relative z-10">P</span>
          </div>
          <span className="font-mono text-white text-lg font-bold tracking-wider">PRATIK.OS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white font-mono text-sm tracking-wider transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className="text-white/80 hover:text-white font-mono text-sm tracking-wider transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
            className="text-white/80 hover:text-white font-mono text-sm tracking-wider transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            CONTACT
          </Link>
          <FuturisticButton 
            variant="outline" 
            size="sm"
            onClick={() => window.open('mailto:contact@pratikomshrestha.com.np', '_blank')}
          >
            CONNECT
          </FuturisticButton>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white/80 hover:text-white font-mono text-sm tracking-wider py-2 border-b border-white/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              className="text-white/80 hover:text-white font-mono text-sm tracking-wider py-2 border-b border-white/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ABOUT
            </Link>
            <Link 
              to="/contact" 
              className="text-white/80 hover:text-white font-mono text-sm tracking-wider py-2 border-b border-white/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              CONTACT
            </Link>
            <FuturisticButton 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                window.open('mailto:contact@pratikomshrestha.com.np', '_blank');
              }}
            >
              CONNECT
            </FuturisticButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
