import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "خطأ في تسجيل الدخول", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">لوحة التحكم - تسجيل الدخول</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">البريد الإلكتروني</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">كلمة المرور</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required dir="ltr" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
