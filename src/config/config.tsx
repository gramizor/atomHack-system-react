import { Config } from "./types";

export const getEnv = () : Config | undefined => {
    const delayHost = import.meta.env.VITE_DELAY_SERVICE_HOST
    if (delayHost === undefined) {
        return;
    };

    const initapiHost = import.meta.env.VITE_DELAY_INITAPI_HOST
    if (initapiHost === undefined) {
        return;
    };

    return {
        DELAY_SERVICE_HOST: delayHost,
        INITAPI_SERVICE_HOST: initapiHost
    };
};