# ベースイメージの指定
FROM node:latest

# ワークディレクトリを作成して、そこにアプリケーションのファイルをコピー
WORKDIR /usr/src/app
COPY . .

# TypeScriptコンパイラをインストール
RUN npm install -g typescript

# 依存関係をインストール
RUN npm install

# TypeScriptをビルド
RUN tsc

RUN npx prisma generate

EXPOSE 8080

# アプリケーションを実行
CMD ["node", "dist/index.js"]
