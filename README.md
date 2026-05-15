# Soilless Farming Control (Monorepo)

Small-scale **soilless (hydroponic)** monitoring: a **React (Vite)** UI and a **Spring Boot** REST API. The UI is in **English**. API validation and error messages returned to the client are in **English**.

---

## Requirements

| Component | Local development | Docker |
|-----------|-------------------|--------|
| Node.js | 18+ recommended | Not needed on host |
| npm | 9+ | Not needed |
| JDK | — | — |
| Maven (`mvn`) | 3.9+ (for backend) | Not needed |
| Docker Desktop | — | Installed and running (WSL2 on Windows is typical) |

---

## Project layout

```
topraksiz-tarim-kontrol/
├── README.md                 # This file
├── docker-compose.yml        # Backend + nginx frontend
├── .gitignore
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf            # SPA + /api reverse proxy
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── vercel.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # Routes (English paths) + legacy redirects
│       ├── index.css
│       ├── context/          # DataMode + AppState
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── services/api/     # Axios client + REST modules
│       ├── utils/
│       ├── constants/
│       └── data/
└── backend/
    ├── Dockerfile
    ├── pom.xml
    ├── README.md
    └── src/main/
        ├── java/com/topraksiz/hydro/
        │   ├── HydroApplication.java
        │   ├── bootstrap/, config/, domain/, repository/
        │   ├── service/
        │   └── web/            # controllers, DTOs, GlobalExceptionHandler
        └── resources/
            ├── application.properties
            └── application-docker.properties
```

---

## How to run

### 1) Local (two terminals)

**Terminal A — backend**

```bash
cd backend
mvn spring-boot:run
```

- API base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

**Terminal B — frontend**

```bash
cd frontend
npm install
```

Create `.env` from the example (first time):

```bash
# Windows PowerShell
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Typical `.env` line:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Start Vite:

```bash
npm run dev
```

Open `http://localhost:5173`. In the header, choose **Data source → API** to use the backend, or **Demo** for browser-only simulation.

**npm scripts (`frontend`)**

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the production build locally |

**Maven (`backend`)**

| Command | Description |
|---------|-------------|
| `mvn spring-boot:run` | Run the app |
| `mvn -DskipTests package` | Build `target/*.jar` |
| `mvn test` | Run tests (if any) |

---

### 2) Docker (single command)

From the **repository root**:

```bash
docker compose up --build
```

Detached:

```bash
docker compose up --build -d
```

**Stop**

- Foreground: `Ctrl+C`
- Or: `docker compose down`
- Remove built images: `docker compose down --rmi local`

**URLs after `docker compose up`**

| Service | URL | Notes |
|---------|-----|--------|
| UI (nginx + static build) | http://localhost:8081 | Image is built with `VITE_API_BASE_URL=/api`; nginx proxies `/api` to the backend. No extra `.env` on the host. |
| Swagger | http://localhost:8080/swagger-ui.html | Direct Spring access |

Choose **API** in the header. Change host ports in `docker-compose.yml` (`8080:8080`, `8081:80`) if needed.

`SPRING_PROFILES_ACTIVE=docker` disables the H2 web console in the container profile.

---

### 3) Production artifacts only

**Frontend**

```bash
cd frontend
npm ci
npm run build
```

Output: `frontend/dist/`

**Backend**

```bash
cd backend
mvn -DskipTests package
```

Output: `backend/target/hydro-backend-*.jar`

Run the JAR:

```bash
java -jar target/hydro-backend-1.0.0.jar
```

(Version must match `pom.xml`.)

---

## Environment variables (frontend)

| Variable | Purpose | Local example | Docker image build |
|----------|---------|-----------------|---------------------|
| `VITE_API_BASE_URL` | REST base URL (no trailing slash) | `http://localhost:8080/api` | `/api` (same-origin via nginx) |

Vite embeds these at **build** time; change `.env` and rebuild.

---

## Routes (UI)

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/batches` | Grow batches |
| `/thresholds` | Threshold settings |
| `/analysis` | Analysis |
| `/about` | About |

Legacy Turkish paths (`/partiler`, `/esikler`, `/analiz`, `/hakkinda`) redirect to the English routes.

---

## Data source (Demo / API)

- **Demo:** Simulated sensor stream; batches, thresholds, and history in `localStorage` (see `src/constants/storageKeys.js`).
- **API:** Data from Spring Boot. If the server is unreachable when switching to API, the app may fall back to demo and show an error banner.

---

## More documentation

- Backend-specific notes: `backend/README.md`
- Frontend short reference: `frontend/README.md`

---

## Vercel (static frontend only)

Set the Vercel project root to **`frontend`**. `vercel.json` lives there. Point `VITE_API_BASE_URL` at your deployed API.

---

---

# Turkish / Türkçe (aynı içerik)

Küçük ölçekli **topraksız (hidroponik)** izleme: **React (Vite)** arayüzü ve **Spring Boot** REST API. Arayüz **İngilizcedir**. İstemciye dönen doğrulama ve hata mesajları **İngilizcedir**.

---

## Gereksinimler

| Bileşen | Yerel geliştirme | Docker |
|---------|------------------|--------|
| Node.js | 18+ önerilir | Ana makinede gerekmez |
| npm | 9+ | Gerekmez |
| JDK | — | — |
| Maven (`mvn`) | 3.9+ (backend için) | Gerekmez |
| Docker Desktop | — | Kurulu ve çalışır durumda (Windows’ta genelde WSL2) |

---

## Proje yapısı

```
topraksiz-tarim-kontrol/
├── README.md                 # Bu dosya
├── docker-compose.yml        # Backend + nginx ile frontend
├── .gitignore
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf            # SPA + /api ters vekil
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── vercel.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # Rotalar (İngilizce yollar) + eski yönlendirmeler
│       ├── index.css
│       ├── context/          # DataMode + AppState
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── services/api/     # Axios istemcisi + REST modülleri
│       ├── utils/
│       ├── constants/
│       └── data/
└── backend/
    ├── Dockerfile
    ├── pom.xml
    ├── README.md
    └── src/main/
        ├── java/com/topraksiz/hydro/
        │   ├── HydroApplication.java
        │   ├── bootstrap/, config/, domain/, repository/
        │   ├── service/
        │   └── web/            # controller’lar, DTO’lar, GlobalExceptionHandler
        └── resources/
            ├── application.properties
            └── application-docker.properties
```

---

## Nasıl çalıştırılır

### 1) Yerel (iki terminal)

**Terminal A — backend**

```bash
cd backend
mvn spring-boot:run
```

- API tabanı: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

**Terminal B — frontend**

```bash
cd frontend
npm install
```

İlk seferde `.env` oluşturun:

```bash
# Windows PowerShell
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Tipik `.env` satırı:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Vite’ı başlatın:

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` açın. Üst barda **Veri kaynağı → API** ile backend’i veya **Demo** ile yalnızca tarayıcı simülasyonunu kullanın.

**npm betikleri (`frontend`)**

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | HMR ile geliştirme sunucusu |
| `npm run build` | `dist/` üretimi |
| `npm run preview` | Üretim derlemesini yerelde sunar |

**Maven (`backend`)**

| Komut | Açıklama |
|-------|----------|
| `mvn spring-boot:run` | Uygulamayı çalıştırır |
| `mvn -DskipTests package` | `target/*.jar` oluşturur |
| `mvn test` | Testleri çalıştırır (varsa) |

---

### 2) Docker (tek komut)

**Depo kökünden:**

```bash
docker compose up --build
```

Arka planda:

```bash
docker compose up --build -d
```

**Durdurma**

- Ön planda: `Ctrl+C`
- Veya: `docker compose down`
- İmajları da kaldırmak: `docker compose down --rmi local`

**`docker compose up` sonrası adresler**

| Servis | URL | Notlar |
|--------|-----|--------|
| Arayüz (nginx + statik derleme) | http://localhost:8081 | İmaj `VITE_API_BASE_URL=/api` ile derlenir; nginx `/api` isteklerini backend’e iletir. Ana makinede ek `.env` gerekmez. |
| Swagger | http://localhost:8080/swagger-ui.html | Doğrudan Spring erişimi |

Üst barda **API** seçin. Gerekirse `docker-compose.yml` içindeki port eşlemelerini (`8080:8080`, `8081:80`) değiştirin.

Konteyner profilinde `SPRING_PROFILES_ACTIVE=docker`, H2 web konsolunu devre dışı bırakır.

---

### 3) Yalnızca üretim çıktıları

**Frontend**

```bash
cd frontend
npm ci
npm run build
```

Çıktı: `frontend/dist/`

**Backend**

```bash
cd backend
mvn -DskipTests package
```

Çıktı: `backend/target/hydro-backend-*.jar`

JAR çalıştırma:

```bash
java -jar target/hydro-backend-1.0.0.jar
```

(Sürüm `pom.xml` ile aynı olmalıdır.)

---

## Ortam değişkenleri (frontend)

| Değişken | Amaç | Yerel örnek | Docker imaj derlemesi |
|----------|------|-------------|------------------------|
| `VITE_API_BASE_URL` | REST taban URL (sonunda `/` yok) | `http://localhost:8080/api` | `/api` (nginx ile aynı kök) |

Vite bu değerleri **derleme** anında gömer; `.env` değişince yeniden derleyin.

---

## Rotalar (arayüz)

| Yol | Sayfa |
|-----|-------|
| `/` | Gösterge paneli |
| `/batches` | Yetiştirme partileri |
| `/thresholds` | Eşik ayarları |
| `/analysis` | Analiz |
| `/about` | Hakkında |

Eski Türkçe yollar (`/partiler`, `/esikler`, `/analiz`, `/hakkinda`) İngilizce rotalara yönlendirilir.

---

## Veri kaynağı (Demo / API)

- **Demo:** Simüle sensör akışı; partiler, eşikler ve geçmiş `localStorage` içinde (bkz. `src/constants/storageKeys.js`).
- **API:** Spring Boot verisi. API’ye geçerken sunucuya ulaşılamazsa uygulama demoya düşebilir ve hata bandı gösterebilir.

---

## Ek dokümantasyon

- Backend notları: `backend/README.md`
- Kısa frontend referansı: `frontend/README.md`

---

## Vercel (yalnızca statik frontend)

Vercel proje kökünü **`frontend`** yapın. `vercel.json` oradadır. `VITE_API_BASE_URL` değerini dağıttığınız API’ye yönlendirin.
