FROM node:24-alpine AS build

WORKDIR /workspace
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm ci

COPY frontend/ ./frontend/
RUN npm --prefix frontend run build -- --configuration container

FROM nginx:alpine
COPY containers/frontend.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/frontend/dist/simply-note-app/browser/ /usr/share/nginx/html/

EXPOSE 80