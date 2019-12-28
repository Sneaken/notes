```
flex-direction (适用于父类容器的元素上)
定义：设置或检索伸缩盒对象的子元素在父容器中的位置。
flex-direction: row | row-reverse | column | column-reverse
row：横向从左到右排列（左对齐），默认的排列方式。
row-reverse：反转横向排列（右对齐，从后往前排，最后一项排在最前面。
column：纵向排列。
column-reverse：反转纵向排列，从后往前排，最后一项排在最上面。
flex生效需定义其父元素display为flex或inline-flex(box或inline-box，这是旧的方式)
```

```
flex-wrap (适用于父类容器上)
设置或检索伸缩盒对象的子元素超出父容器时是否换行。
flex-wrap: nowrap | wrap | wrap-reverse
nowrap：当子元素溢出父容器时不换行。
wrap：当子元素溢出父容器时自动换行。
wrap-reverse：反转 wrap 排列。
```

```
flex-flow (适用于父类容器上)
复合属性。设置或检索伸缩盒对象的子元素排列方式。
flex-flow: <‘flex-direction’> || <‘flex-wrap’>
[ flex-direction ]：定义弹性盒子元素的排列方向。
[ flex-wrap ]：定义弹性盒子元素溢出父容器时是否换行。
```

```
justify-content (适用于父类容器上)
设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
当弹性盒里一行上的所有子元素都不能伸缩或已经达到其最大值时，这一属性可协助对多余的空间进行分配。当元素溢出某行时，这一属性同样会在对齐上进行控制。
justify-content: flex-start | flex-end | center | space-between | space-around

flex-start：弹性盒子元素将向行起始位置对齐。该行的第一个子元素的主起始位置的边界将与该行的主起始位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。
flex-end：弹性盒子元素将向行结束位置对齐。该行的第一个子元素的主结束位置的边界将与该行的主结束位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。
center：弹性盒子元素将向行中间位置对齐。该行的子元素将相互对齐并在行中居中对齐，同时第一个元素与行的主起始位置的边距等同与最后一个元素与行的主结束位置的边距（如果剩余空间是负数，则保持两端相等长度的溢出）。
space-between：弹性盒子元素会平均地分布在行里。如果最左边的剩余空间是负数，或该行只有一个子元素，则该值等效于'flex-start'。在其它情况下，第一个元素的边界与行的主起始位置的边界对齐，同时最后一个元素的边界与行的主结束位置的边距对齐，而剩余的伸缩盒项目则平均分布，并确保两两之间的空白空间相等。
space-around：弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。如果最左边的剩余空间是负数，或该行只有一个伸缩盒项目，则该值等效于'center'。在其它情况下，伸缩盒项目则平均分布，并确保两两之间的空白空间相等，同时第一个元素前的空间以及最后一个元素后的空间为其他空白空间的一半。
```
```
align-items (适用于父类容器上)
设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式。
align-items: flex-start | flex-end | center | baseline | stretch

flex-start：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴（纵轴）起始边界。
flex-end：弹性盒子元素的侧轴（纵轴）结束位置的边界紧靠住父容器的侧轴结束边界。
center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。
```
```
align-content (适用于父类容器上)
设置或检索弹性盒堆叠伸缩行的对齐方式。
align-content: flex-start | flex-end | center | space-between | space-around | stretch

flex-start：各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行。
flex-end：各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行。
center：各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等。（如果剩下的空间是负数，则各行会向两个方向溢出的相等距离。）
space-between：各行在弹性盒容器中平均分布。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'flex-start'。在其它情况下，第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等。
space-around：各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'center'。在其它情况下，各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半。
stretch：各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸。
```
```
order (适用于弹性盒模型容器子元素)
order: <integer>
<integer>：用整数值来定义排列顺序，数值小的排在前面。可以为负值。
就跟数组一样感觉 脚标小的排前面
```
```
flex-grow (适用于弹性盒模型容器子元素)
设置或检索弹性盒的扩展比率。

根据弹性盒子元素所设置的扩展因子作为比率来分配剩余空间。

flex-grow: <number> (default 0)
<number>：用数值来定义扩展比率。不允许负值
flex-grow的默认值为0，如果没有显示定义该属性，是不会拥有分配剩余空间权利的。本例中b,c两项都显式的定义了flex-grow，可以看到总共将剩余空间分成了4份，其中b占1份，c占3分，即1:3
```
```
flex-shrink (适用于弹性盒模型容器子元素)
设置或检索弹性盒的收缩比率（根据弹性盒子元素所设置的收缩因子作为比率来收缩空间。）

flex-shrink: <number> (default 1)

说明：
flex-shrink的默认值为1，如果没有显示定义该属性，将会自动按照默认值1在所有因子相加之后计算比率来进行空间收缩。
本例中c显式的定义了flex-shrink，a,b没有显式定义，但将根据默认值1来计算，可以看到总共将剩余空间分成了5份，其中a占1份，b占1份，c占3分，即1:1:3
我们可以看到父容器定义为400px，子项被定义为200px，相加之后即为600px，超出父容器200px。那么这么超出的200px需要被a,b,c消化
按照以上定义a,b,c将按照1:1:3来分配200px，计算后即可得40px,40px,120px，换句话说，a,b,c各需要消化40px,40px,120px，那么就需要用原定义的宽度相减这个值，最后得出a为160px，b为160px，c为80px
flex-basis (适用于弹性盒模型容器子元素)
设置或检索弹性盒伸缩基准值。
```

```
flex-basis: <length> | auto (default auto)
auto：无特定宽度值，取决于其它属性值
<length>：用长度值来定义宽度。不允许负值
<percentage>：用百分比来定义宽度。不允许负值
```

```
flex (适用于弹性盒模型子元素)
复合属性。设置或检索伸缩盒对象的子元素如何分配空间。
如果缩写flex:1, 则其计算值为：1 1 0

flex：none | [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
none：none关键字的计算值为: 0 0 auto
[ flex-grow ]：定义弹性盒子元素的扩展比率。
[ flex-shrink ]：定义弹性盒子元素的收缩比率。
[ flex-basis ]：定义弹性盒子元素的默认基准值。
演示：flex

说明：
上例中，定义了父容器宽（即主轴宽）为800px，由于子元素设置了伸缩基准值flex-basis，相加300+500+600=1400，那么子元素将会溢出1400-800=600px；
由于同时设置了收缩因子，所以加权综合可得300*1+500*2+600*3=3100px；
于是我们可以计算a,b,c将被移除的溢出量是多少：
a被移除溢出量：300*1/3100*600=3/31，即约等于58px
b被移除溢出量：500*2/3100*600=10/31，即约等于194px
c被移除溢出量：600*3/3100*600=18/31，即约等于348px
最后a,b,c的实际宽度分别为：300-58=242px, 500-194=306px, 600-348=252px
```
```
align-self (适用于弹性盒模型子元素)
设置或检索弹性盒子元素自身在侧轴（纵轴）方向上的对齐方式。

align-self: auto | flex-start | flex-end | center | baseline | stretch
auto：如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
flex-start：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
flex-end：弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
center：弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
baseline：如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
stretch：如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。
演示：align-self

常用例子
1.居中对齐
.flex-container {
  /* We first create a flex layout context */
  display: flex;

  /* Then we define the flow direction and if we allow the items to wrap 
   * Remember this is the same as:
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;

  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
}
通过设置父类容器的css代码控制子元素的排列方式（flex-direction:row）从左到右（默认方式）。
子元素超出内容时是否换行。flex-wrap:wrap（采用换行的方式）。
合起来就是flex-flow:row wrap
设置子元素的弹性盒堆叠伸缩行的对齐方式为在盒子中平局分布 justify-content:space-around
演示：flexbox3

2.自适应导航
/* Large */
.navigation {
  display: flex;
  flex-flow: row wrap;
  /* This aligns items to the end line on main-axis */
  justify-content: flex-end;
}

/* Medium screens */
@media all and (max-width: 800px) {
  .navigation {
    /* When on medium sized screens, we center it by evenly distributing empty space around items */
    justify-content: space-around;
  }
}

/* Small screens */
@media all and (max-width: 500px) {
  .navigation {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}
设置子元素为从左到右（flex-direction:row），内容超出换行（flex-wrap:wrap）.
设置子元素的内容向右对齐（justify-content:flex-end）
当小于800px时，内容为居中，当小于500px时，内容纵向排列，从上到下。
演示：flexbox4

3.常见3栏移动优先布局
.wrapper {
  display: flex;
  flex-flow: row wrap;
}

/* We tell all items to be 100% width */
.header, .main, .nav, .aside, .footer {
  flex: 1 100%;
}

/* We rely on source order for mobile-first approach
 * in this case:
 * 1. header
 * 2. nav
 * 3. main
 * 4. aside
 * 5. footer
 */

/* Medium screens */
@media all and (min-width: 600px) {
  /* We tell both sidebars to share a row */
  .aside { flex: 1 auto; }
}

/* Large screens */
@media all and (min-width: 800px) {
  /* We invert order of first sidebar and main
   * And tell the main element to take twice as much width as the other two sidebars 
   */
  .main { flex: 2 0px; }

  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
}
设置子元素从左到右，超出换行（flex-flow:row wrap;）。
默认情况下所有子元素拓展比例为1（flex-grow:1），伸缩比例为100%（flex-basis:100%）。
大于800px时，.main的拓展比例为2.伸缩值为0（flex-basis:0px）,并且侧栏aside-1排列在第一位，main在第二位，aside-2在第三位。
大于600时。.aside元素的拓展比例为1（flex-grow:1），伸缩比例为auto（flex-basis:auto）。
```

