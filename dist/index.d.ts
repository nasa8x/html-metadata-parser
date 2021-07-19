import { AxiosRequestConfig } from "axios";
interface Meta {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    site_name?: string;
}
declare const parse: (url: string, config?: AxiosRequestConfig) => Promise<{
    meta?: undefined;
    og?: undefined;
    images?: undefined;
} | {
    meta: Meta;
    og: Meta;
    images: any[];
}>;
declare const parser: (url: string, config?: AxiosRequestConfig) => Promise<{
    meta?: undefined;
    og?: undefined;
    images?: undefined;
} | {
    meta: Meta;
    og: Meta;
    images: any[];
}>;
export default parser;
export { parse, parser };
