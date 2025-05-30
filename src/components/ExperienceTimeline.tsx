
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
    title: "Back End Developer",
    company: "Sabay Digital",
    location: "Phnom Penh, Cambodia (On-site)",
    duration: "Feb 2024 - Present",
    description: [
      "Worked with technologies including NestJS, Nuxt.js, and PHP Frameworks."
    ]
  },
  {
    title: "Full-stack Developer",
    company: "Pointer Property",
    location: "Phnom Penh, Cambodia (On-site)",
    duration: "Oct 2023 - Feb 2024",
    description: []
  },
  {
    title: "Product Manager",
    company: "YouAdMe",
    location: "Phnom Penh, Cambodia",
    duration: "Jul 2022 - Oct 2023",
    description: []
  },
  {
    title: "Product Developer x Product Researcher",
    company: "Sabay Digital Corporation",
    location: "Phnom Penh, Cambodia",
    duration: "Dec 2021 - Jul 2022",
    description: [
      "Conducted technology research for products.",
      "Performed data analytics.",
      "Researched and tested new technologies.",
      "Designed APIs and databases.",
      "Documented processes and solutions.",
      "Utilized databases like MySQL, MongoDB, PostgreSQL, and Clickhouse.",
      "Worked with languages and frameworks including Javascript, Dart, JSX, PHP, Python, R, Bash, Flutter, React Native, and Nodejs.",
      "Used tools such as Docker, Postman, Metabase, and R Studio.",
      "Applied Scrum and Kanban methodologies."
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Sabay Digital Corporation",
    location: "Cambodia",
    duration: "Aug 2021 - Dec 2021",
    description: [
      "Developed both frontend and backend components.",
      "Conducted unit testing.",
      "Worked with technologies like Reactjs, Nodejs, GraphQL, Mocha, and Jest.",
      "Managed databases including MySQL and MongoDB.",
      "Utilized Javascript, HTML, and CSS.",
      "Implemented Rest API, Graph API, and MVC architecture.",
      "Used tools like Docker and Postman."
    ]
  },
  {
    title: "Blockchain x Backend Developer",
    company: "Sabay Digital Corporation",
    location: "Cambodia",
    duration: "Mar 2020 - Jul 2021",
    description: [
      "Developed a new payment gateway with payment provider (SSN).",
      "Refactored old projects.",
      "Conducted unit testing.",
      "Developed and updated SDKs.",
      "Developed APIs.",
      "Worked with Stellar blockchain, Nodejs, and Laravel.",
      "Managed databases like MySQL and MongoDB.",
      "Used Javascript, PHP, HTML, CSS, and Pug.",
      "Implemented Rest API, Soap API, and MVC architecture."
    ]
  },
  {
    title: "Back-end Developer",
    company: "OPICTS",
    location: "Phnom Penh, Cambodia",
    duration: "Aug 2019 - Dec 2019",
    description: []
  }
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
      <div className="relative pt-4">
        {/* Vertical Line - Desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 hidden md:block -z-10"></div>
         {/* Vertical Line - Mobile (simplified, centered for layout consistency) */}
         <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 md:hidden -z-10"></div>


        <div className="space-y-12 md:space-y-0">
          {experienceData.map((entry, index) => {
            const isOdd = index % 2 !== 0; // Determines if item is on the right (odd) or left (even) for desktop

            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={cn(
                  "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 items-start relative mb-12 md:mb-8", // Reduced md:mb-0 to md:mb-8 for spacing
                  "fade-in-on-scroll",
                   visibleItems[index] && "is-visible"
                )}
                style={{ animationDelay: `${index * 200}ms`, transitionDelay: `${index * 150}ms` }}
              >
                {/* Content Card - Left or Right for Desktop, Full width for Mobile */}
                <div className={cn(
                  "flex w-full", // Full width on mobile
                  "md:col-start-auto md:max-w-md", // Max width on desktop
                  isOdd ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end'
                )}>
                  <Card className={cn(
                    "bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary w-full",
                     "ml-16 md:ml-0", // Margin for mobile to align with the dot
                    isOdd ? 'md:text-left' : 'md:text-right'
                  )}>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{entry.title}</CardTitle>
                      <CardDescription className="text-secondary-foreground">
                        {entry.company} {entry.location && `· ${entry.location}`}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">{entry.duration}</p>
                    </CardHeader>
                    <CardContent>
                       <ul className={cn(
                        "list-disc space-y-1 text-foreground/80 text-sm",
                         "list-inside text-left", // Always list-inside and text-left
                         isOdd ? "md:ml-0" : "md:ml-0 md:list-none md:text-right" // Keep text-right for even desktop items
                      )}>
                        {entry.description.map((point, i) => (
                          <li key={i} className={cn(isOdd ? "md:ml-0" : "md:mr-0")}>{point}</li>
                        ))}
                         {entry.description.length === 0 && (
                          <li className="text-muted-foreground/70 italic">Details available upon request.</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Dot for Desktop - Aligned with Card Center */}
                <div className="hidden md:flex md:col-start-2 row-start-1 items-center justify-center h-full relative">
                   <div className="w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary z-10"></div>
                </div>

                {/* Dot for Mobile - Positioned to the left of the card */}
                <div className="md:hidden absolute left-8 top-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
