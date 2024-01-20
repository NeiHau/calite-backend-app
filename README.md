## アーキテクチャ

### BE（Backend）: gRPC通信

ビジネスロジックとデータの永続化を担当。
gRPC通信を使用して、効率的で型安全な方法でBFF層と通信。

### BFF（Backend for Frontend）: GraphQL通信

GraphQLを通じてデータを取得・操作するためのAPIエンドポイントを提供。
FEからのリクエストをBEサービスにルーティングします。

### FE：React.jsで実装

別プロジェクトにて管理。

## DB

Firebase、MongoDB

## 主な技術スタック

NestJS,
Typescript,
Firebase,
GraphQL,
Apollo Client,
gRPC,
MongoDB,
