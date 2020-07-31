```
$ yarn init -y # 先创建package.json文件
$ yarn add --dev jest
```

sum.js
```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

sum.test.js
```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

将下面的配置部分添加到你的 package.json 里面：

```
{
  "scripts": {
    "test": "jest"
  }
}
```

```
$ yarn test

PASS  ./sum.test.js 正常应该看到这个
```

## 注意事项

1. 用 git bash 做命令行 会报
    ```
    No tests found, exiting with code 1
    Run with `--passWithNoTests` to exit with code 0
    No files found in [这边是项目目录].
    Make sure Jest's configuration does not exclude this directory.
    To set up Jest, make sure a package.json file exists.
    Jest Documentation: facebook.github.io/jest/docs/configuration.html
    ```
2. 这时候只能选择不用 git bash 做命令行。希望有人能补充下。
