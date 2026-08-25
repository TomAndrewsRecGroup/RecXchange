FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL=http://localhost:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3001
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

CMD ["npx", "next", "start", "-p", "3001", "-H", "0.0.0.0"]
