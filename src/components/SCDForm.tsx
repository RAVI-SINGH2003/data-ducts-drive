import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download } from "lucide-react";

export function SCDForm() {
  const [requirements, setRequirements] = useState("");
  const [format, setFormat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [errors, setErrors] = useState({ requirements: false, format: false });

  const handleReset = () => {
    setRequirements("");
    setFormat("");
    setShowDownload(false);
    setErrors({ requirements: false, format: false });
  };

  const validateForm = () => {
    const newErrors = {
      requirements: !requirements.trim(),
      format: !format
    };
    setErrors(newErrors);
    return !newErrors.requirements && !newErrors.format;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDownload(true);
    }, 2000);
  };

  const handleDownload = () => {
    // Mock file download
    const fileName = `scd-requirements.${format}`;
    const content = `Requirements:\n${requirements}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requirements Field */}
        <div className="space-y-2">
          <Label htmlFor="requirements" className="text-sm font-medium">
            Requirements
            <span className="text-required ml-1">*</span>
          </Label>
          <Textarea
            id="requirements"
            placeholder="Enter your requirements here..."
            value={requirements}
            onChange={(e) => {
              setRequirements(e.target.value);
              if (errors.requirements && e.target.value.trim()) {
                setErrors(prev => ({ ...prev, requirements: false }));
              }
            }}
            className={`min-h-[200px] resize-none focus:ring-2 focus:ring-primary ${
              errors.requirements ? 'border-required' : ''
            }`}
          />
          {errors.requirements && (
            <p className="text-required text-sm">Requirements field is required</p>
          )}
        </div>

        {/* Format Field */}
        <div className="space-y-2">
          <Label htmlFor="format" className="text-sm font-medium">
            Format
            <span className="text-required ml-1">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Select the format to download SCDs
          </p>
          <Select 
            value={format} 
            onValueChange={(value) => {
              setFormat(value);
              if (errors.format) {
                setErrors(prev => ({ ...prev, format: false }));
              }
            }}
          >
            <SelectTrigger className={`${errors.format ? 'border-required' : ''}`}>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg z-50">
              <SelectItem value="md">.md</SelectItem>
              <SelectItem value="csv">.csv</SelectItem>
              <SelectItem value="xlsx">.xlsx</SelectItem>
            </SelectContent>
          </Select>
          {errors.format && (
            <p className="text-required text-sm">Format selection is required</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>
        
        <Button
          variant="generate"
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>

        {showDownload && (
          <Button
            variant="download"
            onClick={handleDownload}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
      </div>
    </div>
  );
}