
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format, differenceInMonths, differenceInYears } from 'date-fns';

interface ExperienceEntry {
  title: string;
  company: string;
  location?: string;
  startDate: string; // Format: "Month YYYY" e.g., "Feb 2024"
  endDate: string;   // Format: "Month YYYY" or "Present"
  description: string[];
}

const experienceData: ExperienceEntry[] = [
  {
    title: "Software Project Lead X Social Media Marketer",
    company: "REAM-tn5",
    location: "Phnom Penh, Cambodia (On-site)",
    startDate: "Feb 2025",
    endDate: "Present",
    description: [
      "Led and built software applications, managing development teams, defining project scope, setting timelines, overseeing coding and testing, ensuring quality, with skills in project management, technical proficiency, software architecture, programming languages, team leadership, problem-solving, communication, and risk management.",
      "Established a consistent online presence, built an engaged community, enhanced brand visibility through social media, including content creation (targeted content, professional videos), running ad campaigns, influencer collaborations, and analyzing data to optimize strategies, with skills in content strategy, copywriting, graphic design (or directing), video production, social media platform expertise, analytics, community management, advertising, and public relations."
    ]
  },
  {
    title: "Game Developer",
    company: "Adiussoft Co., Ltd.",
    location: "Phnom Penh, Cambodia (On-site)",
    startDate: "Nov 2024",
    endDate: "Feb 2025",
    description: [
      "Core Game Developer & Game Backend Developer using Golang, Nakama, Colyseus, Unity.",
      "Skills: Go (Programming Language), TypeScript, Unity, Nakama, Colyseus.",
      "Tools and Technologies: Golang, Nakama, Colyseus, Unity."
    ]
  },
  {
    title: "Back End Developer",
    company: "Sabay Digital",
    location: "Phnom Penh, Cambodia (On-site)",
    startDate: "Feb 2024",
    endDate: "Nov 2024",
    description: [
      "Developed a comprehensive Video & Audio Streaming Service (Sabayone API) with Strapi 5, Node.js, Kaltura, HLS, FFmpeg, Nginx, Docker, RSS & Apple Pay integration.",
      "Worked on: Sabayone API, Video and Audio streaming service, RSS Feed, Apple Pay.",
      "Tools and Technologies: Strapi 5, Nodejs, Nginx, Kaltura, FFmpeg, HLS (HTTP Live Streaming), Docker."
    ]
  },
  {
    title: "Full-stack Developer",
    company: "Pointer Property",
    location: "Phnom Penh, Cambodia (On-site)",
    startDate: "Oct 2023",
    endDate: "Feb 2024",
    description: []
  },
  {
    title: "Product Manager",
    company: "YouAdMe",
    location: "Phnom Penh, Cambodia",
    startDate: "Jul 2022",
    endDate: "Oct 2023",
    description: []
  },
  {
    title: "Product Developer x Product Researcher",
    company: "Sabay Digital Corporation",
    location: "Phnom Penh, Cambodia",
    startDate: "Dec 2021",
    endDate: "Jul 2022",
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
    startDate: "Aug 2021",
    endDate: "Dec 2021",
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
    startDate: "Mar 2020",
    endDate: "Jul 2021",
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
    startDate: "Aug 2019",
    endDate: "Dec 2019",
    description: []
  }
];

function formatDuration(startDateStr: string, endDateStr: string): string {
  const start = new Date(startDateStr);
  const end = endDateStr.toLowerCase() === "present" ? new Date() : new Date(endDateStr);

  const monthsTotal = differenceInMonths(end, start) + 1; // Add 1 to make it inclusive
  const years = Math.floor(monthsTotal / 12);
  const months = monthsTotal % 12;

  let durationString = "";
  if (years > 0) {
    durationString += `${years} yr${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (years > 0) durationString += " ";
    durationString += `${months} mo${months > 1 ? "s" : ""}`;
  }
  if (!durationString) { // Handle cases like same month start/end
    durationString = "1 mo";
  }

  const startFormatted = format(start, "MMM yyyy");
  const endFormatted = endDateStr.toLowerCase() === "present" ? "Present" : format(end, "MMM yyyy");

  return `${startFormatted} - ${endFormatted} · ${durationString}`;
}


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
              observer.unobserve(item);
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
          }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        const item = itemRefs.current[index];
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="experience" className="space-y-8" ref={sectionRef}>
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Experience Timeline</h2>
      <div className="relative pt-4">
        {/* Vertical Line - Desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 transform -translate-x-1/2 hidden md:block -z-10"></div>
        {/* Vertical Line - Mobile */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/30 md:hidden -z-10"></div>

        <div className="space-y-12 md:space-y-0">
          {experienceData.map((entry, index) => {
            const isOdd = index % 2 !== 0; // Right for odd, Left for even (desktop)

            return (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={cn(
                  "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 items-start relative mb-12 md:mb-8",
                  "fade-in-on-scroll",
                  visibleItems[index] && "is-visible"
                )}
                style={{ animationDelay: `${index * 200}ms`, transitionDelay: `${index * 150}ms` }}
              >
                {/* Content Card */}
                <div className={cn(
                  "flex w-full",
                  "md:col-start-auto md:max-w-md",
                  isOdd ? 'md:col-start-3 md:justify-start' : 'md:col-start-1 md:justify-end'
                )}>
                  <Card className={cn(
                    "bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary w-full",
                    "ml-16 md:ml-0", // Margin for mobile for dot alignment
                    isOdd ? 'md:text-left' : 'md:text-right'
                  )}>
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{entry.title}</CardTitle>
                      <CardDescription className="text-secondary-foreground">
                        {entry.company} {entry.location && `· ${entry.location}`}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">{formatDuration(entry.startDate, entry.endDate)}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className={cn(
                        "list-disc space-y-1 text-foreground/80 text-sm",
                        "list-inside text-left", // Always list-inside and text-left for bullet points
                        isOdd ? "md:ml-0" : "md:ml-0 md:list-none md:text-right" // Keep text-right for even desktop items, remove list style
                      )}>
                        {entry.description.length > 0 ? entry.description.map((point, i) => (
                          <li key={i} className={cn(isOdd ? "md:ml-0" : "md:mr-0")}>{point}</li>
                        )) : (
                          <li className="text-muted-foreground/70 italic">Details available upon request.</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Dot - Desktop */}
                <div className={cn(
                  "hidden md:flex md:col-start-2 row-start-1 items-center justify-center h-full relative"
                )}>
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary z-10"></div>
                </div>

                {/* Dot - Mobile */}
                <div className={cn(
                  "md:hidden absolute left-8 top-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary transform -translate-x-1/2 -translate-y-1/2 z-10"
                )}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

    