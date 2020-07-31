1. 回调式

    fetch-data.js
    
    ```js
    export function fetchData(fn) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true
          });
        }, 3000);
      }).then(response => {
        fn(response);
      });
    }
    ```
    
    fetch-data.test.js
    
    ```js
    test("fetch data", done => {
      fetchData(data => {
        expect(data).toEqual({
          success: true
        });
        done();
      });
    });
    ```

2. return 式

    fetch-data.js
    
    ```js
    export function fetchData() {
      return new Promise((resolve, reject) => {
        resolve({
          success: true
        });
        reject("error");
      });
    }
    ```
    
    fetch-data.test.js
    
    ```js
    test("fetch data return ", () => {
      // 这边要加 return 否则很明显出问题了
      return fetchDataReturn().then(response => {
        expect(response).toEqual({
          success: false
        });
      });
    });
    ```

3. async 式

    fetch-data.js
    
    ```js
    export function fetchData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true
          });
        }, 3000);
      });
    }
    ```
    
    fetch-data.test.js
    
    ```js
    // 方式一
    test("fetch data async", async () => {
      await expect(fetchData()).resolves.toMatchObject({ success: true });
    });
    // 方式二 这个方式简单明了 感觉
    test("fetch data async2", async () => {
      const response = await fetchData();
      expect(response).toEqual({ success: true });
    });
    ```

4. 必须执行 expect 1 次

    fetch-data.js
    
    ```js
    export function fetchDataError() {
      return new Promise((resolve, reject) => {
        resolve("222");
        reject("error2");
      });
    }
    ```
    
    fetch-data.test.js
    
    ```js
    test("fetch data error ", () => {
      expect.assertions(1); // 断言， 必须执行一次 expect
      fetchDataError().catch(err => {
        expect(err.toString() === "error2").toBe(true);
      });
    });
    ```
