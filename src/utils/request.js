import axios from 'axios'
import { message } from 'antd'

// 用户token
// const token = ''

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://localhost:5000/api/";

/**
 * http request 拦截器
 */

axios.interceptors.request.use(
    (config) => {
      config.data = JSON.stringify(config.data);
      // 还没对formData处理
      config.headers = {
        "Content-Type": "application/json",
      };
      // 每次请求放入token
    //   config.headers.x_access_token = token
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

/**
 * http response 响应拦截器
 */
axios.interceptors.response.use(
    (response) => {
      if (response.data.errCode === 2) {
        console.log("过期");
      }
      return response;
    },
    (error) => {
      console.log("请求出错：", error);
      message.warning('网络请求失败,请重试');
      return Promise.reject(error)
    }
);


/**
 * 查看返回的数据 可以用在get
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
    if (data.code === -1) {
    }
}


/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params,
        }).then((response) => {
        //   landing(url, params, response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        (response) => {
          //关闭进度条
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
        //   msag(err);
          reject(err);
        }
      );
    });
}