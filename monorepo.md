## node 版本管理

- volta 管理 node 以及其他 js 工具包版本 [why-volta](https://docs.volta.sh/guide/#why-volta)

  使用 `volta install node@12` 疑问： `npm i lerna -g` 时与正常使用有区别，明明是全局安装了 `lerna` 但是在别的文件夹下没有 `lerna`

- nvm-windows 简单的 node 版本管理，不影响 npm 正常使用方式

  安装 [nvm-setup](https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.zip)

  ```bash
  nvm install 17 # 安装 node@17
  nvm use 17.x.x # 使用到目前安装的具体版本

  # 如果第一次安装的是 12 发现没有 npm 可能是因为安装过程中有失败的，改一下镜像地址
  nvm node_mirror https://npm.taobao.org/mirrors/node/
  nvm npm_mirror https://npm.taobao.org/mirrors/npm/
  ```

## lerna

```bash
npm i -g lerna

lerna init #创建一个新的lerna库或者是更新lerna版本

lerna add #添加一个包的版本为各个包的依赖

lerna create #新建包

lerna list #列举当前lerna 库包含的包

lerna changed #显示自上次relase tag以来有修改的包， 选项通 list

lerna diff #显示自上次relase tag以来有修改的包的差异， 执行 git diff

lerna clean #删除各个包下的node_modules

```

lerna.json

```json
{
  "version": "independent", // 版本自增
  "npmClient": "yarn",
  "useWorkspaces": true, // 使用 package.json 里的 workspaces 配置，不用 lerna 里的 packages
  "ignoreChanges": ["**/__tests__/**", "**/*.md"],
  "command": {
    "publish": {
      "conventionalCommits": true,
      "allowBranch": ["master", "next"],
      "message": "chore(release): Publish"
    }
  }
}
```

在根目录里安装依赖时加参数 `W` 例如 `yarn add rimraf -DW`

> 这里不用 lerna 的 run，只用 publish 原因：执行 monorepo 任务有更快的工具 turborepo

## [turborepo](https://turborepo.org/docs/getting-started)

优势：任务调度、并行执行任务。不足：publish 功能

```bash
# 初始化模板
npx create-turbo@latest

```

## [dumi](https://d.umijs.org/zh-CN/guide)

```bash
# --site 头上有导航的文档
npx @umijs/create-dumi-lib --site
```

## next.js

Changesets: 流行的 monorepo 场景发包工具 https://zhuanlan.zhihu.com/p/427588430
