"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { Project } from "@/types";

const dummyProjects: Project[] = [
  {
    id: "1",
    name: "Tech Empowerment for At-Risk Girls",
    description: "Girls Code",
    createdAt: "2023-06-15",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Social Media Impact",
    description: "Studying effects of social media on mental health",
    createdAt: "2023-07-01",
    updatedAt: new Date().toISOString(),
  },
];

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const router = useRouter();

  const handleCreateProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
    setCreateDialogOpen(false);
    toast.success("Project created successfully");
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCreateDialogOpen(true);
  };

  const handleUpdateProject = (updatedProject: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    if (!editingProject) return;
    
    const updated = projects.map((p) =>
      p.id === editingProject.id
        ? {
            ...p,
            ...updatedProject,
            updatedAt: new Date().toISOString(),
          }
        : p
    );
    setProjects(updated);
    setCreateDialogOpen(false);
    setEditingProject(null);
    toast.success("Project updated successfully");
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!projectToDelete) return;
    
    setProjects(projects.filter((p) => p.id !== projectToDelete.id));
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
    toast.success("Project deleted successfully");
  };

  const handleDuplicate = (project: Project) => {
    const duplicate: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      name: `${project.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([...projects, duplicate]);
    toast.success("Project duplicated successfully");
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">Manage your research projects</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <Button onClick={() => setCreateDialogOpen(true)} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-medium hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/projects/${project.id}`)}
                        title="Open project"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditProject(project)}
                        title="Edit project"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteProject(project)}
                        className="text-destructive hover:text-destructive"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreateProjectDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        defaultValues={editingProject || undefined}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}