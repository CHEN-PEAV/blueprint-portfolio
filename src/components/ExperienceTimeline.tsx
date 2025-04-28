
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
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = React.useState<boolean[]>(
    Array(experienceData.length).fill(false)
  );

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(item); // Stop observing once visible
            }
          },
          {
            root: null, // Use viewport as root
            rootMargin: '0px',
            threshold: 0.1, // Trigger when 10% of the element is visible
          }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    // Cleanup observers on component unmount
    return () => {
      observers.forEach((observer, index) => {
        const item = itemRefs.current[index];
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section id="experience" className="space-y-8" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Experience Timeline</h2>
      {/* Vertical Line Container */}
      <div className="relative pt-4">
        {/* Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 hidden md:block"></div>

        {/* Grid for Timeline Items - Changed items-start to items-center */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 md:gap-y-12 items-center">
          {experienceData.map((entry, index) => {
            const isOdd = index % 2 !== 0; // Determine if item is on the left or right (for desktop)

            return (
              <React.Fragment key={index}>
                {/* Timeline Item Content (Left/Right) */}
                <div
                  ref={el => itemRefs.current[index] = el}
                  className={cn(
                    "md:text-right fade-in-on-scroll", // Base class for fade-in
                    isOdd ? 'md:col-start-1' : 'md:col-start-3',
                    visibleItems[index] && 'is-visible', // Visibility class
                    // Removed margin-based positioning logic
                  )}
                  style={{ animationDelay: `${index * 150}ms`, transitionDelay: `${index * 150}ms` }} // Stagger animation delay
                >
                  <Card className={cn(
                    "bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary w-full max-w-md mx-auto", // Centering on mobile, max-width
                    isOdd ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left' // Align left/right and text on desktop
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

                {/* Center Dot and Connector for Desktop - Kept self-center */}
                 <div className="hidden md:flex md:col-start-2 self-center items-center justify-center h-full">
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
