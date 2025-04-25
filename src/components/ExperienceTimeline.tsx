"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ExperienceEntry {
  company: string;
  title: string;
  duration: string;
  description: string[];
  location?: string;
}

const experienceData: ExperienceEntry[] = [
  {
    company: "Freelance",
    title: "Full-stack Developer",
    duration: "Mar 2024 - Present · 5 mos",
    location: "Remote",
    description: [
      "Developing and maintaining web applications for various clients.",
      "Utilizing modern frameworks like React, Next.js, and Node.js.",
      "Focusing on creating responsive, user-friendly interfaces and robust backend systems."
    ],
  },
  {
    company: "Sokal",
    title: "Software Engineer",
    duration: "Oct 2022 - Mar 2024 · 1 yr 6 mos",
    location: "Raleigh-Durham, North Carolina Area · Hybrid",
    description: [
      "Played a pivotal role in developing and managing over 100 dealer websites using Sokal's proprietary CMS.",
      "Collaborated closely with designers and project managers to translate requirements into functional web features.",
      "Specialized in integrating third-party APIs, enhancing website functionality and user experience.",
      "Provided technical support and troubleshooting for website issues, ensuring optimal performance and client satisfaction."
    ],
  },
    {
    company: "Sokal",
    title: "Software Engineer Intern",
    duration: "May 2022 - Aug 2022 · 4 mos",
    location: "Raleigh-Durham, North Carolina Area · On-site",
    description: [
      "Contributed to the development and maintenance of dealer websites within the company's CMS.",
      "Gained hands-on experience with web development technologies and agile methodologies.",
      "Assisted senior engineers in debugging and implementing new features."
    ],
  },
  {
    company: "Dev_Able",
    title: "Web Developer Intern",
    duration: "May 2021 - Aug 2021 · 4 mos",
    location: "Greensboro, North Carolina · Remote",
    description: [
      "Assisted in the development and testing of web applications.",
      "Worked with HTML, CSS, JavaScript, and PHP to build and modify web pages.",
      "Participated in team meetings and contributed to project planning."
    ],
  },
];

export default function ExperienceTimeline() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element comes into view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // No need to observe anymore once visible
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section id="experience" className="space-y-8" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Experience Timeline</h2>
      {/* Vertical Line */}
      <div className="relative pt-4">
        {/* Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 md:gap-y-12">
          {experienceData.map((entry, index) => {
            const isOdd = index % 2 !== 0; // Determine if item is on the left or right (for desktop)
            const year = parseInt(entry.duration.match(/(\d{4})/)?.[0] || '0', 10); // Extract year
            const isDown = year <= 2021; // Example: Place 2021 and earlier downwards
            const is2022Up = year >= 2022; // Example: Place 2022 and later upwards

            return (
              <React.Fragment key={index}>
                {/* Timeline Item Content (Left/Right) */}
                <div className={cn(
                  "md:text-right fade-in-on-scroll",
                  isOdd ? 'md:col-start-1' : 'md:col-start-3',
                  isVisible && 'is-visible' // Add is-visible class when scrolled into view
                )}
                 style={{ transitionDelay: `${index * 150}ms` }} // Stagger animation
                 >
                  <Card className={cn(
                    "bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary w-full max-w-md",
                    isOdd ? 'md:ml-auto' : 'md:mr-auto',
                    // Positioning based on year for desktop
                    isDown && !isOdd && 'md:mt-12',
                    is2022Up && isOdd && 'md:mb-12'

                  )}>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{entry.title}</CardTitle>
                      <CardDescription className="text-secondary-foreground">
                        {entry.company} {entry.location && `· ${entry.location}`}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">{entry.duration}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1 text-foreground/80 text-sm text-left">
                        {entry.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Dot and Line for Desktop */}
                <div className="hidden md:flex md:col-start-2 items-center justify-center relative">
                   <div className="w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary z-10"></div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
