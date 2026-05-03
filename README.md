# MekanGo

Türkiye'deki yerel işletmeleri keşfetmek ve tanıtmak için tasarlanmış bir platform. Kullanıcılar işletmeleri keşfedebilir, kampanyaları/indirimleri görüntüleyebilir ve yorum bırakabilir. İşletme sahipleri profillerini, kampanyalarını ve ürünlerini yönetebilir, analizleri takip edebilir.

---

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Frontend | React + Vite + TailwindCSS v4 + shadcn/ui |
| Backend | Express 5 (TypeScript, ESM) |
| Veritabanı | PostgreSQL + Drizzle ORM |
| Kimlik Doğrulama | Clerk |
| Ödeme | iyzico |
| API Codegen | Orval (OpenAPI → React Query + Zod) |
| Animasyon | Framer Motion |
| Paket Yönetimi | pnpm workspaces (monorepo) |

---

## Ön Koşullar

- **Node.js** 20+
- **pnpm** 9+ → `npm install -g pnpm`
- **PostgreSQL** veritabanı
- **Clerk** hesabı → [clerk.com](https://clerk.com)
- **iyzico** hesabı → [iyzico.com](https://www.iyzico.com)

---

## Yerel Geliştirme

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/mekango.git
cd mekango

# 2. Bağımlılıkları yükle
pnpm install

# 3. Env dosyasını oluştur ve doldur
cp .env.example .env

# 4. Veritabanı şemasını oluştur
pnpm --filter @workspace/db run push

# 5. Örnek verileri yükle (opsiyonel)
pnpm --filter @workspace/db run seed

# 6. Servisleri başlat (ayrı terminallerde)
PORT=8080 pnpm --filter @workspace/api-server run dev
PORT=5173 pnpm --filter @workspace/mekango run dev
```

---

## Ortam Değişkenleri

`.env.example` dosyasını kopyalayıp değerleri girin:

### Veritabanı
| Değişken | Açıklama |
|---|---|
| `DATABASE_URL` | `postgresql://kullanici:sifre@host:5432/mekango` |

### Clerk (Kimlik Doğrulama)
| Değişken | Nerede Bulunur |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys → Publishable key |
| `CLERK_PUBLISHABLE_KEY` | Yukarıdakiyle aynı (backend için) |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys → Secret key |

> **Not:** `VITE_CLERK_PROXY_URL` sadece Replit ortamında gereklidir. Kendi sunucunuzda bu değişkeni kaldırın.

### iyzico (Ödeme)
| Değişken | Açıklama |
|---|---|
| `IYZICO_API_KEY` | iyzico merchant panel → Ayarlar → API Bilgileri |
| `IYZICO_SECRET_KEY` | iyzico merchant panel → Ayarlar → API Bilgileri |
| `IYZICO_BASE_URL` | Test: `https://sandbox.iyzipay.com` / Canlı: `https://api.iyzipay.com` |

---

## GitHub'a Yükleme

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/mekango.git
git push -u origin main
```

Sonraki güncellemeler:
```bash
git add .
git commit -m "açıklama"
git push
```

> ⚠️ `.env` dosyasını asla GitHub'a yüklemeyin. `.gitignore` zaten bunu engeller.

---

## Sunucuya (VPS/Hosting) Deploy

### 1. Build al

```bash
# API sunucusu
pnpm --filter @workspace/api-server run build

# Frontend (statik dosyalar)
BASE_PATH=/ pnpm --filter @workspace/mekango run build
```

Frontend build çıktısı: `artifacts/mekango/dist/public/`
API sunucu build çıktısı: `artifacts/api-server/dist/index.mjs`

### 2. Clerk Ayarları (kendi domaininde)

Clerk Dashboard'da:
- **Allowed Origins** → `https://sizin-domain.com` ekleyin
- **Redirect URLs** → `https://sizin-domain.com/sign-in` ve `sign-up` ekleyin

### 3. API Sunucuyu Çalıştır

```bash
PORT=8080 NODE_ENV=production node artifacts/api-server/dist/index.mjs
```

### 4. Frontend'i Serve Et

Nginx, Caddy veya herhangi bir statik dosya sunucusuyla:
```nginx
server {
    listen 80;
    server_name sizin-domain.com;

    root /var/www/mekango/artifacts/mekango/dist/public;
    index index.html;

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Proje Yapısı

```
mekango/
├── artifacts/
│   ├── api-server/          # Express API (port 8080)
│   │   └── src/
│   │       ├── routes/      # API endpoint'leri
│   │       └── app.ts       # Express yapılandırması
│   └── mekango/             # React frontend (Vite)
│       └── src/
│           ├── pages/       # Sayfalar
│           ├── components/  # Bileşenler
│           └── lib/         # Yardımcı fonksiyonlar
├── lib/
│   ├── db/                  # Drizzle şema + migration
│   ├── api-spec/            # OpenAPI spec
│   ├── api-zod/             # Üretilen Zod şemaları
│   └── api-client-react/    # Üretilen React Query hook'ları
├── .env.example             # Ortam değişkeni şablonu
└── README.md
```

---

## Sayfalar

| URL | Açıklama |
|---|---|
| `/` | Ana sayfa |
| `/businesses` | İşletme listesi |
| `/businesses/:id` | İşletme detayı |
| `/campaigns` | Aktif kampanyalar |
| `/categories` | Kategoriler |
| `/pricing` | Abonelik planları (iyzico) |
| `/dashboard` | İşletme paneli |
| `/add-business` | İşletme ekle |
| `/favorites` | Kayıtlı mekanlar |

---

## Lisans

MIT
