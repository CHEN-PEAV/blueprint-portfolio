import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react'; // Using Briefcase icon for experience

interface ExperienceEntry {
  company: string;
  title: string;
  duration: string;
  description: string[];
  location?: string;
}

// Static data based on the provided LinkedIn profile
// NOTE: Fetching live data from LinkedIn/GitHub requires APIs and authentication,
// which is beyond the scope of this static implementation.
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
  return (
    <section id="experience" className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tight text-primary">Experience Timeline</h2>
      <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-primary/30 after:left-0 after:transform after:-translate-x-1/2">
        {experienceData.map((entry, index) => (
          <div key={index} className="relative mb-8 pl-8">
            <div className="absolute left-0 top-1 transform -translate-x-[calc(50%+1px)]">
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-background neon-glow-primary"></div>
            </div>
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 neon-glow-primary">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">{entry.title}</CardTitle>
                <CardDescription className="text-secondary-foreground">
                  {entry.company} {entry.location && `· ${entry.location}`}
                </CardDescription>
                <p className="text-sm text-muted-foreground">{entry.duration}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-foreground/80 text-sm">
                    {entry.description.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
