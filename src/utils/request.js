import axios from 'axios'
import { message } from 'antd'
import { Tools } from './tools'

// 用户token

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://8.129.118.14:5000/api/";
axios.defaults.withCredentials = true  // nodejs和vue启动的端口不同，所以使用了cors跨域，影响了cookie的设置。 
                                      // 解决浏览器set-cookie显示有内容，但没写入cookie
/**
 * http request 拦截器
 */

axios.interceptors.request.use(
    (config) => {
      config.data = JSON.stringify(config.data);
      // 还没对formData处理
      // ....
      // 每次请求都会去getToken检测用户是否登录状态; 对应后端的checkLoginStatus
      const token = Tools.getToken()
      token === '' ? config.headers = {
        "Content-Type": "application/json",
      } : config.headers = {
        // 每次请求放入token
        // config.headers.auth = token
        "Content-Type": "application/json",
        "Authorization":token,
      };
  
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