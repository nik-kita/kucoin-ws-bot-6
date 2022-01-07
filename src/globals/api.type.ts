/* eslint-disable max-classes-per-file */
export type AccountInfoResDto = [{
  id: string,
  currency: string,
  type: 'main' | 'trade' | 'margin' | 'pool',
  balance: string,
  available: string,
  holds: string,
}]

export class AccountInfoParamsDto {
    type?: 'main' | 'trade' | 'margin';

    currency?: string;
}

export type OrderInfoParamsDto = {
  orderId: string
}

export class OrderInfoResDto {
    orderId!: string;

    symbol!: string;

    opType!: 'DEAL' | 'CANCEL';

    type!: 'limit' | 'market' | 'stop_limit' | 'stop_market';

    side!: 'buy' | 'sell';

    price!: string;

    size!: string;

    funds!: string;

    dealFunds!: string;

    dealSize!: string;

    fee!: string;

    feeCurrency!: string;

    stp!: 'CN' | 'CO' | 'DC' | 'CB' | '';

    stop!: 'entry' | 'loss' | '';

    stopTriggered!: boolean;

    stopPrice!: string;

    timeInForce!: 'GTC' | 'GTT' | 'IOC' | 'FOK';

    postOnly!: boolean;

    hidden!: boolean;

    iceberg!: boolean;

    visibleSize!: string;

    cancelAfter!: number;

    channel!: string;

    clientOid!: string;

    remark?: string;

    tags!: string;

    isActive!: boolean;

    cancelExist!: boolean;

    createdAt!: Date;

    tradeType!: 'TRADE' | 'MARGIN_TRADE';
}

export type TOrderRes = {
  orderId: string,
}

export type TBaseOrderBody = {
  clientOid: string,

  side: 'buy' | 'sell',

  symbol: string,
};

// requires one of 'size' or 'funds' properties
export type TMarketOrderBody = TBaseOrderBody & {
  type: 'market',

  size?: string,

  funds?: string,
};

export type TLimitOrderBodyDto = TBaseOrderBody & {
  size: string,

  price: string,

  type: 'limit',
};

export type TBulletPrivateRes = {
  token: string,
  instanceServers: [
      {
          endpoint: string,
          encrypt: number,
          protocol: string,
          pingInterval: number,
          pingTimeout: number,
      }
  ]
}
