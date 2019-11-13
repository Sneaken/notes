```
<div>
    <span>内容</span>
    <!---按钮是position：fixed--->
    <button style='position:fiexd'>点击提交</button>
</div>

如果是上面的这种结构，如果内容过长，超出了手机的高度，页面往上或往下滑动的时候，按钮就会跟着页面滚动，原因是将button和内容平级了，包含在了同一个父级；

处理方式是将button与内容的父级平级，就解决此问题；

<div>
    <span>内容</span>
</div>
<!---按钮是position：fixed--->
<button style='position:fiexd'>点击提交</button>
```

亲测可用  反正别放在滚动容器内就对了