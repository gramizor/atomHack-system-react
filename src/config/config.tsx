import { Config } from "./types";

export const getEnv = (): Config | undefined => {
    const delayHost = import.meta.env.VITE_DELAY_SERVICE_HOST;
    if (delayHost === undefined) {
        return;
    };

    const initapiHost = import.meta.env.VITE_INITAPI_SERVICE_HOST;
    if (initapiHost === undefined) {
        return;
    };

    const senderHost = import.meta.env.VITE_SENDER_SERVICE_HOST;
    if (senderHost === undefined) {
        return;
    }
    const earthHost = import.meta.env.VITE_EARTH_FRONTEND_HOST;
    if (senderHost === undefined) {
        return;
    }
    const marsHost = import.meta.env.VITE_MARS_FRONTEND_HOST;
    if (senderHost === undefined) {
        return;
    }
    const initFrontHost = import.meta.env.VITE_INIT_FRONTEND_HOST;
    if (senderHost === undefined) {
        return;
    }

    return {
        DELAY_SERVICE_HOST: delayHost,
        INITAPI_SERVICE_HOST: initapiHost,
        SENDER_SERVICE_HOST: senderHost,
        EARTH_FRONTEND_HOST: earthHost,
        MARS_FRONTEND_HOST: marsHost,
        INIT_FRONTEND_HOST: initFrontHost,
    };
};