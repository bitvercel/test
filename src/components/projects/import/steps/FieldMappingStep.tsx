"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StakeholderField } from "@/types";

interface FieldMappingStepProps {
  csvHeaders: string[];
  fields: StakeholderField[];
  onSubmit: (mapping: Record<string, string>) => void;
}

export function FieldMappingStep({
  csvHeaders,
  fields,
  onSubmit,
}: FieldMappingStepProps) {
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>(
    Object.fromEntries(fields.map(field => [field.id, ""]))
  );

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldMapping(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(fieldMapping);
  };

  const isValid = fields.every(field => 
    !field.required || (fieldMapping[field.id] && fieldMapping[field.id].length > 0)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-sm font-medium">
                {field.name}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Type: {field.type}
              </p>
            </div>
            <Select
              value={fieldMapping[field.id]}
              onValueChange={(value) => handleFieldChange(field.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select CSV column" />
              </SelectTrigger>
              <SelectContent>
                {csvHeaders.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}