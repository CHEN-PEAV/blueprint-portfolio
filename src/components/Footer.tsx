import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 mt-16 border-t border-primary/20 bg-background">
      <div className="container mx-auto px-4 text-center text-muted-foreground flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Pondara. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="https://github.com/PONDARA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors neon-glow-primary rounded-full p-1">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </Link>
           {/* Add LinkedIn link if available */}
           {/*
           <Link href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors neon-glow-primary rounded-full p-1">
             <Linkedin size={20} />
             <span className="sr-only">LinkedIn</span>
           </Link>
           */}
        </div>
      </div>
    </footer>
  );
}
