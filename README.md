# Angular HTML in Canvas

Angular で構築した HTML を Canvas に描画し、ピクセルフィルターを適用する実験用リポジトリです。

Canvas 内の見出し・本文・入力欄を Angular の状態と同期しながら描画し、`ImageData` を操作して水面のような歪みを加えます。

## デモ内容

- Angular の signal / model で Canvas 内の表示を更新
- HTML 要素の変更を Canvas に再描画
- Canvas のピクセルを周期的に変位させるフィルター
- `ChangeDetectionStrategy.OnPush` を使用したコンポーネント

画面では次の操作を試せます。

| 操作                 | 動作                                        |
| -------------------- | ------------------------------------------- |
| 入力欄を編集         | Canvas 内の本文を更新します                 |
| 「テキストを変更」   | 見出しを「こんにちは、世界！」に変更します  |
| 「フィルターを適用」 | Canvas に歪みフィルターを繰り返し適用します |

## 動作環境

- Node.js（LTS 推奨）
- npm 11
- Angular 21

> [!IMPORTANT]
> このサンプルは `layoutsubtree` 属性、`paint` イベント、`CanvasRenderingContext2D.drawElementImage()` という標準化されていない API を使用しています。一般的なブラウザでは利用できない、または実験的な機能の有効化が必要な場合があります。プロダクション用途ではなく、HTML in Canvas の検証用として利用してください。

## セットアップ

リポジトリを取得した後、依存パッケージをインストールします。

```bash
npm install
```

開発サーバーを起動します。

```bash
npm start
```

ブラウザで <http://localhost:4200/> を開いてください。ソースコードを変更すると自動的に再ビルドされます。

## 利用できるコマンド

| コマンド        | 内容                                             |
| --------------- | ------------------------------------------------ |
| `npm start`     | 開発サーバーを起動します                         |
| `npm run build` | プロダクションビルドを `dist/` に出力します      |
| `npm run watch` | development 設定で変更を監視しながらビルドします |
| `npm test`      | Vitest でユニットテストを実行します              |

## 仕組み

描画処理は主に `HtmlInCanvas` コンポーネントにまとまっています。

1. `<canvas>` 内に通常の HTML 要素を記述します。
2. `drawElementImage()` で HTML 要素を Canvas の 2D コンテキストへ描画します。
3. `paint` イベントを受け取り、変更された要素を再描画します。
4. フィルター適用時は `getImageData()` でピクセルを取得します。
5. 正弦波・余弦波から求めた方向へ参照元ピクセルをずらし、`putImageData()` で描画し直します。

## 主なファイル

```text
src/app/
├── app.ts
└── html-in-canvas/
	├── html-in-canvas.ts       # 状態管理、Canvas 描画、フィルター処理
	├── html-in-canvas.html     # Canvas 内の HTML と操作ボタン
	├── html-in-canvas.css      # コンポーネントのスタイル
	└── html-in-canvas.spec.ts  # コンポーネントテスト
```

## 注意事項

- 「フィルターを適用」を押すたびに、新しいタイマーが開始されます。
- Canvas は `400 x 300` に固定されています。
- Canvas API の型定義に `drawElementImage()` がないため、このリポジトリではグローバル型を拡張しています。
- ブラウザや Canvas の実装によって、表示やイベントの発火状況が異なる可能性があります。

## 使用技術

- [Angular](https://angular.dev/) 21
- [TypeScript](https://www.typescriptlang.org/) 5.9
- [Vitest](https://vitest.dev/) 4
- Canvas 2D API
