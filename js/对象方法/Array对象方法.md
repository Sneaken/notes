<table>
        <tbody>
            <tr>
                <th style="width:15%">方法</th>
                <th style="width:40%">描述</th>
                <th>返回值/注释</th>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_concat_array.asp">concat()</a></td>
                <td>连接两个或更多的数组，并返回结果。
                    <span style='background-color:red'>未改变原数组。</span></td>
                <td>返回一个新的数组。
                    该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-copywithin.html">copyWithin()</a></td>
                <td>从数组的指定位置拷贝元素到数组的另一个指定位置中。<span style='background-color:red'>改变原数组。</span></td>
                <td>array.copyWithin(target, start, end)
target 必需。复制到指定目标索引位置。
start 可选。元素复制的起始位置。
end 可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-entries.html">entries()</a></td>
                <td>entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
迭代对象中数组的索引值作为 key， 数组元素作为 value。</td>
                <td>语法 array.entries()
                entries() 方法返回一个数组的迭代对象</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-every.html">every()</a></td>
                <td>检测数值元素的每个元素是否都符合条件。
                    <span style='background-color:red'>注意： every() 不会对空数组进行检测。注意： every() 不会改变原始数组。</span></td>
                <td>语法 array.every(function(currentValue,index,arr), thisValue)
如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
如果所有元素都满足条件，则返回 true。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-fill.html">fill()</a></td>
                <td>使用一个固定值来填充数组。<span style='background-color:red'>改变原数组。</span></td>
                <td>语法 array.fill(value, start, end) 返回被填充的数组 
参数	描述
value 必需。填充的值。
start 可选。开始填充位置。下标
end	可选。停止填充位置 (默认为 array.length) 正常序号</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-filter.html">filter()</a></td>
                <td>检测数值元素，并返回符合条件所有元素的数组。</td>
                <td>返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。
语法 array.filter(function(currentValue,index,arr), thisValue)</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-find.html"> find()</a></td>
                <td>返回符合传入测试（函数）条件的数组元素。<span style='background-color:red'>注意: find() 对于空数组，函数是不会执行的。注意: find() 并没有改变数组的原始值。</span></td>
                <td>find() 方法为数组中的每个元素都调用一次函数执行：
当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 undefined</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-findindex.html"> findIndex()</a></td>
                <td>返回符合传入测试（函数）条件的数组元素索引。<span style='background-color:red'>注意: findIndex() 对于空数组，函数是不会执行的。注意: findIndex() 并没有改变数组的原始值。</span></td>
                <td>findIndex() 方法为数组中的每个元素都调用一次函数执行：
当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 -1</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-foreach.html"> forEach()</a></td>
                <td>数组每个元素都执行一次回调函数。</td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-from.html"> from()</a></td>
                <td>通过给定的对象中创建一个数组。</td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-includes.html">includes()</a></td>
                <td>判断一个数组是否包含一个指定的值。</td>
                <td>返回值：	布尔值。如果找到指定值返回 true，否则返回 false。
语法 arr.includes(searchElement) arr.includes(searchElement, fromIndex)
searchElement 必须。需要查找的元素值。
fromIndex 可选。从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-indexof-array.html">indexOf()</a></td>
                <td>搜索数组中的元素，并返回它所在的位置。</td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-isarray.html">isArray()</a></td>
                <td>判断对象是否为数组。</td>
                <td>返回值：布尔值，如果对象是数组返回 true，否则返回 false。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_join.asp">join()</a></td>
                <td>把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。</td>
                <td>返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-keys.html">keys()</a></td>
                <td>返回数组的可迭代对象，包含原始数组的键(key)。</td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-lastindexof-array.html">lastIndexOf()</a></td>
                <td>返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-map.html">map()</a></td>
                <td>通过指定函数处理数组的每个元素，并返回处理后的数组。<span style='background-color:red'>不改变原数组</span></td>
                <td>返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_pop.asp">pop()</a></td>
                <td>删除并返回数组的最后一个元素</td>
                <td>arrayObject 的最后一个元素。
                    如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_push.asp">push()</a></td>
                <td>向数组的末尾添加一个或更多元素，并返回新的长度。</td>
                <td>把指定的值添加到数组后的新长度。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-reduce.html">reduce()</a></td>
                <td>将数组元素计算为一个值（从左到右）。</td>
                <td>语法
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
函数参数:
参数	描述
total 必需。初始值, 或者计算结束后的返回值。
currentValue 必需。当前元素
currentIndex 可选。当前元素的索引
arr 可选。当前元素所属的数组对象。
initialValue 可选。传递给函数的初始值</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-reduceright.html">reduceRight()</a></td>
                <td>将数组元素计算为一个值（从右到左）。</td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_reverse.asp">reverse()</a></td>
                <td>颠倒数组中元素的顺序。</td>
                <td>该方法会<span style='background-color:red'>改变原来的数组</span>，而不会创建新的数组。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_shift.asp">shift()</a></td>
                <td>删除并返回数组的第一个元素</td>
                <td>数组原来的第一个元素的值。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_slice_array.asp">slice()</a></td>
                <td>从某个已有的数组返回选定的元素</td>
                <td>返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
                    请注意，<span style='background-color:red'>该方法并不会修改数组</span>，而是返回一个子数组。
                    您可使用负值从数组的尾部选取元素。</td>
            </tr>
            <tr>
                <td><a href="http://www.runoob.com/jsref/jsref-some.html">some()</a></td>
                <td>检测数组元素中是否有元素符合指定条件。</td>
                <td>some() 方法会依次执行数组的每个元素：
如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
如果没有满足条件的元素，则返回false。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_sort.asp">sort()</a></td>
                <td>对数组的元素进行排序。<span style='background-color:red'>改变原数组</span></td>
                <td>对数组的引用。请注意，数组在原数组上进行排序，不生成副本。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_splice.asp">splice()</a></td>
                <td>删除元素，并向数组添加新元素。<span style='background-color:red'>改变原数组</span></td>
                <td>包含被删除项目的新数组，如果有的话。<span style='background-color:red'>此时还能访问index位置上的数据</span></td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_toString_array.asp">toString()</a></td>
                <td>把数组转换为字符串，并返回结果。</td>
                <td>arrayObject 的字符串表示。返回值与没有参数的 join() 方法返回的字符串相同。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_unshift.asp">unshift()</a></td>
                <td>向数组的开头添加一个或更多元素，并返回新的长度。</td>
                <td>arrayObject 的新长度。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_toLocaleString_array.asp">toLocaleString()</a></td>
                <td>把数组转换为本地数组，并返回结果。</td>
                <td>arrayObject 的本地字符串表示。</td>
            </tr>
            <tr>
                <td><a href="http://www.w3school.com.cn/jsref/jsref_valueof_array.asp">valueOf()</a></td>
                <td>返回数组对象的原始值.该原始值由 Array 对象派生的所有对象继承。</td>
                <td>返回 Array 对象的原始值。</td>
            </tr>
        </tbody>
    </table>

​	

