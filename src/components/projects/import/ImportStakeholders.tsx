"use client";

import { useState } from "react";
import { ArrowLeft, Upload, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StakeholderField } from "@/types";
import { FileUploadStep } from "./steps/FileUploadStep";
import { FieldMappingStep } from "./steps/FieldMappingStep";
import { ProcessingStep } from "./steps/ProcessingStep";

interface ImportStakeholdersProps {
  onClose: () => void;
  fields: StakeholderField[];
  stakeholderType: string;
}

type Step = "upload" | "mapping" | "processing" | "complete";

export function ImportStakeholders({ onClose, fields, stakeholderType }: ImportStakeholdersProps) {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: "upload", name: "Upload CSV" },
    { id: "mapping", name: "Map Fields" },
    { id: "processing", name: "Processing" },
  ];

  const handleFileUpload = (data: { headers: string[]; rows: string[][] }) => {
    setCsvData(data);
    setCurrentStep("mapping");
  };

  const handleFieldMapping = (mapping: Record<string, string>) => {
    setFieldMapping(mapping);
    setCurrentStep("processing");
    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setCurrentStep("complete");
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Import {stakeholderType}</h2>
            <p className="text-muted-foreground">Import stakeholders from a CSV file</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`relative ${
                  stepIdx !== steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="group flex items-center">
                  <span className="flex items-center">
                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                        currentStep === step.id
                          ? "bg-[#8B5CF6] text-white"
                          : currentStep === "complete" ||
                            steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id)
                          ? "bg-[#8B5CF6] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <span className="text-sm">{stepIdx + 1}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium">
                      {step.name}
                    </span>
                  </span>
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-20 right-0 h-[2px] ${
                        currentStep === "complete" ||
                        steps.findIndex((s) => s.id === currentStep) > stepIdx
                          ? "bg-[#8B5CF6]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <div className="bg-white border rounded-lg p-6">
          {currentStep === "upload" && (
            <FileUploadStep onUpload={handleFileUpload} />
          )}

          {currentStep === "mapping" && csvData && (
            <FieldMappingStep
              csvHeaders={csvData.headers}
              fields={fields}
              onSubmit={handleFieldMapping}
            />
          )}

          {currentStep === "processing" && (
            <ProcessingStep progress={progress} />
          )}

          {currentStep === "complete" && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Import Complete!</h3>
              <p className="text-muted-foreground">
                Successfully imported {csvData?.rows.length} stakeholders
              </p>
              <Button onClick={onClose} className="mt-4">
                Return to Stakeholders
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}