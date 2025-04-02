
import { cn } from "@/lib/utils";

interface FuturisticCardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  animated?: boolean;
}

const FuturisticCard = ({
  children,
  className,
  glowing = false,
  animated = false,
}: FuturisticCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-md backdrop-blur-md bg-black/50 border border-white/10 overflow-hidden",
        glowing && "neon-border",
        animated && "hover:scale-[1.02] transition-transform duration-300",
        className
      )}
    >
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-neon-purple to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-neon-purple to-transparent" />
      </div>

      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-neon-purple to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-neon-purple to-transparent" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-x-0 h-[1px] bg-neon-purple/50 animate-scan" />
      </div>

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FuturisticCard;
