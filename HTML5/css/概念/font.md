## 字体的复合写法
font :  font-size/line-height   font-family    font-weight    font-variant     font-style;

## 字体样式

```
主要是用于指定斜体文字的字体样式属性。
这个属性有三个值：
正常 - 正常显示文本
斜体 - 以斜体字显示的文字
倾斜的文字 - 文字向一边倾斜（和斜体非常类似，但不太支持）
p.normal {font-style:normal;}
p.italic {font-style:italic;}
p.oblique {font-style:oblique;}
```

## 用em来设置字体大小

```
为了避免Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替像素。
em的尺寸单位由W3C建议。
1em和当前字体大小相等。在浏览器中默认的文字大小是16px。
因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：px/16=em
h1 {font-size:2.5em;} /* 40px/16=2.5em */
h2 {font-size:1.875em;} /* 30px/16=1.875em */
p {font-size:0.875em;} /* 14px/16=0.875em */
```

## font-weight

```
normal	默认值。定义标准的字符。
bold	定义粗体字符。
bolder	定义更粗的字符。
lighter	定义更细的字符。
inherit	规定应该从父元素继承字体的粗细。
义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。
范围：100-900 文字的粗细分为9级    100最细     900最粗

p.normal {font-weight:normal;}
p.thick {font-weight:bold;}
p.thicker {font-weight:900;}
```

## font-size:	值			设置文字大小 	值的取值如下
```
			px		
			%
			em      	等于父级字体的大小 
			rem			等于html标签的字体大小
```

## line-height:值		设置一行文字所占的高度	值的取值如下
```
			px			
			%			
			number
```

## font-varient:值		设置文字为小型大写字母	值的取值如下

```
			normal				正常文字
			small-caps			小型大写字母		
```

