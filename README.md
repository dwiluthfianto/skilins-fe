# Skilins Frontend

Frontend untuk platform **Skilins**, dibangun menggunakan [Next.js](https://nextjs.org/) dan [Shadcn UI](https://ui.shadcn.com/).  
Project ini adalah interface pengguna untuk mengakses konten seperti ebook, podcast, novel, dan manajemen lomba siswa.

---

## 🚀 Deployment (Tanpa Docker)

### **Prerequisites**
Pastikan server Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (disarankan versi LTS terbaru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- Akses terminal ke server

---

### **1. Clone Repository**
```bash
git clone https://github.com/dwiluthfianto/skilins-fe.git
cd skilins-fe
```

---

### **2. Konfigurasi Environment**
Buat file `.env` dan sesuaikan variabel environment sesuai kebutuhan:

```env
# Contoh
NEXT_PUBLIC_FRONTEND_URL= 'http://localhost:3000'
NEXT_PUBLIC_API_URL= 'http://localhost:8000/v1/api'
NEXT_PUBLIC_TOKEN_EXPIRY= '3600'
```

---

### **3. Install Dependencies**
```bash
npm install
```
atau jika menggunakan yarn:
```bash
yarn install
```

---

### **4. Build Aplikasi**
```bash
npm run build
```
Perintah ini akan menghasilkan build production di folder `.next`.

---

### **5. Jalankan Aplikasi**
```bash
npm run start
```
Secara default, aplikasi akan berjalan di port **3000**.  
Jika ingin mengganti port:
```bash
PORT=8080 npm run start
```

---

### **6. Menjalankan di Background (Opsional)**
Agar aplikasi tetap berjalan walaupun terminal ditutup, gunakan **PM2**:
```bash
npm install -g pm2
pm2 start npm --name "skilins-fe" -- start
pm2 save
pm2 startup
```
Cek status:
```bash
pm2 status
```

---

### **7. Akses Aplikasi**
Jika deployment berhasil, aplikasi dapat diakses di:
```
http://<SERVER_IP>:3000
```
atau jika pakai domain:
```
https://namadomain.com
```

---

## 🛠 Development
Jika ingin menjalankan di mode development:
```bash
npm run dev
```
Akses di:
```
http://localhost:3000
```

---

## 📜 License
Project ini menggunakan lisensi MIT.
