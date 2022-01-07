/* eslint-disable max-classes-per-file */
import { v4 } from 'uuid';
import {
    AccountInfoParamsDto, AccountInfoResDto, OrderInfoParamsDto, OrderInfoResDto, TBulletPrivateRes, TLimitOrderBodyDto, TMarketOrderBody, TOrderRes,
} from '../../globals/api.type';
import { GET, POST } from '../../globals/endpoint.const';
import { BaseMethod } from './base-method.api';

const {
    ACCOUNTS,
    ORDER,
} = GET;

const {
    BULLET_PRIVATE,
    ORDERS,
} = POST;

class GetOrderInfoReq extends BaseMethod<OrderInfoResDto, OrderInfoParamsDto> {
    constructor(orderId: string) {
        super('GET', ORDER.generateLink(orderId));
    }
}

class GetAccountsReq extends BaseMethod<AccountInfoResDto, AccountInfoParamsDto> {
    constructor(
        params?: object,
    ) {
        super(
            'GET',
            ACCOUNTS,
            params,
        );
    }

    public setParams(params: AccountInfoParamsDto) {
        super.setParams(params);

        return this;
    }
}

class PostOrderLimitReq extends BaseMethod<TOrderRes, any, TLimitOrderBodyDto> {
    constructor() {
        super('POST', ORDERS);
    }

    public setBody(body: TLimitOrderBodyDto) {
        super.setBody(body);

        return this;
    }
}

const LIMIT = (side: 'buy' | 'sell') => ({
    symbol(symbol: string) {
        return {
            price(price: string) {
                return {
                    size(size: string) {
                        return new PostOrderLimitReq().setBody({
                            clientOid: v4(),
                            side,
                            symbol,
                            type: 'limit',
                            price,
                            size,
                        }) as Pick<PostOrderLimitReq, 'exec'>;
                    },
                };
            },
        };
    },
});

class PostOrderMarketReq extends BaseMethod<TOrderRes, any, TMarketOrderBody> {
    constructor() {
        super('POST', ORDERS);
    }

    public setBody(body: TMarketOrderBody) {
        super.setBody(body);

        return this;
    }
}

const MARKET = (
    side: 'buy' | 'sell',
) => ({
    symbol(symbol: string) {
        return {
            size(sizeOrFunds: string) {
                return new PostOrderMarketReq().setBody({
                    clientOid: v4(),
                    side,
                    type: 'market',
                    symbol,
                    size: sizeOrFunds,
                }) as Pick<PostOrderMarketReq, 'exec'>;
            },
            funds(sizeOrFunds: string) {
                return new PostOrderMarketReq().setBody({
                    clientOid: v4(),
                    side,
                    type: 'market',
                    symbol,
                    funds: sizeOrFunds,
                }) as Pick<PostOrderMarketReq, 'exec'>;
            },
        };
    },
});

class PostBulletPrivateReq extends BaseMethod<TBulletPrivateRes> {
    constructor() {
        super('POST', BULLET_PRIVATE);
    }
}

class GetReq {
    public static [ACCOUNTS] = new GetAccountsReq();

    public static [ORDER.endpoint] = {
        orderId(orderId: string) {
            return new GetOrderInfoReq(orderId);
        },
    };
}

class PostReq {
    public static [ORDERS] = {
        buy: {
            limit: LIMIT('buy'),
            market: {
                size: MARKET('buy'),
                funds: MARKET('buy'),
            },
        },
        sell: {
            limit: LIMIT('sell'),
            market: MARKET('sell'),
        },
    };

    public static [BULLET_PRIVATE] = new PostBulletPrivateReq();
}

export class KucoinReq {
    public static POST = PostReq;

    public static GET = GetReq;
}
