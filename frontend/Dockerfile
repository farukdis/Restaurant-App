# Aşama 1: Bağımlılıkları Kurma ve Uygulamayı Derleme
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vue.js uygulamasını derle
# Bu komut, uygulamanın üretim için optimize edilmiş statik dosyalarını 'dist' klasörüne oluşturur.
RUN npm run build

# Aşama 2: Üretim Ortamı İçin Nginx ile Daha Küçük ve Temiz İmaj
FROM nginx:alpine

# Konteyner içindeki Nginx'in statik dosyaları okuyacağı dizini belirtir.
# Nginx varsayılan olarak /usr/share/nginx/html dizininden sunar.
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx yapılandırma dosyasını kopyala
# Bu, Nginx'in SPA (Single Page Application) yönlendirmelerini doğru yapmasını sağlar.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx'in varsayılan olarak 80 portunu dinlediği varsayılır.
EXPOSE 80

# Nginx web sunucusunu başlat
CMD ["nginx", "-g", "daemon off;"]