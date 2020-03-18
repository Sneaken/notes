Fetch使用说明

```
fetch(url, options).then(function(response) { 
	// handle HTTP response
}, function(error) {
 	// handle network error
})

说明：
 a. fetch api返回的是一个promise对象
 b.Options:
    - method(String): HTTP请求方法，默认为`GET` 
    - body(String): HTTP的请求参数
    - headers(Object): HTTP的请求头，默认为{}
    - credentials(String): 默认为`omit`,忽略的意思，也就是不带cookie;还有两个参数，`same-origin`，意思就是同源请求带cookie；`include`,表示无论跨域还是同源请求都会带cookie
c.第一个then函数里面处理的是response的格式，这里的response具体如下：
    status(number): HTTP返回的状态码，范围在100-599之间
    statusText(String): 服务器返回的状态文字描述，例如Unauthorized,上图中返回的是Ok
    ok(Boolean): 如果状态码是以2开头的，则为true
    headers:  HTTP请求返回头
    body:  返回体，这里有处理返回体的一些方法
        text(): 将返回体处理成字符串类型
        json()： 返回结果和 JSON.parse(responseText)一样
        blob()： 返回一个Blob，Blob对象是一个不可更改的类文件的二进制数据
        arrayBuffer()
        formData()
```

Fetch常见坑

- 兼容性

![img](https:////upload-images.jianshu.io/upload_images/6522842-7dc287ba1a1dead9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

如caniuse所示，IE浏览器完全不支持fetch，移动端的很多浏览器也不支持,所以，如果要在这些浏览器上使用Fetch，就必须使用fetch polyfill

- cookie传递
   必须在header参数里面加上`credentials: 'include'`，才会如xhr一样将当前cookies带到请求中去

- fetch和xhr的不同
   fetch虽然底层，但是还是缺少一些常用xhr有的方法，比如能够取消请求（abort）方法
   fetch在服务器返回4xx、5xx时是不会抛出错误的，这里需要手动通过，通过response中的ok字段和status字段来判断

-  我们在实际应用中虽然会因为它没有interceptor等原因还需要再封装一层，但fetch api仍然不失为一个非常赞的API。。。。

  

```
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
    	'Content-Type': 'application/json'
	}
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
```

