"use client";

import { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImportStakeholders } from "./import/ImportStakeholders";
import { StakeholderType, StakeholderField } from "@/types";

interface StakeholderTabProps {
  projectId: string;
}

type StakeholderView = "list" | "import" | "define";

export function StakeholderTab({ projectId }: StakeholderTabProps) {
  const [currentView, setCurrentView] = useState<StakeholderView>("list");
  const [selectedType, setSelectedType] = useState<"girls" | "tutors">("girls");
  const [newFields, setNewFields] = useState<Omit<StakeholderField, "id">[]>([
    { name: "", type: "text", required: false }
  ]);
  const [roleName, setRoleName] = useState("");

  const girlFields = [
    { id: "name", name: "Full Name", type: "text" as const, required: true },
    { id: "age", name: "Age", type: "number" as const, required: true },
    { id: "location", name: "Location", type: "text" as const, required: true },
    { id: "educationLevel", name: "Education Level", type: "text" as const, required: true },
    { id: "familyBackground", name: "Family Background", type: "text" as const, required: false },
  ];

  const tutorFields = [
    { id: "name", name: "Full Name", type: "text" as const, required: true },
    { id: "expertise", name: "Expertise", type: "text" as const, required: true },
    { id: "email", name: "Email", type: "email" as const, required: true },
    { id: "yearsOfExperience", name: "Years of Experience", type: "number" as const, required: true },
    { id: "availability", name: "Availability", type: "text" as const, required: false },
  ];

  const girlsData = [
    {
      name: "Sarah Johnson",
      age: "15",
      location: "Mumbai, India",
      educationLevel: "9th Grade",
      familyBackground: "Single parent, low income",
    },
    {
      name: "Maria Garcia",
      age: "16",
      location: "Bogotá, Colombia",
      educationLevel: "10th Grade",
      familyBackground: "Orphan, living with relatives",
    },
  ];

  const tutorsData = [
    {
      name: "Dr. Emily Chen",
      expertise: "Computer Science",
      email: "emily.chen@example.com",
      yearsOfExperience: "8",
      availability: "Weekday evenings",
    },
    {
      name: "James Wilson",
      expertise: "Web Development",
      email: "james.wilson@example.com",
      yearsOfExperience: "5",
      availability: "Weekends",
    },
  ];

  const addField = () => {
    setNewFields([...newFields, { name: "", type: "text", required: false }]);
  };

  const removeField = (index: number) => {
    setNewFields(newFields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: Partial<Omit<StakeholderField, "id">>) => {
    setNewFields(
      newFields.map((f, i) => (i === index ? { ...f, ...field } : f))
    );
  };

  const handleCreateRole = () => {
    // Handle role creation logic here
    setCurrentView("list");
    setNewFields([{ name: "", type: "text", required: false }]);
    setRoleName("");
  };

  return (
    <div className="space-y-6">
      {currentView === "list" && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Stakeholder Management</h2>
            <div className="flex gap-2">
              <Button onClick={() => setCurrentView("define")} className="bg-black hover:bg-black/90">
                <Plus className="mr-2 h-4 w-4" />
                Define Stakeholder Role
              </Button>
            </div>
          </div>

          <Tabs value={selectedType} onValueChange={(value: "girls" | "tutors") => setSelectedType(value)}>
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="girls">Girls</TabsTrigger>
              <TabsTrigger value="tutors">Tutors</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {selectedType === "girls" ? "Program Participants" : "Program Tutors"}
                </h3>
                <Button variant="outline" onClick={() => setCurrentView("import")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import {selectedType === "girls" ? "Girls" : "Tutors"}
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    {(selectedType === "girls" ? girlFields : tutorFields).map((field) => (
                      <TableHead key={field.id}>{field.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(selectedType === "girls" ? girlsData : tutorsData).map((item, index) => (
                    <TableRow key={index}>
                      {Object.values(item).map((value, valueIndex) => (
                        <TableCell key={valueIndex}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </>
      )}

      {currentView === "import" && (
        <ImportStakeholders
          onClose={() => setCurrentView("list")}
          fields={selectedType === "girls" ? girlFields : tutorFields}
          stakeholderType={selectedType === "girls" ? "Girls" : "Tutors"}
        />
      )}

      {currentView === "define" && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setCurrentView("list")}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <h2 className="text-lg font-semibold">Define New Stakeholder Role</h2>
          </div>

          <div className="bg-white border rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g., Student, Mentor, Teacher"
                  className="max-w-md"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Fields</h4>
                  <Button onClick={addField} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>

                {newFields.map((field, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <Input
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) =>
                        updateField(index, { name: e.target.value })
                      }
                    />
                    <Select
                      value={field.type}
                      onValueChange={(value: any) =>
                        updateField(index, { type: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`required-${index}`}
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateField(index, { required: !!checked })
                        }
                      />
                      <label
                        htmlFor={`required-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Required
                      </label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreateRole} className="bg-black hover:bg-black/90">
                Create Role
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}