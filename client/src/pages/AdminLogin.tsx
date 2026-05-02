import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "admin123";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Store auth token in sessionStorage
        sessionStorage.setItem("adminAuth", "true");
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        setError("Invalid password. Please try again.");
        toast.error("Invalid password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-muted p-3 rounded-full">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>Enter your password to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">
                Admin Password
              </label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-primary hover:opacity-90 text-primary-foreground"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              For security, this is a demo password. In production, use OAuth or proper authentication.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
