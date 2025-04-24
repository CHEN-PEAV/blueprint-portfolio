import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop } from 'lucide-react';

export default function Introduction() {
  return (
    <section id="introduction" className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-foreground">
          Hi, I’m Pondara
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          A Web Developer crafting digital experiences.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          I specialize in building modern, responsive, and performant web applications using cutting-edge technologies. Let's bring your ideas to life!
        </p>
      </div>
      <div className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
         {/* Isometric Laptop Illustration Placeholder */}
         <div className="absolute inset-0 flex items-center justify-center bg-card/50 rounded-lg border border-primary/30 transform rotate-[-8deg] skew-x-[-15deg] shadow-lg neon-glow-primary">
            <Laptop size={80} className="text-primary transform -rotate-[8deg] -skew-x-[-15deg]" />
            <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded shadow-md transform rotate-[-8deg] skew-x-[-15deg]">
             Code
            </div>
         </div>
      </div>
    </section>
  );
}
