# إعداد نظام أتمتة مراجعة الهواتف

## الخطوات الأساسية للإعداد

### 1. إعداد Supabase

#### أ. إنشاء حساب Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ حساباً جديداً
3. أنشئ مشروعاً جديداً

#### ب. الحصول على بيانات الاعتماد
من لوحة تحكم Supabase:
1. اذهب إلى **Settings** → **API**
2. انسخ:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_ANON_KEY)
   - `service_role` secret (SUPABASE_SERVICE_ROLE_KEY)

#### ج. إنشاء جدول Phones
في SQL Editor، قم بتشغيل:
```sql
CREATE TABLE phones (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  specs JSONB NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_phones_brand ON phones(brand);
CREATE INDEX idx_phones_model ON phones(model);
```

### 2. إعداد GitHub Secrets

في مستودع GitHub:
1. اذهب إلى **Settings** → **Secrets and variables** → **Actions**
2. أضف الـ Secrets التالية:
   - `SUPABASE_URL`: رابط Supabase
   - `SUPABASE_ANON_KEY`: المفتاح العام
   - `SUPABASE_SERVICE_ROLE_KEY`: مفتاح الخدمة

**⚠️ تحذير أمني**: لا تشارك هذه المفاتيح مع أحد!

### 3. إعداد متغيرات البيئة المحلية

إنشاء ملف `.env.local`:
```
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
VITE_ADMIN_PASSWORD=<strong_password>
```

### 4. تثبيت الاعتماديات

```bash
# تثبيت Node.js dependencies
pnpm install

# تثبيت Python dependencies
pip install requests beautifulsoup4 supabase
```

### 5. تشغيل التطبيق

```bash
# بيئة التطوير
pnpm dev

# الإنتاج
pnpm build && pnpm start
```

## الأمان والممارسات الأفضل

### 1. حماية البيانات الحساسة

✅ **افعل**:
- استخدم متغيرات البيئة لجميع المفاتيح
- احفظ المفاتيح في GitHub Secrets فقط
- استخدم `.env.local` للتطوير المحلي
- أضف `.env.local` إلى `.gitignore`

❌ **لا تفعل**:
- لا تضع المفاتيح في الكود
- لا تشارك المفاتيح عبر البريد أو الرسائل
- لا تضع المفاتيح في التعليقات
- لا تلتزم بـ `.env` في Git

### 2. حماية لوحة التحكم

كلمة السر الافتراضية: `admin123`

**في الإنتاج**:
- غيّر كلمة السر إلى كلمة قوية
- استخدم OAuth بدلاً من كلمة السر البسيطة
- فعّل HTTPS
- استخدم CORS بشكل صحيح

### 3. حماية API

- جميع العمليات الحساسة محمية بـ `protectedProcedure`
- فقط المسؤولون يمكنهم إضافة/تعديل/حذف الهواتف
- جميع الطلبات تمر عبر tRPC مع التحقق من الصلاحيات

## استكشاف الأخطاء

### المشكلة: "Cannot connect to Supabase"
**الحل**:
1. تحقق من `SUPABASE_URL` و `SUPABASE_SERVICE_ROLE_KEY`
2. تأكد من أن الجدول موجود في Supabase
3. تحقق من الاتصال بالإنترنت

### المشكلة: "Admin password is incorrect"
**الحل**:
1. تحقق من قيمة `VITE_ADMIN_PASSWORD`
2. تأكد من عدم وجود مسافات إضافية
3. في الإنتاج، استخدم كلمة سر أقوى

### المشكلة: GitHub Actions فشل
**الحل**:
1. تحقق من أن Secrets موجودة في GitHub
2. تحقق من أسماء المتغيرات بدقة
3. تحقق من السجلات (Logs) في GitHub Actions

## الخطوات التالية

1. **اختبر الاتصال**: تأكد من أن التطبيق يتصل بـ Supabase
2. **أضف بيانات تجريبية**: استخدم لوحة التحكم لإضافة هواتف
3. **اختبر السكريبت**: شغّل `python scripts/scraper.py` يدويًا
4. **فعّل GitHub Actions**: تحقق من أن الـ Workflow يعمل

## المراجع

- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
