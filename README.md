# Phone Review Automation System

نظام أتمتة متكامل لإدارة ومراجعة مواصفات الهواتف الذكية، مع لوحة تحكم احترافية وسكريبت سحب تلقائي من GSMArena.

## المميزات الرئيسية

### 1. لوحة التحكم (Admin Dashboard)
- **واجهة آمنة**: محمية بنظام مصادقة OAuth من Manus
- **عرض الهواتف**: قائمة شاملة لجميع الهواتف المسجلة
- **البحث والفلترة**: البحث حسب الماركة أو الموديل
- **إضافة هاتف جديد**: نموذج كامل لإضافة هواتف جديدة يدوياً
- **تعديل البيانات**: تحديث معلومات الهاتف والمواصفات
- **حذف الهواتف**: حذف الهواتف غير المطلوبة

### 2. قاعدة البيانات (Supabase)
- **جدول phones**: يحتوي على جميع بيانات الهواتف
  - `id`: معرف فريد للهاتف
  - `brand`: ماركة الهاتف (Apple, Samsung, إلخ)
  - `model`: موديل الهاتف
  - `specs`: المواصفات الكاملة بصيغة JSON
  - `image_url`: رابط صورة الهاتف
  - `created_at`: تاريخ الإضافة

### 3. سكريبت السحب (Web Scraper)
- **سحب من GSMArena**: جلب بيانات الهواتف تلقائياً
- **التحقق من التكرار**: عدم إضافة هواتف مكررة
- **استخراج المواصفات**: المعالج، الشاشة، الكاميرا، البطارية
- **معالجة الأخطاء**: التعامل الآمن مع الأخطاء

### 4. الأتمتة (GitHub Actions)
- **تشغيل دوري**: كل يوم اثنين الساعة 2 صباحاً (UTC)
- **تشغيل يدوي**: إمكانية تشغيل السكريبت عند الطلب
- **أمان عالي**: استخدام GitHub Secrets لحفظ بيانات الاعتماد

## البنية التقنية

```
phone-review-automation/
├── client/                          # واجهة المستخدم (React + Tailwind)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # الصفحة الرئيسية
│   │   │   ├── AdminDashboard.tsx  # لوحة التحكم
│   │   │   └── PhoneDetails.tsx    # تفاصيل الهاتف
│   │   ├── components/
│   │   │   ├── AddPhoneForm.tsx    # نموذج إضافة هاتف
│   │   │   └── EditPhoneForm.tsx   # نموذج تعديل هاتف
│   │   └── App.tsx                 # التطبيق الرئيسي
│
├── server/                          # الخادم (Express + tRPC)
│   ├── routers.ts                  # مسارات tRPC
│   ├── db.ts                       # دوال قاعدة البيانات
│   └── _core/                      # ملفات النظام الأساسية
│
├── drizzle/                         # إدارة قاعدة البيانات
│   ├── schema.ts                   # تعريف الجداول
│   └── migrations/                 # ملفات الهجرة
│
├── scripts/                         # السكريبتات
│   └── scraper.py                  # سكريبت سحب البيانات
│
└── .github/
    └── workflows/
        └── phone-scraper.yml       # GitHub Actions Workflow
```

## التثبيت والإعداد

### 1. المتطلبات الأساسية
- Node.js 22.13.0 أو أحدث
- Python 3.11 أو أحدث
- حساب Supabase
- حساب GitHub

### 2. إعداد متغيرات البيئة

تم حفظ بيانات اعتماد Supabase بشكل آمن في متغيرات البيئة:
```
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
```

**ملاحظة أمنية**: لا تشارك هذه المفاتيح مع أحد. احفظها في GitHub Secrets فقط.

### 3. تثبيت الاعتماديات

```bash
# تثبيت اعتماديات Node.js
pnpm install

# تثبيت اعتماديات Python
pip install requests beautifulsoup4 supabase
```

### 4. تشغيل التطبيق

```bash
# تشغيل بيئة التطوير
pnpm dev

# بناء للإنتاج
pnpm build

# تشغيل الإنتاج
pnpm start
```

## استخدام لوحة التحكم

### الوصول إلى لوحة التحكم
1. انتقل إلى `/admin`
2. قم بتسجيل الدخول باستخدام حسابك (يجب أن تكون مسؤولاً)
3. ستظهر لك قائمة الهواتف المسجلة

### إضافة هاتف جديد
1. اضغط على زر "Add Phone"
2. أدخل بيانات الهاتف:
   - **Brand**: ماركة الهاتف
   - **Model**: موديل الهاتف
   - **Specifications**: المواصفات بصيغة JSON
   - **Image URL**: رابط صورة الهاتف (اختياري)
3. اضغط "Add Phone"

### تعديل هاتف
1. اضغط على زر "Edit" بجانب الهاتف
2. عدّل البيانات المطلوبة
3. اضغط "Update Phone"

### حذف هاتف
1. اضغط على زر "Delete" بجانب الهاتف
2. أكد الحذف

## استخدام سكريبت السحب

### تشغيل يدوي
```bash
python scripts/scraper.py
```

### التشغيل الدوري عبر GitHub Actions
السكريبت يعمل تلقائياً كل يوم اثنين الساعة 2 صباحاً UTC.

لتشغيل يدوي:
1. اذهب إلى GitHub Actions
2. اختر "Phone Scraper Automation"
3. اضغط "Run workflow"

## الأمان

### حماية البيانات الحساسة
- جميع مفاتيح Supabase محفوظة في GitHub Secrets
- لا توجد بيانات حساسة في الكود
- لوحة التحكم محمية بنظام OAuth

### حماية لوحة التحكم
- فقط المسؤولون يمكنهم الوصول إلى لوحة التحكم
- جميع العمليات محمية بفحوصات الصلاحيات
- تسجيل الدخول آمن عبر Manus OAuth

## هيكل البيانات

### جدول Phones
```json
{
  "id": 1,
  "brand": "Apple",
  "model": "iPhone 15 Pro",
  "specs": {
    "processor": "A17 Pro",
    "display": "6.1 inch OLED",
    "camera": "48MP main",
    "battery": "3349 mAh"
  },
  "image_url": "https://example.com/iphone15.jpg",
  "created_at": "2026-04-08T10:30:00Z",
  "updated_at": "2026-04-08T10:30:00Z"
}
```

## المسارات الرئيسية

| المسار | الوصف |
|--------|-------|
| `/` | الصفحة الرئيسية |
| `/admin` | لوحة التحكم (محمية) |
| `/phone/:id` | تفاصيل هاتف معين |
| `/api/trpc/*` | مسارات tRPC API |

## tRPC Procedures

### phones.list
احصل على قائمة الهواتف مع إمكانية الفلترة

```typescript
trpc.phones.list.useQuery({
  brand: "Apple",
  model: "iPhone"
})
```

### phones.getById
احصل على تفاصيل هاتف محدد

```typescript
trpc.phones.getById.useQuery(1)
```

### phones.create (محمي)
أضف هاتف جديد

```typescript
trpc.phones.create.useMutation({
  brand: "Samsung",
  model: "Galaxy S24",
  specs: JSON.stringify({...}),
  imageUrl: "https://..."
})
```

### phones.update (محمي)
عدّل بيانات هاتف

```typescript
trpc.phones.update.useMutation({
  id: 1,
  brand: "Samsung",
  model: "Galaxy S24 Ultra"
})
```

### phones.delete (محمي)
احذف هاتف

```typescript
trpc.phones.delete.useMutation(1)
```

## استكشاف الأخطاء

### المشكلة: لا يمكن الوصول إلى لوحة التحكم
**الحل**: تأكد من أن حسابك لديه صلاحية admin في قاعدة البيانات

### المشكلة: السكريبت لا يعمل
**الحل**: تحقق من متغيرات البيئة وتأكد من صحة بيانات اعتماد Supabase

### المشكلة: الهواتف لا تظهر
**الحل**: تحقق من اتصال قاعدة البيانات وتأكد من وجود بيانات في الجدول

## المساهمة والتطوير

### إضافة ميزات جديدة
1. أنشئ فرع جديد: `git checkout -b feature/your-feature`
2. أضف التغييرات
3. اختبر التغييرات
4. أرسل pull request

### الاختبار
```bash
# تشغيل الاختبارات
pnpm test

# الاختبارات مع التغطية
pnpm test:coverage
```

## الترخيص

هذا المشروع مرخص تحت MIT License

## الدعم

للمساعدة والدعم، يرجى فتح issue على GitHub أو التواصل مع فريق التطوير.

---

**آخر تحديث**: 8 أبريل 2026
