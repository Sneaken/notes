所以说 如果不带参数 只是下载包 但是并不把信息写入`package.json`文件

`npm install` 在安装 `npm` 包时，有两种命令参数可以把它们的信息写入 `package.json` 文件 ；区别是它们会把依赖包添加到 `package.json` 文件的不同位置。

```
--save || -S  // 运行用来（发布）
```

添加到 `package.json` 文件 `dependencies` 键下，发布后还需要依赖的模块，譬如像 `jQuery` 库或者 `Vue` 框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。

```
--save-dev || -D  // 开发用来（辅助）
```

添加到 `package.json` 文件 `devDependencies` 键下，开发时的依赖比如安装 `js` 的压缩包 `gulp-uglify` 因为我们在发布后用不到它，而只是在我们开发才用到它。



```
npm
修改 npm 全局缓存目录
npm config set cache "D:\Program Files\npm-cache"
修改 npm 全局安装目录（需要加入系统变量）
npm config set prefix "D:\Program Files\npm_global"
```



```
yarn
修改 yarn 全局安装位置
yarn config  set global-folder "D:\Software\yarn\global"
修改 yarn 缓存位置
yarn config set cache-folder "D:\Software\yarn\cache"
修改 yarn 可执行文件的链接位置
yarn config set prefix <filepath> 不要带bin
```

