"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StakeholderType, StakeholderField } from "@/types";

const fieldTypes = [
  { id: "text", label: "Text" },
  { id: "number", label: "Number" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "date", label: "Date" },
] as const;

interface StakeholderTypeDialogProps {
  onSubmit: (data: Omit<StakeholderType, "id">) => void;
}

export function StakeholderTypeDialog({
  onSubmit,
}: StakeholderTypeDialogProps) {
  const [fields, setFields] = useState<Omit<StakeholderField, "id">[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: { name: string }) => {
    onSubmit({
      name: data.name,
      fields: fields.map((field, index) => ({
        ...field,
        id: index.toString(),
      })),
    });
    form.reset();
    setFields([]);
  };

  const addField = () => {
    setFields([
      ...fields,
      { name: "", type: "text" as const, required: false },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    field: Partial<Omit<StakeholderField, "id">>
  ) => {
    setFields(
      fields.map((f, i) => (i === index ? { ...f, ...field } : f))
    );
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Student, Mentor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Fields</h4>
              <Button type="button" variant="outline" size="sm" onClick={addField}>
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            {fields.map((field, index) => (
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
                    {fieldTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
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

          <div className="flex justify-end space-x-2">
            <Button type="submit">Create Type</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}