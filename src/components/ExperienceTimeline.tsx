
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
    title: "Full-Stack Developer",
    duration: "March 2024 - Present",
    location: "Remote",
    description: [
      "Design, develop, and maintain full-stack web applications for diverse clients, utilizing modern frameworks like React, Next.js, and Node.js.",
      "Manage end-to-end project lifecycles, from consultation and requirements gathering to deployment and ongoing support.",
      "Specialize in creating responsive, user-friendly interfaces and robust, scalable backend systems to deliver high-quality digital solutions."
    ],
  },
  {
    company: "Sokal",
    title: "Software Engineer",
    duration: "October 2022 - March 2024",
    location: "Raleigh-Durham, NC (Hybrid)",
    description: [
      "Spearheaded the development and lifecycle management of over 100 dealer websites using a proprietary CMS, significantly enhancing functionality and user engagement metrics.",
      "Collaborated effectively within an Agile framework with cross-functional teams, including UI/UX designers and project managers, to translate complex client requirements into high-quality web features.",
      "Engineered and seamlessly integrated diverse third-party APIs, substantially improving website capabilities and enabling sophisticated data-driven user experiences.",
      "Provided expert-level technical support and systematic troubleshooting for website issues, ensuring optimal performance, uptime, and high levels of client satisfaction.",
      "Actively participated in peer code reviews, promoting best practices and maintaining high standards for code quality, readability, and maintainability across projects."
    ],
  },
  {
    company: "Sokal",
    title: "Software Engineer Intern",
    duration: "May 2022 - August 2022",
    location: "Raleigh-Durham, NC (On-site)",
    description: [
      "Contributed to the development and maintenance of dealer websites using the company's content management system.",
      "Gained hands-on experience with core web technologies (HTML, CSS, JavaScript, PHP) and Agile development practices.",
      "Assisted senior engineers with debugging, feature implementation, and quality assurance testing."
    ],
  },
  {
    company: "Dev_Able",
    title: "Web Developer Intern",
    duration: "May 2021 - August 2021",
    location: "Greensboro, NC (Remote)",
    description: [
      "Supported the development team in building and testing web applications for small business clients.",
      "Utilized HTML, CSS, JavaScript, and PHP to create and modify web pages based on project specifications.",
      "Actively participated in team meetings, contributing to project planning and collaborative problem-solving."
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
      <div className="relative pt-4">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-12 md:space-y-0">
          {experienceData.map((entry, index) => {
            const isOdd = index % 2 !== 0; // Determines if item is on the right (odd) or left (even)

            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={cn(
                  "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 items-start relative mb-12 md:mb-0",
                  "fade-in-on-scroll",
                   visibleItems[index] && "is-visible"
                )}
                style={{ animationDelay: `${index * 250}ms`, transitionDelay: `${index * 200}ms` }}
              >
                {/* Content Card - Left or Right */}
                <div className={cn(
                  "md:col-start-auto flex",
                  isOdd ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end'
                )}>
                  <Card className={cn(
                    "bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary w-full max-w-md",
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
                        isOdd ? "list-inside text-left" : "list-outside text-right md:list-none md:text-right"
                      )}>
                        {entry.description.map((point, i) => (
                          <li key={i} className={cn(isOdd ? "ml-4 md:ml-0" : "mr-4 md:mr-0")}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Dot for Desktop */}
                <div className="hidden md:flex md:col-start-2 row-start-1 items-center justify-center h-full relative">
                   <div className="w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary z-10"></div>
                </div>

                 {/* Connector Line for Mobile (simplified) - hidden on md and up */}
                 <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 -z-10"></div>
                 {/* Dot for Mobile - hidden on md and up */}
                 <div className="md:hidden absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary transform -translate-x-1/2 -translate-y-1/2"></div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
