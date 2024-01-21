## アーキテクチャ

### BE（Backend）: 'Service'ディレクトリ。gRPC通信を使用。

ビジネスロジックとデータの永続化を担当。
gRPC通信を使用して、効率的で型安全な方法でBFF層と通信。

### BFF（Backend for Frontend）: 'bff'ディレクトリ。GraphQL通信を使用。

GraphQLを通じてデータを取得・操作するためのAPIエンドポイントを提供。
FEからのリクエストをBEサービスにルーティングします。

インメモリストアとしてRedisを採用。

### FE：React.jsで実装

別プロジェクトにて管理。

https://github.com/NeiHau/calite-frontend-app

## DB

Firebase、MongoDB

## 主な技術スタック

NestJS,
Typescript,
Firebase,
GraphQL,
Apollo Client,
gRPC,
Redis,
MongoDB,
