import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

export default function PhoneDetails() {
  const [match, params] = useRoute("/phone/:id");
  const [, navigate] = useLocation();
  const phoneId = parseInt((params as any)?.id || "0");

  const { data: phone, isLoading } = trpc.phones.getById.useQuery(phoneId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Phone Not Found</CardTitle>
            <CardDescription>The phone you are looking for does not exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  let specs: Record<string, any> = {};
  try {
    specs = JSON.parse(phone.specs);
  } catch {
    specs = { error: "Invalid specs format" };
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Phone Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
              {phone.imageUrl && (
                <img
                  src={phone.imageUrl}
                  alt={`${phone.brand} ${phone.model}`}
                  className="w-48 h-48 object-contain rounded-lg"
                />
              )}
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">
                  {phone.brand} {phone.model}
                </CardTitle>
                <CardDescription>
                  Added on {new Date(phone.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="border-l-4 border-primary pl-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {key.replace(/_/g, " ")}
                  </h3>
                  <p className="text-lg text-foreground mt-1">
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
