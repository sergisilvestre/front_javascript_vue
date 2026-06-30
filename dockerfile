# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Build de Nuxt
RUN npm run build


# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

# Copiar build desde la etapa anterior
COPY --from=build /app ./

# Exponer puerto
EXPOSE 3000

# Arrancar Nuxt
CMD ["node", ".output/server/index.mjs"]