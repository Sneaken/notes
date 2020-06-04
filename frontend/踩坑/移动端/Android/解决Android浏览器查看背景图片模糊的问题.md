```
如何解决 Android 浏览器查看背景图片模糊的问题？

这个问题是 devicePixelRatio 的不同导致的 ，
因为手机分辨率太小，如果按照分辨率来显示网页，字会非常小 ， 所以苹果系统当初就把 iPhone 4 的 960 × 640 像素 的分辨率在网页里更改为 480 x 320 像素， 这样 devicePixelRatio = 2 . 
而 Android 的 devicePixe!Ratio比较乱 ， 值有 1.5 、 2 和 3 。 
为了在手机里更为清晰地显示图片，必须使用 2 倍 宽高 的背景图末代替 img 标签（ 一般情况下都使用 2 倍）。
例如一个 div 的 宽高是 lOOpx x lOOpx ，背景图必须是 200px泣OOpx，然后设直 backgroundsize:contain 样式，显示出来的图片就比较清晰了 。
```

