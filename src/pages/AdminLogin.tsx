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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "خطأ في تسجيل الدخول", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    // Check admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "خطأ", description: "لم يتم العثور على المستخدم", variant: "destructive" });
      setLoading(false);
      return;
    }
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").single();
    if (!roleData) {
      await supabase.auth.signOut();
      toast({ title: "غير مصرح", description: "ليس لديك صلاحيات المدير", variant: "destructive" });
      setLoading(false);
      return;
    }
    navigate("/admin");
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
