import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User, Mail, Phone, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function UserLogin() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    setTimeout(() => {
      if (loginUsername && loginPassword) {
        // Simulate login
        sessionStorage.setItem("userAuth", JSON.stringify({
          username: loginUsername,
          loggedIn: true,
        }));
        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/dashboard");
      } else {
        setLoginError("يرجى ملء جميع الحقول");
        toast.error("خطأ في تسجيل الدخول");
      }
      setLoginLoading(false);
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegLoading(true);

    setTimeout(() => {
      if (regUsername && regPassword && regEmail) {
        // Simulate registration
        sessionStorage.setItem("userAuth", JSON.stringify({
          username: regUsername,
          email: regEmail,
          phone: regPhone,
          loggedIn: true,
        }));
        toast.success("تم إنشاء الحساب بنجاح!");
        navigate("/verify-email");
      } else {
        setRegError("يرجى ملء جميع الحقول المطلوبة");
        toast.error("خطأ في إنشاء الحساب");
      }
      setRegLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">مراجعة الهواتف</CardTitle>
          <CardDescription>تسجيل الدخول أو إنشاء حساب جديد</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">دخول</TabsTrigger>
              <TabsTrigger value="register">تسجيل</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    اسم المستخدم
                  </label>
                  <Input
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={loginUsername}
                    onChange={(e) => {
                      setLoginUsername(e.target.value);
                      setLoginError("");
                    }}
                    disabled={loginLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    كلمة المرور
                  </label>
                  <Input
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError("");
                    }}
                    disabled={loginLoading}
                    className="w-full"
                  />
                </div>

                {loginError && (
                  <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{loginError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loginLoading || !loginUsername || !loginPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loginLoading ? "جاري التحميل..." : "دخول"}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    اسم المستخدم
                  </label>
                  <Input
                    type="text"
                    placeholder="اختر اسم مستخدم"
                    value={regUsername}
                    onChange={(e) => {
                      setRegUsername(e.target.value);
                      setRegError("");
                    }}
                    disabled={regLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      setRegError("");
                    }}
                    disabled={regLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    رقم الهاتف (اختياري)
                  </label>
                  <Input
                    type="tel"
                    placeholder="أدخل رقم هاتفك"
                    value={regPhone}
                    onChange={(e) => {
                      setRegPhone(e.target.value);
                      setRegError("");
                    }}
                    disabled={regLoading}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    كلمة المرور
                  </label>
                  <Input
                    type="password"
                    placeholder="اختر كلمة مرور قوية"
                    value={regPassword}
                    onChange={(e) => {
                      setRegPassword(e.target.value);
                      setRegError("");
                    }}
                    disabled={regLoading}
                    className="w-full"
                  />
                </div>

                {regError && (
                  <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{regError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={regLoading || !regUsername || !regPassword || !regEmail}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {regLoading ? "جاري التحميل..." : "إنشاء حساب"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
