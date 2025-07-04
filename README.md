```jsx
src/
├── app/                      # Next.js App Routerのページ構成
│   ├── (auth)/               # 認証関連ページ
│   │   ├── login/page.tsx    # ログインページ
│   │   ├── register/page.tsx # 新規登録ページ
│   │   └── layout.tsx        # 認証系レイアウト
│   │
│   ├── (courses)/            # コース一覧・詳細
│   │   ├── page.tsx          # コース一覧ページ
│   │   ├── [id]/page.tsx     # コース詳細ページ
│   │   └── layout.tsx        # コース用レイアウト
│   │
│   ├── (dashboard)/          # 管理者ダッシュボード
│   │   ├── page.tsx          # 講師ダッシュボードTOP
│   │   ├── courses/page.tsx  # コース管理ページ
│   │   ├── courses/new/page.tsx # 新規コース登録ページ
│   │   └── layout.tsx        # ダッシュボード用レイアウト
│   │
│   ├── api/                  # APIルート（Next.js）
│   │   ├── stripe/webhook/route.ts # Stripe Webhook
│   │   ├── courses/route.ts       # コース取得API
│   │   ├── purchases/route.ts     # 購入権限チェックAPI
│   │
│   └── layout.tsx            # アプリ全体レイアウト
│
├── components/               # UIコンポーネント
│   ├── ui/                   # ボタン・モーダルなど汎用UI
│   ├── course/               # コース関連のコンポーネント
│   ├── auth/                 # 認証用コンポーネント
│   ├── dashboard/            # 管理画面用コンポーネント
│
├── lib/                      # ライブラリ・ユーティリティ
│   ├── supabase.ts           # Supabaseクライアント
│   ├── stripe.ts             # Stripeクライアント
│   ├── clerk.ts              # Clerkクライアント
│   ├── auth.ts               # 認証ロジック
│
├── types/                    # TypeScript型定義
│   ├── course.ts             # コース型
│   ├── user.ts               # ユーザー型
│
└── config/                   # 環境設定
    ├── stripeConfig.ts       # Stripe設定
    ├── supabaseConfig.ts     # Supabase設定

```

### 🟢 **機能要件 (MVP)**

### 1️⃣ **ユーザー機能**

- **ユーザー登録・ログイン**
    - Google認証（Clerk Auth使用）
    - Email/Password認証（任意・追加可）
- **動画一覧閲覧**
    - 無料コースは誰でも視聴可能
    - 有料コースは購入後のみ視聴可能（権限管理あり）
- **コース購入**
    - Stripe Checkoutで決済
    - Webhook連携で購入後に自動で視聴権限を付与
- **視聴履歴**
    - 自分が購入したコース一覧をダッシュボード表示

---

### 2️⃣ **管理者（講師）機能**

- **コース作成**
    - タイトル・説明・価格・動画ファイルのアップロード（Supabase Storage or Cloudinary）
- **コース編集・削除**
    - 講師が登録したコースの管理
    - 講師ごとに作成・管理できる（講師権限チェック）

---

### ✅ **追加で考えておくと便利な点**

- 🎯 **Row Level Security**
SupabaseのRLSで「このユーザーだけがこの動画を視聴できる」制御
- 🎯 **動画ファイル容量**
Supabase無料枠（2GB）を超えそうならCloudinaryに切り替え可
- 🎯 **レスポンシブ対応**
スマホ視聴が多いので最初からモバイルファーストで

---

この要件なら、
✅ **無料枠だけで開発・デプロイ可能**
✅ SaaS案件の営業にそのまま使える

---