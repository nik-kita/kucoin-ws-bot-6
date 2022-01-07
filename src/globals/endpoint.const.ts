export const HOST = 'https://api.kucoin.com' as const;

export const GET = {
    ACCOUNTS: '/api/v1/accounts' as const,
    ORDER: {
        endpoint: '/api/v1/orders/:orderId' as const,
        generateLink: (orderId: string) => `/api/v1/orders/${orderId}`,
    },
};

export const POST = {
    ORDERS: '/api/v1/orders' as const,
    BULLET_PRIVATE: '/api/v1/bullet-private' as const,
};

export const WS = {
    MARKET_TICKER: {
        endpoint: '/market/ticker:' as const,
        generateLink: (coins?: string[]) => `/market/ticker:${coins ? coins.join(',') : 'all'}`,
    },
};
