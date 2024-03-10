export type Config = {
    DELAY_SERVICE_HOST: string;
    INITAPI_SERVICE_HOST: string;
    SENDER_SERVICE_HOST: string;
}

export interface DataItem {
    speed: number;
    from: string;
    to: string;
}