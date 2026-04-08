import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EditPhoneFormProps {
  phoneId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditPhoneForm({ phoneId, onSuccess, onCancel }: EditPhoneFormProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [specs, setSpecs] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { data: phone, isLoading } = trpc.phones.getById.useQuery(phoneId);

  useEffect(() => {
    if (phone) {
      setBrand(phone.brand);
      setModel(phone.model);
      setSpecs(phone.specs);
      setImageUrl(phone.imageUrl || "");
    }
  }, [phone]);

  const updatePhoneMutation = trpc.phones.update.useMutation({
    onSuccess: () => {
      toast.success("Phone updated successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update phone");
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
      updatePhoneMutation.mutate({
        id: phoneId,
        brand: brand.trim(),
        model: model.trim(),
        specs: JSON.stringify(specsObj),
        imageUrl: imageUrl.trim() || undefined,
      });
    } catch {
      toast.error("Specs must be valid JSON");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Brand *</label>
        <Input
          placeholder="e.g., Apple, Samsung, Xiaomi"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          disabled={updatePhoneMutation.isPending}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Model *</label>
        <Input
          placeholder="e.g., iPhone 15 Pro, Galaxy S24"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={updatePhoneMutation.isPending}
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
          disabled={updatePhoneMutation.isPending}
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
          disabled={updatePhoneMutation.isPending}
          type="url"
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={updatePhoneMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={updatePhoneMutation.isPending}
          className="gap-2"
        >
          {updatePhoneMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Update Phone
        </Button>
      </div>
    </form>
  );
}
