# @kazoo0104/shared

EndtimesJPプロジェクトの各アプリケーション（バックエンド、フロントエンド）で共有されるデータ構造や型定義を管理するための共通パッケージです。
Zodを使用してスキーマを定義し、型安全性とバリデーションを保証します。

[このプロジェクトの基本コンセプトは、「日本国内のクリスチャンに向けて、世界の情報を聖書への信仰に基づいて配信する」ことである。イスラエル情勢、リバイバル情報、各国情勢、迫害情報などが主要なテーマとなります。][[memory:2530365055759444189]]

## ✨ 主な特徴

-   **一元管理**: プロジェクト全体で利用するデータモデルを一つの場所で管理し、DRY（Don't Repeat Yourself）の原則を徹底します。
-   **型安全**: TypeScriptとZodにより、コンパイル時および実行時の両方で強力な型安全性を確保します。
-   **スキーマ駆動開発**: Zodスキーマを信頼できる唯一の情報源（Single Source of Truth）とし、データ構造の変更に強い設計を実現します。

## 📦 スキーマ詳細

### `ArticleSchema`
データベース上の`Article`テーブルのレコードと1対1で対応する基本的なZodスキーマです。アプリケーション内で記事データを扱う際の標準的な型として利用します。

-   `id`: \`number\` - 記事の一意な識別子（DB側で自動採番）
-   `title`: \`string\` - 記事のタイトル（1文字以上）
-   `content`: \`string\` - 記事の本文（1文字以上）
-   `sourceUrl`: \`string\` (optional) - 参照元記事のURL（有効なURL形式である必要があります）
-   `imageUrl`: \`string\` (optional) - サムネイル画像のURL（有効なURL形式である必要があります）
-   `published`: \`boolean\` (default: \`false\`) - 公開状態。デフォルトは非公開。
-   `createdAt`: \`Date\` - 作成日時（DB側で自動設定）
-   `updatedAt`: \`Date\` - 更新日時（DB側で自動設定）

### `CreateArticleDtoSchema`
**目的: 新規記事作成時のバリデーション**

新規記事作成API (\`POST /articles\`) のリクエストボディを検証するために使用します。\`ArticleSchema\`をベースにしていますが、以下の点が異なります。

-   **除外されるフィールド**: \`id\`, \`createdAt\`, \`updatedAt\` はデータベースによって自動的に生成・管理されるため、クライアントから送信されるデータには含まれません。
-   **必須フィールド**: \`title\` と \`content\` は最低でも1文字以上必要です。

\`\`\`typescript
// 利用例
const newArticleData = {
  title: "新しい記事",
  content: "これは新しい記事の本文です。",
  sourceUrl: "https://example.com/news/123"
};

try {
  const validatedData = CreateArticleDtoSchema.parse(newArticleData);
  // validatedData を使ってデータベースに保存する処理
} catch (error) {
  // バリデーションエラーの処理
  console.error(error);
}
\`\`\`

### `UpdateArticleDtoSchema`
**目的: 記事更新時のバリデーション**

記事更新API (\`PATCH /articles/:id\`) のリクエストボディを検証するために使用します。\`CreateArticleDtoSchema\`の全てのフィールドをオプショナル（任意）にしています。

-   **部分更新への対応**: \`PATCH\`メソッドのセマンティクスに基づき、クライアントは変更したいフィールドのみを送信できます。このスキーマは、送信されなかったフィールドの検証をスキップします。

\`\`\`typescript
// 利用例: タイトルだけを更新する
const partialUpdateData = {
  title: "更新された記事のタイトル"
};

try {
  const validatedData = UpdateArticleDtoSchema.parse(partialUpdateData);
  // validatedData を使ってデータベースの該当記事を更新する処理
} catch (error) {
  // バリデーションエラーの処理
  console.error(error);
}
\`\`\`

## 🛠️ セットアップ

### 利用者 (Consumer)
このパッケージを利用するプロジェクト（\`backend-api\`, \`web-viewer\`など）での設定です。

1.  **インストール**:
    \`\`\`bash
    pnpm add @kazoo0104/shared
    \`\`\`

2.  **\`.npmrc\`の設定**:
    プロジェクトのルートに\`.npmrc\`ファイルを作成し、以下を記述します。
    \`\`\`
    @kazoo0104:registry=https://npm.pkg.github.com/
    \`\`\`

### 開発者 (Contributor)
この\`shared\`パッケージ自体を開発する場合のセットアップです。

1.  **リポジトリのクローン**:
    \`\`\`bash
    git clone https://github.com/kazoo0104/enddaysjp-shared.git
    cd enddaysjp-shared
    \`\`\`

2.  **依存パッケージのインストール**:
    \`\`\`bash
    pnpm install
    \`\`\`

3.  **ビルド**:
    変更を他のパッケージで利用するためには、ビルドが必要です。
    \`\`\`bash
    pnpm build
    \`\`\`

## 🚀 使い方

### スキーマのインポート

\`\`\`typescript
import { ArticleSchema, CreateArticleDtoSchema } from '@kazoo0104/shared';
\`\`\`

### 型としての利用

Zodの\`infer\`機能を使って、スキーマからTypeScriptの型を生成できます。

\`\`\`typescript
import { z } from 'zod';
import { ArticleSchema } from '@kazoo0104/shared';

type Article = z.infer<typeof ArticleSchema>;

const articleData: Article = {
    id: 1,
    title: "記事のタイトル",
    content: "記事の本文です。",
    // ...その他のプロパティ
};
\`\`\`

### バリデーション

APIのエンドポイントなどで、入力データを検証するために使用します。

\`\`\`typescript
// (例: NestJSのControllerやExpressのルートハンドラ内)
import { CreateArticleDtoSchema } from '@kazoo0104/shared';

function createArticle(data: unknown) {
    const validatedData = CreateArticleDtoSchema.parse(data);
    // ...バリデーション済みデータを使った処理
}
\`\`\`

## 🤝 コントリビューションガイド

スキーマの追加や変更は、このリポジトリで行います。

### 開発フロー
1.  \`src/schemas\`ディレクトリに新しいスキーマファイルを追加するか、既存のファイルを編集します。
2.  \`src/index.ts\`から新しいスキーマをエクスポートします。
3.  変更内容をビルドして確認します: \`pnpm build\`
4.  変更内容をコミットします。コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)の規約に従うことを推奨します（例: \`feat: add User schema\`）。
5.  \`package.json\`のバージョンを更新します。
6.  変更をプッシュし、プルリクエストを作成します。

### バージョン管理
当パッケージは[セマンティックバージョニング](https://semver.org/lang/ja/)に従います。
-   \`PATCH\` (例: 0.1.0 -> 0.1.1): バグ修正など、後方互換性を壊さない変更
-   \`MINOR\` (例: 0.1.0 -> 0.2.0): 新機能の追加など、後方互換性のある変更
-   \`MAJOR\` (例: 0.1.0 -> 1.0.0): 後方互換性のない破壊的な変更

バージョンの更新には\`pnpm\`コマンドが便利です。
\`\`\`bash
pnpm version patch # または minor, major
\`\`\`

### パッケージの公開
mainブランチにマージされた後、以下のコマンドでGitHub Packagesに公開します。
（公開には適切な権限を持つPATが必要です）

\`\`\`bash
pnpm publish
\`\`\`
