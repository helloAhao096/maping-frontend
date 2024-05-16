// import axios from 'axios';
//
// // 创建请求实例
// const instance = axios.create({
//     baseURL: '/api',
//     // 指定请求超时的毫秒数
//     timeout: 1000,
//     // 表示跨域请求时是否需要使用凭证
//     withCredentials: false,
// });
//
// // 前置拦截器（发起请求之前的拦截）
// instance.interceptors.request.use(
//     (config) => {
//         /**
//          * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
//          * const token = getToken()
//          * if (token) {
//          *  config.headers.token = token
//          * }
//          */
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );
//
// // 后置拦截器（获取到响应时的拦截）
// instance.interceptors.response.use(
//     (response) => {
//         /**
//          * 根据你的项目实际情况来对 response 和 error 做处理
//          * 这里对 response 和 error 不做任何处理，直接返回
//          */
//         return response;
//     },
//     (error) => {
//         const { response } = error;
//         if (response && response.data) {
//             return Promise.reject(error);
//         }
//         const { message } = error;
//         console.error(message);
//         return Promise.reject(error);
//     },
// );
//
// // 导出常用函数
//
// /**
//  * @param {string} url
//  * @param {object} data
//  * @param {object} params
//  */
// export function post(url, data = {}, params = {}) {
//     return instance({
//         method: 'post',
//         url,
//         data,
//         params,
//     });
// }
//
// /**
//  * @param {string} url
//  * @param {object} params
//  */
// export function get(url, params = {}) {
//     return instance({
//         method: 'get',
//         url,
//         params,
//     });
// }
//
// /**
//  * @param {string} url
//  * @param {object} data
//  * @param {object} params
//  */
// export function put(url, data = {}, params = {}) {
//     return instance({
//         method: 'put',
//         url,
//         params,
//         data,
//     });
// }
//
// /**
//  * @param {string} url
//  * @param {object} params
//  */
// export function _delete(url, params = {}) {
//     return instance({
//         method: 'delete',
//         url,
//         params,
//     });
// }
//
// export default instance;

import axios from "axios";
import { showMessage } from "./status"; // 引入状态码文件
import { ElMessage } from "element-plus"; // 引入el 提示框，这个项目里用什么组件库这里引什么

// 设置接口超时时间
axios.defaults.timeout = 60000;
axios.defaults.baseURL = "/api" || "";  // 自定义接口地址

const token = () => {
    if (sessionStorage.getItem("token")) {
        return sessionStorage.getItem("token");
    } else {
        return sessionStorage.getItem("token");
    }
};

//请求拦截
axios.interceptors.request.use(
    (config) => {
        // 配置请求头
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
        config.headers["token"] = token();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            showMessage(response.status); // 传入响应码，匹配响应码对应信息
            return Promise.reject(response.data);
        } else {
            alert("网络连接异常,请稍后再试!");
        }
    }
);

// 封装 请求并导出
export function request(data: any) {
    return new Promise((resolve, reject) => {
        const promise = axios(data);
        //处理返回
        promise
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err: any) => {
                reject(err.data);
            });
    });
}