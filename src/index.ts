import axios, { AxiosRequestConfig } from "axios";
import { parse as HTML, HTMLElement } from "node-html-parser";


const readMT = (el: HTMLElement, name: string) => {
    var prop = el.getAttribute('name') || el.getAttribute('property');
    return prop == name ? el.getAttribute('content') : null;
};

const parse = async (url: string, config?: AxiosRequestConfig) => {
    
    if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url)) return {};

    const { data } = await axios(url, config);

    const $ = HTML(data);
    const og = {}, meta = {}, images = [];


    const metas = $.querySelectorAll('meta');

    for (let i = 0; i < metas.length; i++) {
        const el = metas[i];

        // const prop = el.getAttribute('property') || el.getAttribute('name');

        ['title', 'description', 'image'].forEach(s => {
            const val = readMT(el, s);
            if (val) meta[s] = val;
        });

        ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:type'].forEach(s => {
            const val = readMT(el, s);
            if (val) og[s.split(':')[1]] = val;
        });
    }


    // images
    $.querySelectorAll('img').forEach(el => {
        let src: string = el.getAttribute('src');
        if (src) {
            src = new URL(src, url).href;
            images.push({ src });
        }
    });

    return { meta, og, images };

}


const parser = parse;

export default parser;

export { parse, parser };