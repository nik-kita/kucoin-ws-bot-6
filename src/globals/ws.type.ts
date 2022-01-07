/* eslint-disable max-classes-per-file */
import { WebSocket as TWs } from 'ws';
import { WS } from './endpoint.const';

const { MARKET_TICKER } = WS;

export type TListenerCb = (...args: any[]) => void;

export class BaseMessageDto {
    id!: string;

    type!: 'message' | 'ack' | 'welcome';
}

export type OnMessageCb<T extends BaseMessageDto = BaseMessageDto> = (message: T) => void;

export interface IGeneralPublish {
  id: string;

  type: 'subscribe' | 'unsubscribe';

  topic: string;

  response: boolean;
}

export class MarketTickerPubDto implements IGeneralPublish {
    constructor(
      public id: string,
      public type: 'subscribe' | 'unsubscribe' = 'subscribe',
      public coins?: string[],
    ) { }

    topic = MARKET_TICKER.generateLink(this.coins);

    response = true as const;
}

export type TData = {
  bestAsk: string,
  bestAskSize: string,
  bestBid: string,
  betsBidSize: string,
  price: string,
  lastPrice: number,
  startPrice: number,
  sequence: string,
  size: string,
  time: number,
  lastTime: number,
  startTime: number,
  agio?: number,
}

export default class MarketTickerMessageDto extends BaseMessageDto {
    target!: TWs;

    type!: 'message';

    topic!: string;

    subject!: string;

    data!: TData;
}

export type TMessage = 'message' | 'ack' | 'welcome' | 'error';

export class WelcomeMessageDto extends BaseMessageDto {
    id!: string;

    type!: 'welcome';
}

export class AckMessageDto extends BaseMessageDto {
    id!: string;

    type!: 'ack';
}
