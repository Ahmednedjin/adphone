import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

export default function PhoneDetails() {
  const [location, navigate] = useLocation();
  const phoneId = parseInt(location.split("/").pop() || "0");

  const { data: phone, isLoading } = trpc.phones.getById.useQuery(phoneId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
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
            <div className="flex gap-6">
              {phone.imageUrl && (
                <img
                  src={phone.imageUrl}
                  alt={`${phone.brand} ${phone.model}`}
                  className="w-48 h-48 object-cover rounded-lg"
                />
              )}
              <div>
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
                <div key={key} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    {key.replace(/_/g, " ")}
                  </h3>
                  <p className="text-lg text-slate-900 mt-1">
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
