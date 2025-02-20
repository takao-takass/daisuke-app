FROM node:22-slim

WORKDIR /app

# SSL証明書用のディレクトリを作成
# RUN mkdir -p /app/certificates

# 必要なパッケージをインストール
# RUN apt-get update && apt-get install -y openssl

# 自己署名証明書の生成
# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
#     -keyout /app/certificates/server.key \
#     -out /app/certificates/server.crt \
#     -subj "/C=JP/ST=Tokyo/L=Tokyo/O=Development/CN=localhost"

COPY package*.json ./

RUN npm install

COPY . .

# ARG REACT_APP_MESSAGE_STREAM_URL
# ENV REACT_APP_MESSAGE_STREAM_URL=$REACT_APP_MESSAGE_STREAM_URL

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "--ssl-cert", "/app/certs/tls.crt", "--ssl-key", "/app/certs/tls.key"]
#CMD ["serve", "-s", "build", "--ssl-cert", "/app/certificates/server.crt", "--ssl-key", "/app/certificates/server.key"]
#CMD ["serve", "-s", "build"]

EXPOSE 3000