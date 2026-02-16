import { Link } from "react-router-dom";

interface LabGlassButtonProps {
  id: string;
  name: string;
  position: string;
  index: number;
  logo?: string;
}

export function LabGlassButton({ id, name, position, index, logo }: LabGlassButtonProps) {
  return (
    <div
      className={`absolute ${position} animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/lab/${id}`}>
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center min-w-[120px] min-h-[50px]">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-8 w-auto object-contain max-w-[100px]"
              />
            ) : (
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {name}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

