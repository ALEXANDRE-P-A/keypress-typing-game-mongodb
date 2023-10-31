renderにデプロイ
1.アカウント作成
[Github](https://github.com)
[render](https://render.com) ※Githubアカウントでログイン推奨

2.Githubにリポジトリを作成
・git init (フォルダがgitの監視対象になる)
・git add. (フォルダの全てがgitのアップロード対象になる)
・git commit -m "init" (アップロードの確定)
・git branch -M main (現在使用中のブランチをmainにする)
・git remote add origin git@github.com:ALEXANDRE-P-A/keypress-typing-game.git (インターネット上にあるgithubのURLを登録)

3.Githubにコードをpush
・git push -u origin main (アップロードを実行)

4.renderで新しい[Web Servuce]を作成
・renderのダッシュボードから[+new]の[Web Service]を選択
・gihubからアプリケーションを接続して[connect]を選択

5.renderで Build Command を登録
・renderに下記のbuildを設定
```npm install && npm run build```

6.renderで Start Command を登録
・renderに下記のサーバーを立ち上げるためのコマンドを設定 (これでexpressサーバーが立ち上がる)
```npm start```

7.環境変数の設定
・[Advanced]を選択して[Add Environment Variables]を選択してprocess.envの環境変数を設定