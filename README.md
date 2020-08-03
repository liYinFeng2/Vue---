# Vue-codes1

## 开发环境及版本
node >= V8.0.0


## 项目创建步骤
1. npm init
2. touch rollup.config.js
3. 安装依赖：cnpm i -D @babel/core @babel/preset-env cross-env rollup rollup-plugin-babel rollup-plugin-serve


## Vue2.0 版本数据变化侦测实现
1. 原理：对象通过 Object.defineproperty() 实现，数组通过拦截器方式实现
2. 实现功能：对象和数组数据监听、数据挂载到实例对象上
3. 缺点/弊端：
  对象上新增属性或者删除属性，不能监测
  数组直接通过索引更改属性或者直接更改数组的长度，不能监测
4. 解决以上的办法：$set、$delete方法