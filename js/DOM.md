## 一、节点属性

#### 1、childNodes \ `children`

> Ele.childNodes ————————–子节点集合 
> 元素.childNodes : 只读 属性 子节点列表集合 
> 标准下： 包含了文本和元素类型的节点，也会包含非法嵌套的子节点 
> 非标准下：只包含元素类型的节点，ie7以下不会包含非法嵌套子节点 
> childNodes 只包含一级子节点，不包含后辈孙级

`ele.children`————————– 获取第一级子元素 
`nodeType` : 只读 属性 当前元素的节点类型 共12种

- 元素节点: 1
- 属性节点: 2 wrap.attributes[0].nodeType
- 文本节点: 3

`nodeName` 节点名称

元素节点属性

- ele.`tagName` 元素标签名称

有关属性节点操作

- 获取 ： obj.getAttributeNode() 方法获取指定的属性节点。
- 创建 ： document.`createAttribute(name)` 创建拥有指定名称的属性节点，并返回新的 Attr 对象。
- 添加 ： obj.setAttributeNode() 方法向元素中添加指定的属性节点。

#### 1、firstChild \ `firstElementChild` 第一个子节点

> ele.firstChild : 只读 属性 
> 标准下：firstChild会包含文本类型的节点 
> 非标准下：只包含元素节点
>
> ele.`firstElementChild` : 只读 属性 标准下获取第一个元素类型的子节点 
> 非标准下：无

------

#### 2、lastChild \ `lastElementChild` —————————————————最后一个子节点

> 兼容性同上

------

#### 3、nextSibling \ `nextElementSibling` ——————————————`下一个兄弟`节点

> 兼容性同上

------

#### 4、previousSibling \ `previousElementSibling` ——————————-`上一个兄弟`节点

> 兼容性同上

------

#### 5、`parentNode`———————————————————————获取父节点

------

#### 6、`offsetParent` ——————————————————————最近定位父级

------

#### 7、`childElementCount` 子元素节点个数

> 元素类型子节点数量，等同于 `children.length`

------

## 二、创建节点

------

1、`document.createElement('')` 创建元素节点

> innerHTML += 添加元素的问题，`原本子元素没有了`，不是原本的元素了

2、`document.createTextNode(str)` 创建文本节点

3、 element`.cloneNode()` 参数`true克隆元素及后代`不会克隆属性及事件，false克隆本元素

------

## 三、元素节点操作（操作的都是节点）

##### 1、parent.`insertBefore(`new, node`)` 在已有元素`前插入`

> 插入子元素 ,在指定的子元素前面插入

##### 2、parent.`appendChild(`new`)` 在已有元素`后插入`

> 插入插入子元素，在指定的子元素前面插入 
> 例子：留言板插入内容

##### 3、parent.`removeChild(`节点`)`删除一个节点

> 删除DOM元素

##### 4、parent.`replaceChild(`new, old`)`替换节点

> 换元素