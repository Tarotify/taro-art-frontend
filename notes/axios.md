> 常用场景
1. 对特定的状态码，进行特殊处理（如 4xx 状态码，统一重定向到 404 页面）；
2. get 请求封装；
3. post 请求封装；
4. 返回数据 json 中的特定 code，作统一处理（如后端接口定义 220 - 300的状态码，对返回文案需要统一进行弹框提示）；
5. 单页面的多接口的并发请求（await 导致的多余等待）；

> 封装方案
1. 能够实现全局的开始 loading、结束 loading、文案弹框的基本组件或方案（可以使用 redux 实现全局通用组件的控制和页面缓存的使用）
2. ES6 语法，支持 Promise、async、await 基本异步操作


> 请求之前
一般接口都会携带鉴权认证（token）之类的，因此在接口的请求头里面，我们需要带上 token 值以通过服务器的鉴权认证。但是如果每次请求的时候再去添加，不仅会大大地加大工作量，而且容易出错。我们可以通过 axios 的请求拦截机制，在每次请求的拦截器中添加 token
```js
// 请求拦截
axios.interceptors.request.use((config) => {
  //....省略代码
  config.headers.x_access_token = token
  return config
}, function (err) {
  return Promise.reject(err)
})
```
> 相应拦截
```JS
// 响应拦截
axios.interceptors.response.use(function (response) {
  if (response.data.code === 401 ) {//用户token失效
    //清空用户信息
    sessionStorage.user = ''
    sessionStorage.token = ''
    window.location.href = '/';//返回登录页
    return Promise.reject(msg)//接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
  }
  if(response.status!==200||response.data.code!==200){//接口请求失败，具体根据实际情况判断
    message.error(msg);//提示错误信息
    return Promise.reject(msg)//接口Promise返回错误状态
  }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    requestList.length = 0
    // store.dispatch('changeGlobalState', {loading: false})
    throw new axios.Cancel('cancel request')
  } else {
    message.error('网络请求失败,请重试')
  }
  return Promise.reject(error)
})
```