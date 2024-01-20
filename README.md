## アーキテクチャ

### BFF（Backend for Frontend）: GraphQL通信

GraphQLを通じてデータを取得・操作するためのAPIエンドポイントを提供。
FEからのリクエストをBEサービスにルーティングします。

### BE（Backend）: gRPC通信

ビジネスロジックとデータの永続化を担当。
gRPC通信を使用して、効率的で型安全な方法でBFF層と通信。

## DB

Firebaseを使用

## 技術スタック

NestJS
Typescript
Firebase
GraphQL
gRPC
MongoDB
