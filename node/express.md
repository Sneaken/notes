```
监听请求的API
1 use 能监听所有方法   每天路由路径，则所有请求都经过中间件
2 get 监听get请求
3 post 监听post请求
put
head
delete
options
trace
copy
lock
mkcol
move
purge
propfind
proppatch
unlock
report
mkactivity
checkout
merge
m-search
notify
subscribe
unsubscribe
patch
search
connect
```

```
路由函数的回调有三个参数（通常命名为：req、res、next），分别是：HTTP 请求对象、HTTP 响应、中间件链中的下一个函数。
```

```javascript
//使用中间件来处理（格式化）请求中的数据
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
	extended:允许选择使用querystring库（此时false）或qs库（此时true）解析URL编码数	据。
    
取值：
	post请求
    	在HTTP请求后面加上body对象 req.body
		body对象是前端提交的数据
    get请求
    	req.query
```

