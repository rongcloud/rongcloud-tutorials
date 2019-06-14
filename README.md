## RongCloud tutorials

#### 安装依赖

- [Docker](https://www.docker.com/get-started)

- [Node.js 10+](http://nodejs.cn/download/)

#### 快速启动

`注:` 第一次运行此命令等待时间很长, 请耐心等待

```js
./run
```

#### 编写文档

`注:` 仅需修改 tutorials 文件夹, 其他文件可不关注

例如: 编写 Android IM 开发指南

`修改 tutorials/android/im/index.md 文件, 文件顶部信息如下:`

```js
---
id: im-sdk-guide-android  // 文档 id
summary: introduction  // 文档简介
categories: Guide  // 分类
tags: tutorial, guidelines, guide, write, contribute  // 标签
difficulty: 3  // 难度, 范围: 1 - 5
status: published  // 状态, 此处填写 published 即可
published: 2019-06-04  // 发布时间, 首页文档列表按此时间排列
author: RongCloud Android Team  // 作者

---
```

#### 命令

- `./run exec yarn run build-site`: 编译站点
- `./run exec yarn run serve tutorials`: 启动预览
- `./run help`: 帮助信息
