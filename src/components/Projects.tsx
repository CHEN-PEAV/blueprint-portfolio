import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio showcasing projects and skills, built with Next.js and Tailwind CSS.",
    githubUrl: "https://github.com/PONDARA/portfolio",
    // liveUrl: "YOUR_LIVE_URL", // Add your live URL if available
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "React Projects",
    description: "A collection of various small to medium-sized projects built using React and related technologies.",
    githubUrl: "https://github.com/PONDARA/react-projects",
    tech: ["React", "JavaScript", "CSS", "Various APIs"],
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <section id="projects" className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Projects Showcase</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
              <CardDescription className="text-muted-foreground min-h-[40px]">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                <Button variant="outline" size="sm" asChild className="neon-glow-accent hover:bg-accent/10 hover:text-accent border-accent/50 text-accent">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild className="neon-glow-accent hover:bg-accent/10 hover:text-accent border-accent/50 text-accent">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
