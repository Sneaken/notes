1、axios的特点有哪些？

```
支持浏览器和node.js
支持promise
能拦截请求和响应
能转换请求和响应数据
能取消请求
自动转换JSON数据
浏览器端支持防止CSRF(跨站请求伪造)
```

2、axios有哪些常用方法？

```
axios.get(url[, config])   //get请求用于列表和信息查询
axios.delete(url[, config])  //删除
axios.post(url[, data[, config]])  //post请求用于信息的添加
axios.put(url[, data[, config]])  //更新操作
```

3、说下你了解的axios相关配置属性？

```
url 是用于请求的服务器URL

method 是创建请求时使用的方法,默认是get

baseURL 将自动加在 url 前面，除非 url 是一个绝对URL。它可以通过设置一个 baseURL 便于为axios实例的方法传递相对URL

transformRequest 允许在向服务器发送前，修改请求数据，只能用在'PUT','POST'和'PATCH'这几个请求方法

headers 是即将被发送的自定义请求头
headers:{'X-Requested-With':'XMLHttpRequest'},

params 是即将与请求一起发送的URL参数，必须是一个无格式对象(plainobject)或URLSearchParams对象
params:{
	ID:12345
},

auth 表示应该使用HTTP基础验证，并提供凭据
这将设置一个 Authorization 头，覆写掉现有的任意使用 headers 设置的自定义Authorization头
auth:{
	username:'janedoe',
	password:'s00pers3cret'
},

proxy 定义代理服务器的主机名称和端口
`auth`表示HTTP基础验证应当用于连接代理，并提供凭据
这将会设置一个`Proxy-Authorization`头，覆写掉已有的通过使用`header`设置的自定义`Proxy-Authorization`头。
proxy:{
	host:'127.0.0.1',
	port:9000,
	auth::{
        username:'mikeymike',
        password:'rapunz3l'
	}
},

// 响应格式
// 可选项 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
responseType: 'json', // 默认值是json

// 设置http响应内容的最大长度
maxContentLength: 2000,
```

4、response组成？

```
response由以下几部分信息组成
{
  // 服务端返回的数据
  data: {},

  // 服务端返回的状态码
  status: 200,

  // 服务端返回的状态信息
  statusText: 'OK',

  // 响应头
  // 所有的响应头名称都是小写
  headers: {},

  // axios请求配置
  config: {},

  // 请求
  request: {}
}


用then接收以下响应信息
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

5、默认配置

```
全局修改axios默认配置
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

实例默认配置
// 创建实例时修改配置
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 实例创建之后修改配置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

配置优先级
配置项通过一定的规则合并，request config > instance.defaults > 系统默认，优先级高的覆盖优先级低的。
// 创建一个实例，这时的超时时间为系统默认的 0
var instance = axios.create();

// 通过instance.defaults重新设置超时时间为2.5s，因为优先级比系统默认高
instance.defaults.timeout = 2500;

// 通过request config重新设置超时时间为5s，因为优先级比instance.defaults和系统默认都高
instance.get('/longRequest', {
  timeout: 5000
});
```

6、在then和catch之前拦截请求和响应。

```
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  
如果之后想移除拦截器你可以这么做
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);

你也可以为axios实例添加一个拦截器
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

