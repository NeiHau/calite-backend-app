/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "contact";

/** メッセージ送信リクエストのデータ構造を定義 */
export interface SendMessageRequest {
  /** 送信するメッセージの内容 */
  content: string;
  /** 送信者のユーザーID */
  senderId: string;
  /** 送信先のチャットルームID */
  chatRoomId: string;
  date: number;
}

/** メッセージ送信レスポンスのデータ構造を定義 */
export interface SendMessageResponse {
  /** 送信されたメッセージのID */
  messageId: string;
  /** 送信の成功または失敗 */
  success: boolean;
  /** エラーメッセージ（送信に失敗した場合） */
  errorMessage: string;
}

export const CONTACT_PACKAGE_NAME = "contact";

/** メッセージ送信のためのサービスを定義 */

export interface MessageServiceClient {
  /** メッセージを送信するメソッドを定義 */

  sendMessage(request: SendMessageRequest): Observable<SendMessageResponse>;
}

/** メッセージ送信のためのサービスを定義 */

export interface MessageServiceController {
  /** メッセージを送信するメソッドを定義 */

  sendMessage(
    request: SendMessageRequest,
  ): Promise<SendMessageResponse> | Observable<SendMessageResponse> | SendMessageResponse;
}

export function MessageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendMessage"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MessageService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MESSAGE_SERVICE_NAME = "MessageService";
