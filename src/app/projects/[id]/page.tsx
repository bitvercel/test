import { Suspense } from "react";
import { ProjectDetails } from "@/components/projects/ProjectDetails";

// Mock data for static params generation
const projects = [
  {
    id: "1",
    name: "Tech Empowerment for At-Risk Girls",
    description: "A program aimed at empowering girls through technical training and education to combat human trafficking and create opportunities for a better future.",
  },
  {
    id: "2",
    name: "Social Media Impact",
    description: "Studying effects of social media on mental health",
  },
];

// Generate static params for all project IDs
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDetails id={params.id} />
    </Suspense>
  );
}