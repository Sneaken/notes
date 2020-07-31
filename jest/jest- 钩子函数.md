1. beforeAll 所有用例开始之前执行

   ```js
   beforeAll(() => {});
   ```

2. afterAll 所有用例结束之后执行

   ```js
   afterAll(() => {});
   ```

3. beforeEach 每个用例开始之前执行

   ```js
   beforeEach(() => {});
   ```

4. afterEach 每个用例结束之后执行
   ```js
   afterEach(() => {});
   ```


## 钩子函数的作用域

- 钩子函数在父级分组可作用于子集，类似继承
- 钩子函数同级作用域互不干扰，各起作用
- 先执行外部的钩子函数，再执行内部的钩子函数。

## 分组 
```js

describe('父1',()=>{
    beforeAll(()=>{
      console.log('beforeAll 父1')
    })
})

describe('父2',()=>{
    beforeAll(()=>{
      console.log('beforeAll 父2')
    })
})

```
