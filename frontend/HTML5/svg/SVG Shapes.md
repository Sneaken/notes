```
矩形 <rect>
圆形 <circle>
椭圆 <ellipse>
线 <line>
折线 <polyline>
多边形 <polygon>
路径 <path>
```

- style 属性用来定义 CSS 属性

- CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）

- CSS 的 stroke-width 属性定义矩形边框的宽度

- CSS 的 stroke 属性定义矩形边框的颜色

  ```
  <!--矩形内部默认填充黑色-->
  <rect width="300" height="300"/>
  <!--矩形内部填充蓝色-->
  <rect width="300" height="300" style="fill:blue;"/>
  
  ```



- x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
- y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
- CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
- CSS 的 stroke-opacity 属性定义轮廓颜色的透明度（合法的范围是：0 - 1）

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect x="50" y="20" width="150" height="150"
          style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;
  stroke-opacity:0.9"/>
</svg>
```

