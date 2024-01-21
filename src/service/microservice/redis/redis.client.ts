import { PubSub } from 'graphql-subscriptions';
import Redis from 'ioredis';

const pubSub = new PubSub();

async function startStreamReader(redisClient: Redis) {
  let lastId = '0'; // 最初に読み取るストリームのID

  while (true) {
    const stream = await redisClient.xread(
      'BLOCK',
      0,
      'STREAMS',
      'stream:chatRoom:specificChatRoomId',
      lastId,
    );

    const messages = stream[0][1]; // 取得したメッセージ
    for (const message of messages) {
      const [id, messageData] = message;
      lastId = id; // 更新されたIDを記録

      // 取得したメッセージをSubscriptionにプッシュ
      const parsedMessage = JSON.parse(messageData[1]); // 'message'フィールドのデータをパース
      pubSub.publish('newMessage', { newMessage: parsedMessage });
    }
  }
}

export default startStreamReader;
