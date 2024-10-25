"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StakeholderTab } from "./StakeholderTab";

// Mock data - in a real app, this would come from an API
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

interface ProjectDetailsProps {
  id: string;
}

export function ProjectDetails({ id }: ProjectDetailsProps) {
  const router = useRouter();
  
  const project = projects.find((p) => p.id === id) || {
    id,
    name: "Project Not Found",
    description: "This project could not be found.",
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <p className="text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stakeholders" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="stakeholders">
              <StakeholderTab projectId={project.id} />
            </TabsContent>
            <TabsContent value="forms">Forms content coming soon</TabsContent>
            <TabsContent value="sources">Sources content coming soon</TabsContent>
            <TabsContent value="analysis">Analysis content coming soon</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}