import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Mail, Phone, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function UserSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [username, setUsername] = useState("ahmed");
  const [email, setEmail] = useState("ahmednedjin2@gmail.com");
  const [phone, setPhone] = useState("+213612345678");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Email verification state
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Phone verification state
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [phoneVerificationLoading, setPhoneVerificationLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Update profile
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileLoading(true);

    setTimeout(() => {
      toast.success("تم تحديث البيانات بنجاح!");
      setProfileLoading(false);
    }, 500);
  };

  // Send email verification
  const handleSendEmailVerification = () => {
    setEmailVerificationLoading(true);
    setTimeout(() => {
      setEmailVerificationSent(true);
      toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
      setEmailVerificationLoading(false);
    }, 500);
  };

  // Verify email
  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailVerificationCode === "123456") {
      setEmailVerified(true);
      toast.success("تم التحقق من البريد الإلكتروني بنجاح!");
    } else {
      toast.error("رمز التحقق غير صحيح");
    }
  };

  // Send phone verification
  const handleSendPhoneVerification = () => {
    setPhoneVerificationLoading(true);
    setTimeout(() => {
      setPhoneVerificationSent(true);
      toast.success("تم إرسال رمز التحقق إلى هاتفك");
      setPhoneVerificationLoading(false);
    }, 500);
  };

  // Verify phone
  const handleVerifyPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneVerificationCode === "123456") {
      setPhoneVerified(true);
      toast.success("تم التحقق من رقم الهاتف بنجاح!");
    } else {
      toast.error("رمز التحقق غير صحيح");
    }
  };

  // Change password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordLoading(true);

    if (newPassword !== confirmPassword) {
      setPasswordError("كلمات المرور غير متطابقة");
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setPasswordLoading(false);
      return;
    }

    setTimeout(() => {
      toast.success("تم تغيير كلمة المرور بنجاح!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">إعدادات الحساب</h1>
          <p className="text-slate-600 mt-2">إدارة بيانات حسابك والتحقق من هويتك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">البيانات الشخصية</TabsTrigger>
            <TabsTrigger value="verification">التحقق</TabsTrigger>
            <TabsTrigger value="password">كلمة المرور</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>البيانات الشخصية</CardTitle>
                <CardDescription>تحديث معلومات حسابك</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      اسم المستخدم
                    </label>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={profileLoading}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      البريد الإلكتروني
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={profileLoading}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      رقم الهاتف
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={profileLoading}
                      className="w-full"
                    />
                  </div>

                  {profileError && (
                    <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{profileError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {profileLoading ? "جاري التحديث..." : "حفظ التغييرات"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-4">
            {/* Email Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  التحقق من البريد الإلكتروني
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <span className="text-sm text-slate-600">{email}</span>
                  {emailVerified ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">تم التحقق</span>
                    </div>
                  ) : (
                    <span className="text-sm text-orange-600">لم يتم التحقق</span>
                  )}
                </div>

                {!emailVerified && (
                  <>
                    {!emailVerificationSent ? (
                      <Button
                        onClick={handleSendEmailVerification}
                        disabled={emailVerificationLoading}
                        className="w-full"
                      >
                        {emailVerificationLoading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                      </Button>
                    ) : (
                      <form onSubmit={handleVerifyEmail} className="space-y-3">
                        <Input
                          type="text"
                          placeholder="أدخل رمز التحقق"
                          value={emailVerificationCode}
                          onChange={(e) => setEmailVerificationCode(e.target.value)}
                          maxLength={6}
                        />
                        <Button type="submit" className="w-full">
                          التحقق
                        </Button>
                      </form>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Phone Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  التحقق من رقم الهاتف
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <span className="text-sm text-slate-600">{phone}</span>
                  {phoneVerified ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">تم التحقق</span>
                    </div>
                  ) : (
                    <span className="text-sm text-orange-600">لم يتم التحقق</span>
                  )}
                </div>

                {!phoneVerified && (
                  <>
                    {!phoneVerificationSent ? (
                      <Button
                        onClick={handleSendPhoneVerification}
                        disabled={phoneVerificationLoading}
                        className="w-full"
                      >
                        {phoneVerificationLoading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                      </Button>
                    ) : (
                      <form onSubmit={handleVerifyPhone} className="space-y-3">
                        <Input
                          type="text"
                          placeholder="أدخل رمز التحقق"
                          value={phoneVerificationCode}
                          onChange={(e) => setPhoneVerificationCode(e.target.value)}
                          maxLength={6}
                        />
                        <Button type="submit" className="w-full">
                          التحقق
                        </Button>
                      </form>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  تغيير كلمة المرور
                </CardTitle>
                <CardDescription>اختر كلمة مرور قوية وآمنة</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      كلمة المرور الحالية
                    </label>
                    <Input
                      type="password"
                      placeholder="أدخل كلمة المرور الحالية"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      كلمة المرور الجديدة
                    </label>
                    <Input
                      type="password"
                      placeholder="أدخل كلمة مرور جديدة"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      تأكيد كلمة المرور
                    </label>
                    <Input
                      type="password"
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={passwordLoading}
                      className="w-full"
                    />
                  </div>

                  {passwordError && (
                    <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{passwordError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {passwordLoading ? "جاري التحديث..." : "تغيير كلمة المرور"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
