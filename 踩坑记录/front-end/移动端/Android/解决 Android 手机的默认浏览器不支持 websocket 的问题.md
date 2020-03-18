```
如何解决 Android 手机的默认浏览器不支持 websocket 的问题？

解决办法就是把通信层的 websocket 改成 websocket+http 双协议，对外封装成Net. 
业务层对 websocket 的调用都改成对 Net 的调用 。
Net 默认连接 websocket ，如果不支持，就自动切换到 http 长轮询 。
http 的长轮询在使用的时候会有卡顿现象 。
```

