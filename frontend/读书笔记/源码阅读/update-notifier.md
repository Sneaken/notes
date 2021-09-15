# update-notifier 源码解析

## 1. 介绍

### 1.1 本包的介绍

Inform users of your package of updates in a non-intrusive way.

### 1.2 使用到的其他包

#### 1.2.1 [import-lazy](https://www.npmjs.com/package/import-lazy)

> 模块懒加载

```js
// Pass in `require` or a custom import function
const importLazy = require('import-lazy')(require);
const _ = importLazy('lodash');

// Instead of referring to its exported properties directly…
_.isNumber(2);

// …it's cached on consecutive calls
_.isNumber('unicorn');

// Works out of the box for functions and regular properties
const stuff = importLazy('./math-lib');
console.log(stuff.sum(1, 2)); // => 3
console.log(stuff.PHI); // => 1.618033

// warning: 不要使用解构
const { isNumber, isString } = importLazy('lodash');
// 等效于
import { isNumber, isString } from 'lodash';
```

#### 1.2.2 [configstore](https://www.npmjs.com/package/configstore/v/5.0.1)

> Easily load and persist config without having to think about where and how.

#### 1.2.3 [semver-diff](https://www.npmjs.com/package/semver-diff/v/3.1.1)

> Get the diff type of two semver versions

> For example: 0.0.1 0.0.2 → patch

#### 1.2.4 [latest-version](https://www.npmjs.com/package/latest-version/v/5.1.0)

> Get the latest version of an npm package

#### 1.2.5 [latest-version](https://www.npmjs.com/package/is-npm/v/5.0.0)

> Check if your code is running as an npm or yarn script

#### 1.2.6 [is-installed-globally](https://www.npmjs.com/package/is-installed-globally/v/0.4.0)

> Check if your package was installed globally

#### 1.2.7 [is-yarn-global](https://www.npmjs.com/package/is-yarn-global/v/0.3.0)

> Check if installed by yarn globally without any fs calls

#### 1.2.8 [has-yarn](https://www.npmjs.com/package/has-yarn/v/2.1.0)

> Check if a project is using Yarn

#### 1.2.9 [boxen](https://www.npmjs.com/package/boxen/v/5.1.1)

> Create boxes in the terminal

#### 1.2.10 [xdg-basedir](https://www.npmjs.com/package/xdg-basedir/v/4.0.0)

> Get XDG Base Directory paths

[What is XDG?](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)

#### 1.2.11 [is-ci](https://www.npmjs.com/package/is-ci/v/3.0.0)

> Returns true if the current environment is a Continuous Integration server.

#### 1.2.12 [pupa](https://www.npmjs.com/package/pupa/v/2.1.1)

> Simple micro templating

### 1.3 前置知识

1.3.1 [npm dist tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag)

## 2. 源码解析

### 2.1 UpdateNotifier 整体结构

```js
class UpdateNotifier {
  // 初始化操作
  constructor(options = {}) {}

  check() {}

  async fetchInfo() {}

  notify(options) {}
}
```

### 2.2 初始化阶段

```js
class UpdateNotifier {
  // 初始化操作
  constructor(options = {}) {
    this.options = options;
    // 容错处理
    options.pkg = options.pkg || {};
    options.distTag = options.distTag || 'latest';

    // Reduce pkg to the essential keys. with fallback to deprecated options
    // TODO: Remove deprecated options at some point far into the future
    options.pkg = {
      name: options.pkg.name || options.packageName,
      version: options.pkg.version || options.packageVersion,
    };

    // 必要字段检测
    if (!options.pkg.name || !options.pkg.version) {
      throw new Error('pkg.name and pkg.version required');
    }

    this.packageName = options.pkg.name;
    this.packageVersion = options.pkg.version;

    // 检查周期 单位是ms
    // const ONE_DAY = 1000 * 60 * 60 * 24;
    this.updateCheckInterval = typeof options.updateCheckInterval === 'number' ? options.updateCheckInterval : ONE_DAY;

    // 禁用状态检测
    this.disabled =
      'NO_UPDATE_NOTIFIER' in process.env ||
      process.env.NODE_ENV === 'test' ||
      process.argv.includes('--no-update-notifier') ||
      isCi();
    this.shouldNotifyInNpmScript = options.shouldNotifyInNpmScript;

    if (!this.disabled) {
      try {
        const ConfigStore = configstore();
        this.config = new ConfigStore(`update-notifier-${this.packageName}`, {
          optOut: false,
          // Init with the current time so the first check is only
          // after the set interval, so not to bother users right away
          lastUpdateCheck: Date.now(),
        });
      } catch {
        // try ... catch ... 如果不关注具体错误信息的话 可以不指定异常标识符

        // Expecting error code EACCES or EPERM
        const message =
          chalk().yellow(format(' %s update check failed ', options.pkg.name)) +
          format('\n Try running with %s or get access ', chalk().cyan('sudo')) +
          '\n to the local update config store via \n' +
          chalk().cyan(format(' sudo chown -R $USER:$(id -gn $USER) %s ', xdgBasedir().config));

        process.on('exit', () => {
          console.error(boxen()(message, { align: 'center' }));
        });
      }
    }
  }

  check() {}

  async fetchInfo() {}

  notify(options) {}
}
```

### 2.3 check

```js
class UpdateNotifier {
  constructor(options = {}) {}

  check() {
    // 当存在以下情况时停止检查
    if (!this.config || this.config.get('optOut') || this.disabled) {
      return;
    }

    // 获取相关包的更新信息 第一次检查时是 undefined
    this.update = this.config.get('update');

    if (this.update) {
      // Use the real latest version instead of the cached one
      this.update.current = this.packageVersion;

      // 删除缓存的数据
      this.config.delete('update');
    }

    // Only check for updates on a set interval
    if (Date.now() - this.config.get('lastUpdateCheck') < this.updateCheckInterval) {
      return;
    }

    // Spawn a detached process, passing the options as an environment property
    spawn(process.execPath, [path.join(__dirname, 'check.js'), JSON.stringify(this.options)], {
      detached: true, // 准备子进程独立于其父进程运行
      stdio: 'ignore', // 不关注控制台的输入输出
      // stdio: 'inherit' // 如果想要在check.js 中查看log的话
    }).unref();
    // unref 方法用来断绝关系，这样“父”进程可以独立退出（不会导致子进程跟着退出）
    // 但要注意这时子进程的 stdio 也应该独立于“父”进程，否则“父”进程退出后子进程仍会受到影响
  }

  async fetchInfo() {}

  notify(options) {}
}

// check.js
let updateNotifier = require('.');

const options = JSON.parse(process.argv[2]);

updateNotifier = new updateNotifier.UpdateNotifier(options);

(async () => {
  // Exit process when offline
  setTimeout(process.exit, 1000 * 30);

  // 获取包最新的信息
  const update = await updateNotifier.fetchInfo();

  // Only update the last update check time on success
  updateNotifier.config.set('lastUpdateCheck', Date.now());

  // 只要不是最新的包 就设置更新字段
  if (update.type && update.type !== 'latest') {
    updateNotifier.config.set('update', update);
  }

  // Call process exit explicitly to terminate the child process,
  // otherwise the child process will run forever, according to the Node.js docs
  process.exit();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

### 2.4 fetchInfo

```js
class UpdateNotifier {
  constructor(options = {}) {}

  check() {}

  // 获取包的相关信息
  async fetchInfo() {
    const { distTag } = this.options;
    // 由于是懒加载的 所以需要先latestVersion() 执行下
    const latest = await latestVersion()(this.packageName, { version: distTag });

    return {
      latest,
      current: this.packageVersion,
      type: semverDiff()(this.packageVersion, latest) || distTag,
      name: this.packageName,
    };
  }

  notify(options) {}
}
```

### 2.5 notify

```js
class UpdateNotifier {
  constructor(options = {}) {}

  check() {}

  async fetchInfo() {}

  // 通知
  notify(options) {
    // 满足以下情况时不需要通知
    // 1. !process.stdout.isTTY 表示 不在node不是在终端上运行的  # 确定 Node.js 是否在终端上下文中运行的首选方法是检查 process.stdout.isTTY 属性的值是否为 true。
    // 2. suppressForNpm 表示 是否支持 npm-scripts 调用
    // 3. !this.update 表示 本地是否检查过更新
    // 4. !semver().gt(this.update.latest, this.update.current) 表示 当前版本是否未落后于最新版本
    const suppressForNpm = !this.shouldNotifyInNpmScript && isNpm().isNpmOrYarn;
    if (
      !process.stdout.isTTY ||
      suppressForNpm ||
      !this.update ||
      !semver().gt(this.update.latest, this.update.current)
    ) {
      return this;
    }

    options = {
      // update-notifier 是否是通过 npm 全局安装的
      isGlobal: isInstalledGlobally(),
      // update-notifier 是否是通过 yarn 全局安装的
      // 有个缺陷: 前提是用户没有改变yarn默认的全局安装目录
      isYarnGlobal: isYarnGlobal()(),
      ...options,
    };

    let installCommand;
    if (options.isYarnGlobal) {
      installCommand = `yarn global add ${this.packageName}`;
    } else if (options.isGlobal) {
      installCommand = `npm i -g ${this.packageName}`;
    } else if (hasYarn()()) {
      // hasYarn() 由于 hasYarn 是懒加载的模块，所以需要先执行一下
      // 哪里都是在推荐 yarn 安装包...
      // npm 太难了
      installCommand = `yarn add ${this.packageName}`;
    } else {
      installCommand = `npm i ${this.packageName}`;
    }

    const defaultTemplate =
      'Update available ' +
      chalk().dim('{currentVersion}') +
      chalk().reset(' → ') +
      chalk().green('{latestVersion}') +
      ' \nRun ' +
      chalk().cyan('{updateCommand}') +
      ' to update';

    // 可以指定通知的信息
    const template = options.message || defaultTemplate;

    // 可以指定 box 的样式
    options.boxenOptions = options.boxenOptions || {
      padding: 1,
      margin: 1,
      align: 'center',
      borderColor: 'yellow',
      borderStyle: 'round',
    };

    const message = boxen()(
      pupa()(template, {
        // 将以下信息补全到模板中
        // this.update 是在 check 阶段填充的
        packageName: this.packageName,
        currentVersion: this.update.current,
        latestVersion: this.update.latest,
        updateCommand: installCommand,
      }),
      options.boxenOptions,
    );

    if (options.defer === false) {
      // 不需要延迟显示
      console.error(message);
    } else {
      process.on('exit', () => {
        // 进程退出时显示提示信息
        console.error(message);
      });

      process.on('SIGINT', () => {
        // 进程意外退出时做处理
        console.error('');
        // 我不知道这边 调用 process.exit 的意思何在？
        // 为了更快的退出?
        // 关于这里有趣的问题 https://github.com/yeoman/update-notifier/pull/98
        process.exit();
      });
    }

    // return this的目的: 为了链式调用
    return this;
  }
}
```

## 3. 整体流程

1. updateNotifier({...})
   1.1 const updateNotifier = new UpdateNotifier({...})
   1.2 updateNotifier.check()
   1.2.1 判断是否执行 check.js
   1.2.1.1 updateNotifier.fetchInfo()
   1.2.1.2 set('lastUpdateCheck')
   1.2.1.3 set('update')
   1.3 notify()
