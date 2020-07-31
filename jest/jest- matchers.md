# matcher 匹配器

1. toBe 使用 Object.is 来测试精确相等

   ```js
   test("two plus two is four", () => {
     expect(2 + 2).toBe(4);
   });
   ```

2. toEqual 检查对象的值,递归检查对象或数组的每个字段

   ```js
   test("object assignment", () => {
     const data = { one: 1 };
     data["two"] = 2;
     expect(data).toEqual({ one: 1, two: 2 });
   });
   ```

3. not 相反的匹配

   ```
   test('adding positive numbers is not zero', () => {
     for (let a = 1; a < 10; a++) {
       for (let b = 1; b < 10; b++) {
         expect(a + b).not.toBe(0);
       }
     }
   });
   ```

4. 在测试中，你有时需要区分 undefined、 null，和 false，但有时你又不需要区分。 Jest 让你明确你想要什么。

   - toBeNull 只匹配 null
   - toBeUndefined 只匹配 undefined
   - toBeDefined 与 toBeUndefined 相反
   - toBeTruthy 匹配任何 if 语句为真
   - toBeFalsy 匹配任何 if 语句为假

   ```js
   test("null", () => {
     const n = null;
     expect(n).toBeNull();
     expect(n).toBeDefined();
     expect(n).not.toBeUndefined();
     expect(n).not.toBeTruthy();
     expect(n).toBeFalsy();
   });

   test("zero", () => {
     const z = 0;
     expect(z).not.toBeNull();
     expect(z).toBeDefined();
     expect(z).not.toBeUndefined();
     expect(z).not.toBeTruthy();
     expect(z).toBeFalsy();
   });
   ```

5. 数字 大小匹配

   - toBeGreaterThan >
   - toBeGreaterThanOrEqual >=
   - toBeLessThan <
   - toBeLessThanOrEqual <=

   ```js
   test("two plus two", () => {
     const value = 2 + 2;
     expect(value).toBeGreaterThan(3);
     expect(value).toBeGreaterThanOrEqual(3.5);
     expect(value).toBeLessThan(5);
     expect(value).toBeLessThanOrEqual(4.5);

     // toBe and toEqual are equivalent for numbers
     expect(value).toBe(4);
     expect(value).toEqual(4);
   });
   ```

   - toBeCloseTo 浮点数相加 近似相等

   ```js
   test("两个浮点数字相加", () => {
     const value = 0.1 + 0.2;
     //expect(value).toBe(0.3); 这句会报错，因为浮点数有舍入误差
     expect(value).toBeCloseTo(0.3); // 这句可以运行
   });
   ```

6. 字符串

   - toMatch 匹配正则

   ```
   test('there is no I in team', () => {
     expect('team').not.toMatch(/I/);
   });

   test('but there is a "stop" in Christoph', () => {
     expect('Christoph').toMatch(/stop/);
   });
   ```

7. 数组 | 可迭代对象

   - toContain 是否包含

   ```js
   const shoppingList = [
     "diapers",
     "kleenex",
     "trash bags",
     "paper towels",
     "beer"
   ];

   test("the shopping list has beer on it", () => {
     expect(shoppingList).toContain("beer");
     expect(new Set(shoppingList)).toContain("beer");
   });
   ```

8. 抛错

   - toThrow 测试的特定函数抛出一个错误

   ```js
   function compileAndroidCode() {
     throw new Error("you are using the wrong JDK");
   }

   test("compiling android goes as expected", () => {
     expect(compileAndroidCode).toThrow();
     expect(compileAndroidCode).toThrow(Error);

     // You can also use the exact error message or a regexp
     expect(compileAndroidCode).toThrow("you are using the wrong JDK");
     expect(compileAndroidCode).toThrow(/JDK/);
   });
   ```
