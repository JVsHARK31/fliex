# Panduan Deployment TheMoviesStream

## 🚀 Deployment ke Vercel (Recommended)

### Langkah 1: Persiapan
1. Push kode Anda ke GitHub repository
2. Pastikan file `.env.local` **TIDAK** di-push (sudah ada di `.gitignore`)

### Langkah 2: Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik "New Project"
4. Import repository GitHub Anda
5. Vercel akan otomatis detect Next.js

### Langkah 3: Environment Variables
Di Vercel dashboard, tambahkan environment variables:

```
NEXT_PUBLIC_RAPIDAPI_KEY=4e191731b7msh836483830c0fbafp1d45c2jsnc33bea0ab0aa
NEXT_PUBLIC_RAPIDAPI_HOST=streaming-availability.p.rapidapi.com
```

### Langkah 4: Deploy
1. Klik "Deploy"
2. Tunggu proses build selesai (±2-3 menit)
3. Aplikasi Anda akan live di URL Vercel!

---

## 📦 Deployment ke Platform Lain

### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build project: `npm run build`
3. Deploy: `netlify deploy --prod`
4. Tambahkan environment variables di Netlify dashboard

### Railway
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Init: `railway init`
4. Deploy: `railway up`
5. Tambahkan environment variables di Railway dashboard

### Docker (Self-hosted)
1. Buat `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Build image: `docker build -t themoviesstream .`
3. Run container: `docker run -p 3000:3000 --env-file .env.local themoviesstream`

---

## 🔧 Troubleshooting

### Error: API Rate Limit
- RapidAPI memiliki limit request per hari
- Upgrade ke plan berbayar jika perlu
- Implementasi caching untuk mengurangi API calls

### Error: Image Loading Failed
- Pastikan domain image di-whitelist di `next.config.js`
- Cek koneksi internet
- Verifikasi API response memiliki imageSet

### Error: Build Failed
- Jalankan `npm run build` secara lokal untuk debug
- Cek error message di console
- Pastikan semua dependencies terinstall

---

## 📊 Performance Optimization

### 1. Enable ISR (Incremental Static Regeneration)
Sudah diimplementasi dengan `revalidate: 3600` (1 jam)

### 2. Image Optimization
Next.js Image component sudah digunakan untuk lazy loading

### 3. Code Splitting
Next.js otomatis melakukan code splitting per route

### 4. Caching Strategy
Pertimbangkan untuk implementasi Redis untuk caching API responses

---

## 🔐 Security Checklist

- ✅ API keys di environment variables
- ✅ `.env.local` tidak di-commit
- ✅ HTTPS enabled (otomatis di Vercel)
- ✅ Content Security Policy (bisa ditambahkan di `next.config.js`)

---

## 📈 Monitoring

### Vercel Analytics
- Otomatis tersedia di Vercel dashboard
- Tracking page views, performance, dll

### Custom Analytics
Tambahkan Google Analytics atau Plausible di `app/layout.tsx`

---

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Hubungkan domain custom Anda
2. **SEO**: Tambahkan sitemap.xml dan robots.txt
3. **PWA**: Implementasi Progressive Web App features
4. **Authentication**: Tambahkan user login (NextAuth.js)
5. **Database**: Simpan user favorites di database (Supabase/Firebase)

---

Selamat! Aplikasi Anda siap untuk production! 🚀

