# jest.mock('模块')

## 用户的模块

- 手动模拟是通过在紧邻模块的`__mocks__` 子目录中写入模块来定义的。
- 例如，要在 models 目录中模拟名为 user 的模块，请创建一个名为 user.js 的文件，并将其放在 models `__mocks__`目录中。请注意，`__mocks__`文件夹区分大小写，因此在某些系统上命名目录`__MOCKS__`将不起作用。

## node 模块

- 如果要模拟的模块是 Node 模块（例如：lodash），则模拟应放置在与 node_modules 相邻的`__mocks__`目录中（除非您将根目录配置为指向项目根目录以外的文件夹），并且将自动 mock。无需显式调用 jest.mock（'module_name'）。
- 警告：如果我们要模拟 Node 的核心模块（例如：fs 或 path），请显式调用例如 jest.mock（'path'）是必需的，因为默认情况下不对核心 Node 模块进行模拟。

## 例子

```
├── config
├── __mocks__
│   └── fs.js
├── models
│   ├── __mocks__
│   │   └── user.js
│   └── user.js
├── node_modules
└── views
```

```js
// FileSummarizer.js
"use strict";

const fs = require("fs");

function summarizeFilesInDirectorySync(directory) {
  return fs.readdirSync(directory).map(fileName => ({
    directory,
    fileName
  }));
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
```

```js
// __mocks__/fs.js
"use strict";

const path = require("path");

const fs = jest.genMockFromModule("fs");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;
```

```js
// __tests__/FileSummarizer-test.js
"use strict";

jest.mock("fs");

describe("listFilesInDirectorySync", () => {
  const MOCK_FILE_INFO = {
    "/path/to/file1.js": 'console.log("file1 contents");',
    "/path/to/file2.txt": "file2 contents"
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    require("fs").__setMockFiles(MOCK_FILE_INFO);
  });

  test("includes all files in the directory in the summary", () => {
    const FileSummarizer = require("../FileSummarizer");
    const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
      "/path/to"
    );

    expect(fileSummary.length).toBe(2);
  });
});
```
