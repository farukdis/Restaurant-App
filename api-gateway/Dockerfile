# Aşama 1: Bağımlılıkları Kurma ve Derleme
FROM node:20-alpine AS build

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Geri kalan uygulama kodunu kopyala
COPY . .

# Uygulamayı derle (NestJS TypeScript projesi için)
RUN npm run build

# Aşama 2: Üretim Ortamı İmajı (Daha Küçük ve Güvenli)
FROM node:20-alpine

WORKDIR /app

# Sadece derlenmiş çıktıyı (dist klasörünü) ve node_modules'i kopyala
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Uygulamayı çalıştırmak için varsayılan komut
CMD ["node", "dist/main"]
