# ---- Etapa 1: Build (Construcción) ----
# Usamos una imagen completa de Node para construir
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiamos los package.json
COPY package*.json ./

# Instalamos TODAS las dependencias (incl. devDependencies)
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Ejecutamos el build
RUN npm run build
# Ahora existe la carpeta /usr/src/app/dist


# ---- Etapa 2: Production (Producción) ----
# Empezamos desde una imagen limpia y ligera
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos los package.json de nuevo
COPY package*.json ./

# Instalamos SÓLO las dependencias de producción
RUN npm install --omit=dev

# Copiamos SOLO la carpeta 'dist' compilada desde la etapa 'builder'
COPY --from=builder /usr/src/app/dist ./dist

# Exponemos el puerto
EXPOSE 3000

# Ejecutamos el mismo comando 'start' que ya tenías
CMD ["npm", "run", "start"]