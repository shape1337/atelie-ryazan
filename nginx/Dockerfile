FROM node:18-alpine AS builder
WORKDIR /app
COPY ../frontend/package.json ../frontend/package-lock.json* ./
COPY ../frontend ./frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
