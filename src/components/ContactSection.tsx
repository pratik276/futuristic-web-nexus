
import { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import FuturisticButton from './FuturisticButton';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@pratikomshrestha.com.np';
    toast({
      title: "Email Client Opened",
      description: "Redirecting to your email client...",
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-2 flex items-center justify-center">
          <div className="h-[1px] w-10 bg-neon-purple/50"></div>
          <span className="mx-4 text-neon-purple font-mono text-sm">CONTACT</span>
          <div className="h-[1px] w-10 bg-neon-purple/50"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Touch</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <FuturisticCard className="p-8 text-center" glowing>
            <div className="mb-8">
              <p className="text-white/80 mb-6">
                If you have any questions or would like to work with me, feel free to reach out!
              </p>
              
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 backdrop-blur-sm border border-white/10 mb-6">
                <Mail className="w-10 h-10 text-neon-purple" />
              </div>
              
              <p className="font-mono text-neon-blue text-lg mb-2">contact@pratikomshrestha.com.np</p>
              
              <div className="mt-8">
                <FuturisticButton
                  onClick={handleEmailClick}
                  size="lg"
                  glowing
                  className="mx-auto"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="flex items-center">
                    Contact Me <Send className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </span>
                </FuturisticButton>
              </div>
            </div>
          </FuturisticCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
