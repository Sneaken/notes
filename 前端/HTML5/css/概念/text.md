## text-align:	值				设置文本的对齐方式
```
			left				文本靠左边对齐
			center				文本居中对齐
			right				文本靠右边对齐
			justify				文本两端对齐
```
## text-decoration

```
text-decoration 属性用来设置或删除文本的装饰。
从设计的角度看 text-decoration属性主要是用来删除链接的下划线：
a {text-decoration:none;}
也可以这样装饰文字：
h1 {text-decoration:overline;}   上划线
h2 {text-decoration:line-through;}  中划线
h3 {text-decoration:underline;} 下划线
```

## text-transform 大写和小写字母

```
p.uppercase {text-transform:uppercase;}
p.lowercase {text-transform:lowercase;}
p.capitalize {text-transform:capitalize;}单词首字母大写
```

## text-indent 		值					设置文本的缩进

```
文本缩进
文本缩进属性是用来指定文本的第一行的缩进。
				px			
				em					1em  =   单个文字的大小
				%					相对于父级的宽度
```

## white-space

```
设置文本的换行方式
normal			文本换行
nowrap			文本不换行
```

## word-break:break-all		打断单词 强制文本换行

## letter-spacing 设置字(字母)之间的距离

## word-spacing  设置单词之间的距离

## text-overflow

```
文本超出的处理方式
ellipsis			超出的文本处理成省略号 

单行文本省略  一套组合代码
overflow:hidden;		
white-space:nowrap; 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
text-overflow:ellipsis
```

