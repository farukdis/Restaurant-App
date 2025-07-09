# Aşama 1: Bağımlılıkları Kurma ve Uygulamayı Derleme
FROM node:20-alpine AS build

WORKDIR /app

# package.json ve package-lock.json (veya yarn.lock) dosyalarını kopyala
# Bu, npm install adımının önbelleğe alınmasına yardımcı olur
COPY package*.json ./

# Bağımlılıkları yükle
# Bu adım, bir sorun olması durumunda en çok takılınan yerdir.
RUN npm install

# Geri kalan uygulama kodunu kopyala
# Tüm kaynak kod ve NestJS proje dosyaları (src, nest-cli.json, tsconfig.json vb.)
COPY . .

# Uygulamayı derle (NestJS TypeScript projesi için)
# Bu adım 'dist' klasörünü oluşturur
RUN npm run build

# Aşama 2: Üretim Ortamı İçin Daha Küçük ve Temiz İmaj
FROM node:20-alpine

WORKDIR /app

# Aşama 1'den derlenmiş çıktı (dist klasörü) ve node_modules'i kopyala
# Sadece gerekli dosyaları alarak nihai imaj boyutunu küçültürüz
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Uygulamayı çalıştırmak için varsayılan komut
# Bu komut, 'dist' klasöründeki derlenmiş ana dosyayı çalıştırır
# Bu, package.json'daki "start:prod" script'ine karşılık gelir.
CMD ["node", "dist/main"]