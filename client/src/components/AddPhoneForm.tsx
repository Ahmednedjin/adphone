import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AddPhoneFormProps {
  onSuccess?: () => void;
}

export default function AddPhoneForm({ onSuccess }: AddPhoneFormProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [specs, setSpecs] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const createPhoneMutation = trpc.phones.create.useMutation({
    onSuccess: () => {
      toast.success("Phone added successfully!");
      setBrand("");
      setModel("");
      setSpecs("");
      setImageUrl("");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add phone");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand.trim() || !model.trim() || !specs.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const specsObj = JSON.parse(specs);
      createPhoneMutation.mutate({
        brand: brand.trim(),
        model: model.trim(),
        specs: JSON.stringify(specsObj),
        imageUrl: imageUrl.trim() || undefined,
      });
    } catch {
      toast.error("Specs must be valid JSON");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Brand *</label>
        <Input
          placeholder="e.g., Apple, Samsung, Xiaomi"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          disabled={createPhoneMutation.isPending}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Model *</label>
        <Input
          placeholder="e.g., iPhone 15 Pro, Galaxy S24"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={createPhoneMutation.isPending}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Specifications (JSON) *</label>
        <Textarea
          placeholder={`{
  "processor": "A17 Pro",
  "display": "6.1 inch OLED",
  "camera": "48MP main",
  "battery": "3349 mAh"
}`}
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          disabled={createPhoneMutation.isPending}
          rows={6}
          className="font-mono text-xs"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Image URL</label>
        <Input
          placeholder="https://example.com/phone.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={createPhoneMutation.isPending}
          type="url"
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="submit"
          disabled={createPhoneMutation.isPending}
          className="gap-2"
        >
          {createPhoneMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Add Phone
        </Button>
      </div>
    </form>
  );
}
