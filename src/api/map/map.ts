import { request } from "../../utils/request.ts";

export function convert(params: any) {
    return request({
        baseURL: '/amap',
        url: "/v3/assistant/coordinate/convert",
        method: "get",
        params,
    });
}

export function inputtips(params: any) {
    return request({
        baseURL: '/amap',
        url: "/v3/assistant/inputtips",
        method: "get",
        params,
    });
}

export function poiDetail(params: any) {
    // key=您的key&id=B0FFFAB6J2
    // restapi.amap.com/v3/place/detail?key=您的key&id=B0FFFAB6J2
    return request({
        baseURL: '/amap',
        url: "v3/place/detail",
        method: "get",
        params,
    });
}