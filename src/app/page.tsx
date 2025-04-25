import Introduction from '@/components/Introduction';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ExperienceTimeline from '@/components/ExperienceTimeline'; // Import the new component
import ContactForm from '@/components/ContactForm';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl space-y-16 md:space-y-24">
      <Introduction />
      <Separator className="bg-primary/30" />
      <Projects />
      <Separator className="bg-primary/30" />
      <Skills />
      <Separator className="bg-primary/30" />
      <ExperienceTimeline /> {/* Add the ExperienceTimeline component */}
      <Separator className="bg-primary/30" />
      <ContactForm />
    </div>
  );
}
