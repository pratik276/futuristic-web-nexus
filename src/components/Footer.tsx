import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6 flex items-center space-x-2">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-neon-purple rounded-full animate-spin-slow opacity-50"></div>
              <div className="absolute inset-1 border border-neon-blue rounded-full animate-spin-slow opacity-50" style={{ animationDirection: 'reverse', animationDuration: '10s' }}></div>
              <span className="text-white font-bold relative z-10">P</span>
            </div>
            <span className="font-mono text-white text-lg font-bold tracking-wider">PRATIK OM SHRESTHA</span>
          </div>
          
          {/* Separator */}
          <div className={cn(
            "h-[1px] w-20 mb-6",
            "bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
          )}></div>
          
          {/* Copyright */}
          <p className="text-white/20 font-mono text-xs tracking-wide">
            &copy; Pratik Om Shrestha @ {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
