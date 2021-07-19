import { AxiosRequestConfig } from "axios";
declare const parse: (url: string, config?: AxiosRequestConfig) => Promise<{
    meta?: undefined;
    og?: undefined;
    images?: undefined;
} | {
    meta: {};
    og: {};
    images: any[];
}>;
declare const parser: (url: string, config?: AxiosRequestConfig) => Promise<{
    meta?: undefined;
    og?: undefined;
    images?: undefined;
} | {
    meta: {};
    og: {};
    images: any[];
}>;
export default parser;
export { parse, parser };
