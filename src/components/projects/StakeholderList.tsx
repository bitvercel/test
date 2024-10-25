"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StakeholderType, Stakeholder } from "@/types";
import { ImportDialog } from "./ImportDialog";

interface StakeholderListProps {
  type: StakeholderType;
  projectId: string;
}

export function StakeholderList({ type, projectId }: StakeholderListProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);

  const handleImport = (data: any[]) => {
    const newStakeholders = data.map((item) => ({
      id: Math.random().toString(36).substr(2, 9),
      typeId: type.id,
      data: item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setStakeholders([...stakeholders, ...newStakeholders]);
    setIsImportDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{type.name}s</CardTitle>
            <CardDescription>
              Manage {type.name.toLowerCase()} stakeholders
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {stakeholders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No stakeholders added yet. Import some using CSV or add them manually.
          </p>
        ) : (
          <div className="grid gap-4">
            {stakeholders.map((stakeholder) => (
              <div
                key={stakeholder.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  {Object.entries(stakeholder.data).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onSubmit={handleImport}
        fields={type.fields}
      />
    </Card>
  );
}