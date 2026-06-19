# Sistem Deteksi Tingkat Stres Mahasiswa dalam Pengerjaan Proyek Kelompok

Project ini merupakan sistem berbasis pengetahuan untuk mendeteksi tingkat stres mahasiswa saat mengerjakan proyek kelompok. Sistem menggunakan metode **Forward Chaining** sebagai mesin inferensi utama, dengan kuesioner sebagai sumber fakta awal.

## Tech Stack

### Backend

* Node.js
* Express.js
* Prisma ORM v7
* MySQL 8.0
* Docker
* Prisma MariaDB Adapter

### Frontend

* React.js (v19)
* Vite (v8)
* Tailwind CSS (v4)
* Lucide React (Icons)

> Catatan: Saat ini sistem backend dan frontend telah selesai dikembangkan sepenuhnya dengan fitur lengkap.

---

## Fitur yang Sudah Dibuat

### 1. Database

Database menggunakan MySQL yang dijalankan melalui Docker.

Tabel yang sudah dibuat:

* `Student`
* `Symptom`
* `DiagnosisResult`

### 2. Basis Pengetahuan

Sistem memiliki basis pengetahuan berupa:

* 18 gejala stres mahasiswa
* 9 fakta turunan
* 17 aturan/rule forward chaining
* 3 tingkat stres:

  * Stres Ringan
  * Stres Sedang
  * Stres Berat

### 3. Forward Chaining

Sistem membaca jawaban kuesioner, mengubah jawaban menjadi fakta, lalu mencocokkan fakta dengan rule yang tersedia.

Alur inferensi:

```txt
Jawaban Kuesioner
↓
Fakta Awal
↓
Forward Chaining
↓
Fakta Turunan
↓
Rule Aktif
↓
Tingkat Stres
↓
Rekomendasi
```

### 4. Stress Score

Selain rule-based diagnosis, sistem juga menghitung skor stres sebagai informasi pendukung.

Namun keputusan utama tetap berdasarkan hasil **Forward Chaining**.

### 5. API Backend

Endpoint yang sudah tersedia:

| Method | Endpoint             | Deskripsi                          |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/api/symptoms`      | Mengambil daftar pertanyaan/gejala |
| POST   | `/api/diagnosis`     | Memproses diagnosis stres          |
| GET    | `/api/diagnosis`     | Mengambil riwayat diagnosis        |
| GET    | `/api/diagnosis/:id` | Mengambil detail diagnosis         |
| GET    | `/api/dashboard`     | Mengambil statistik dashboard      |

---

## Struktur Project

```txt
stress-detection-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── symptom.controller.js
│   │   │   ├── diagnosis.controller.js
│   │   │   └── dashboard.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── symptom.routes.js
│   │   │   ├── diagnosis.routes.js
│   │   │   └── dashboard.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── forwardChaining.service.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── prisma.config.ts
│
├── frontend/
│   └── ...
│
└── docker-compose.yml
```

---

## Cara Instalasi Setelah Clone

### 1. Clone Repository

```bash
git clone <url-repository>
cd stress-detection-system
```

---

### 2. Jalankan Database dengan Docker

Pastikan Docker sudah aktif.

```bash
docker compose up -d
```

Cek apakah container MySQL sudah berjalan:

```bash
docker ps
```

Pastikan container `stress_mysql` muncul.

---

### 3. Masuk ke Folder Backend

```bash
cd backend
```

---

### 4. Install Dependency Backend

```bash
npm install
```

---

### 5. Buat File `.env`

Buat file `.env` di dalam folder `backend`.

Isi:

```env
PORT=5000
DATABASE_URL="mysql://root:root@127.0.0.1:3307/stress_detection_db"
```

---

### 6. Jalankan Migration Prisma

```bash
npx prisma migrate dev
```

Jika diminta nama migration, gunakan nama seperti:

```txt
init
```

Atau bisa juga langsung:

```bash
npx prisma migrate dev --name init
```

---

### 7. Jalankan Seed Gejala

```bash
node prisma/seed.js
```

Jika berhasil, akan muncul:

```txt
Seed completed: 18 symptoms inserted
```

---

### 8. Jalankan Backend

```bash
npm run dev
```

Backend akan berjalan di:

```txt
http://localhost:5000
```

---

### 9. Jalankan Frontend

Buka terminal baru, lalu masuk ke folder `frontend`:

```bash
cd frontend
```

Install dependensi frontend:

```bash
npm install
```

Jalankan frontend dalam mode development:

```bash
npm run dev
```

Frontend akan berjalan di:

```txt
http://localhost:5173 (atau http://localhost:5174 jika port 5173 sedang digunakan)
```

---

## Testing API

### Cek Backend

```txt
GET http://localhost:5000
```

### Ambil Daftar Gejala

```txt
GET http://localhost:5000/api/symptoms
```

### Diagnosis Stres

```txt
POST http://localhost:5000/api/diagnosis
```

Contoh body JSON:

```json
{
  "name": "Indah",
  "nim": "231051006",
  "className": "IF-6A",
  "project": "Sistem Deteksi Stres Mahasiswa",
  "answers": {
    "kewalahan": 4,
    "sulit_tidur": 3,
    "cemas_deadline": 4,
    "khawatir_hasil": 3,
    "sulit_fokus": 3,
    "menunda_pekerjaan": 3,
    "sulit_atur_waktu": 4,
    "tidak_mampu_selesai": 3,
    "komunikasi_buruk": 2,
    "konflik_kelompok": 1,
    "pendapat_tidak_dihargai": 2,
    "beban_tidak_adil": 2,
    "kehilangan_motivasi": 3,
    "jenuh_proyek": 3,
    "takut_mengecewakan": 4,
    "mudah_marah": 2,
    "lelah_fisik": 3,
    "sedih_frustrasi": 2
  }
}
```

---

## Skala Jawaban Kuesioner

Setiap pertanyaan menggunakan skala:

| Nilai | Keterangan    |
| ----- | ------------- |
| 0     | Tidak Pernah  |
| 1     | Jarang        |
| 2     | Kadang-kadang |
| 3     | Sering        |
| 4     | Sangat Sering |

Jawaban dengan nilai `3` atau `4` dianggap sebagai fakta aktif dalam proses forward chaining.

---

## Konsep Sistem Berbasis Pengetahuan

Komponen utama sistem:

### 1. Knowledge Base

Berisi gejala dan rule stres mahasiswa.

### 2. Working Memory

Berisi fakta awal dari jawaban kuesioner mahasiswa.

### 3. Inference Engine

Menggunakan forward chaining untuk mencocokkan fakta dengan rule.

### 4. Output

Sistem menghasilkan:

* tingkat stres
* rule yang aktif
* skor stres
* rekomendasi

---

## Status Pengembangan

### Sudah Selesai (Fitur Lengkap)

* **Backend**:
  * Setup server Node.js & Express.
  * Setup database MySQL menggunakan Docker.
  * Migrasi skema database via Prisma ORM.
  * Seed data untuk 18 gejala stres awal.
  * Endpoint API lengkap (`/api/symptoms`, `/api/diagnosis` [POST, GET, GET by ID], `/api/dashboard`).
  * Mesin inferensi Forward Chaining untuk diagnosis berbasis aturan.
* **Frontend**:
  * Setup proyek React dengan Vite.
  * Integrasi Tailwind CSS v4 untuk penataan gaya modern.
  * Halaman Utama (Landing Page) yang informatif.
  * Halaman Kuesioner dengan fungsionalitas tombol kembali (Back button) dan penyimpanan status pilihan jawaban.
  * Halaman Detail Hasil dinamis (`/result/:id`) yang terintegrasi dengan database (tahan terhadap reload).
  * Halaman Dashboard statistik yang menampilkan metrik total data, diagram batang visual tingkat stres, serta tabel riwayat interaktif dengan fitur pencarian.

