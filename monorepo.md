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

lerna version # 更新 package.json 版本和打 git Tag

# 不会发布 package.json 中 private 设置为 true 的包
lerna publish from-git # 把打了 tag 的包发布一次（from-package 把本地没有发布的包发布一次）

# lerna version + lerna publish from-git
lerna publish
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

> 只使用 lerna 的 publish 功能，原因：执行 monorepo 任务有更快的工具 `turborepo`

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

## husky@7.0.1

> githooks 是在 git 执行特定事件（如commit、push、receive等）时触发运行的脚本，保存在 .git/hooks 文件夹中

husky 是一个用于配置 githooks 的工具 `yarn add husky -D`

### 使用 husky

package.json 增加 `"prepare": "husky install",` 其中 `prepare` 是在安装依赖后自动执行的

创建 hooks

```bash
# pre-commit 在 commit 前验证代码格式
yarn husky add .husky/pre-commit "npx lint-staged"

# commit-msg 在 commit 时验证 commit 消息和用户 --edit 读取提交记录的文件
yarn husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

### 使用 `yarn add lint-staged -D` 执行 lint 任务

```json
// prettier eslint stylelint 和 .prettierrc.js .eslintrc.js .stylelintrc.js
"lint-staged": {
    "src/**/*.{.ts,.tsx,.js}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "src/**/*.{scss,css}": [
      "stylelint --fix"
    ]
}
```

### 使用 `yarn add @commitlint/cli @commitlint/config-conventional -D` 校验 commit msg

创建 `.commitlintrc.js` 文件

```js
/**
 * build : 改变了build工具
 * ci : 持续集成
 * chore : 构建过程或辅助工具的变动
 * docs : 仅文档新增/改动
 * feat : 新功能
 * fix : 修复bug
 * perf : 性能优化
 * refactor : 某个已有功能重构
 * revert : 撤销上一次的 commit
 * style : 代码格式改变
 * test : 增加测试
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
  },
};
```

### 使用 commitizen `yarn add commitizen cz-customizable -D` 询问式 commit 消息

package.json

```json
"scripts": {
  "commit": "git-cz",
}

"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

添加 `.cz-config.js` 自定义提示语

### 使用 `yarn add conventional-changelog-cli -D` 生成 CHANGELOG

```json
"scripts": {
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
},
```
