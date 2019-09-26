```
如何解决移动端 HTML5 音频标签 audio 的 autoplay 属性失效问题？
因为自动播放网页中的音频或视频会给用户带来一些困扰或者 不必要的流量消耗，所以苹果系统和 Android 系统通常都会禁止自动播放和使用 JavaScript 的触发播放，必须由用户来触发才可以播放。

解决这个问题的代码如下。
document.addEventListener ('touchstart'， function(){
    //播放音频
    document.getElementsByTagName('audio')[0].play();
    //暂停音频
    document.getElementsByTagName('audio')[0].pause();
})
```

