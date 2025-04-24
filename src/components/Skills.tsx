import { Code, Database, LayoutTemplate, Cog } from 'lucide-react';

const skills = [
  { name: "React", icon: <Code /> },
  { name: "JavaScript", icon: <Code /> },
  { name: "TypeScript", icon: <Code /> },
  { name: "HTML5", icon: <Code /> },
  { name: "CSS3 / Tailwind", icon: <LayoutTemplate /> },
  { name: "Next.js", icon: <Code /> },
  { name: "Node.js", icon: <Cog /> },
  { name: "Git / GitHub", icon: <Cog /> },
  // Add more skills as needed
];

export default function Skills() {
  return (
    <section id="skills" className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Skills & Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 md:p-6 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg text-center transition-all duration-300 neon-glow-primary hover:bg-primary/10 hover:border-primary/50"
          >
            <div className="mb-2 text-primary h-8 w-8">{skill.icon}</div>
            <span className="text-sm md:text-base font-medium text-foreground">{skill.name}</span>
          </div>
        ))}
      </div>
        {/* Isometric Code Snippet Illustration Placeholder */}
        <div className="mt-12 flex justify-center">
             <div className="relative w-64 h-40 md:w-80 md:h-48 bg-card/50 rounded-lg border border-primary/30 transform -rotate-[5deg] skew-x-[-10deg] shadow-lg neon-glow-primary p-4 overflow-hidden">
                 <div className="absolute top-2 left-2 flex space-x-1">
                     <span className="w-3 h-3 rounded-full bg-red-500"></span>
                     <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                     <span className="w-3 h-3 rounded-full bg-green-500"></span>
                 </div>
                <pre className="text-xs text-primary/80 mt-6 transform rotate-[5deg] skew-x-[10deg]"><code>
                  {`const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};

greet('World');`}
                </code></pre>
             </div>
        </div>
    </section>
  );
}
