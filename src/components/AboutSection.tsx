
import FuturisticCard from './FuturisticCard';
import { Facebook, Linkedin, Twitter, Instagram, Coffee } from 'lucide-react';

const AboutSection = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: 'http://facebook.com/pratikomshrestha'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/in/pratikomshrestha/'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://x.com/Pratich'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://www.instagram.com/pratikomshrestha/'
    },
    {
      name: 'Buy Me a Coffee',
      icon: <Coffee className="w-5 h-5" />,
      url: 'https://buymeacoffee.com/pratich'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Glowing background effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 blur-[120px] opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2 flex items-center justify-center">
            <div className="h-[1px] w-10 bg-neon-purple/50"></div>
            <span className="mx-4 text-neon-purple font-mono text-sm">ABOUT ME</span>
            <div className="h-[1px] w-10 bg-neon-purple/50"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Professional</span> Background
          </h2>
          
          <FuturisticCard className="p-6 md:p-8 mb-12" glowing>
            <div className="space-y-6">
              <p className="text-white/80 leading-relaxed">
                Experienced Project Manager with 10+ years in Nepal's Telecommunications and IT industry, leading high-impact projects with global partners like Huawei and Ncell Axiata. Skilled in project management, business analysis, finance, and strategic leadership, I drive efficiency, profitability, and innovation.
              </p>
              
              <p className="text-white/80 leading-relaxed">
                Passionate about problem-solving and digital transformation, I turn business objectives into actionable strategies. Beyond work, I enjoy exploring emerging tech, traveling, and hiking. Let's connect to create strategic success!
              </p>
            </div>
            
            {/* Futuristic data visualization elements */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Experience', value: '10+', unit: 'Years' },
                { label: 'Projects', value: '50+', unit: 'Completed' },
                { label: 'Industries', value: '3+', unit: 'Sectors' },
                { label: 'Clients', value: '20+', unit: 'Satisfied' }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-3 rounded-md bg-white/5 border border-white/10">
                  <span className="text-2xl md:text-3xl font-bold text-neon-purple">{stat.value}</span>
                  <span className="text-xs text-white/60 font-mono mt-1">{stat.unit}</span>
                  <span className="text-sm text-white/80 mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </FuturisticCard>
          
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center font-mono text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Connect</span> with Me
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={link.name}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-neon-purple group-hover:bg-black/20 group-hover:scale-110 group-hover:neon-border">
                    <div className="text-white/70 group-hover:text-neon-purple transition-colors">
                      {link.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
