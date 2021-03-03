## 技术栈
> finance-web是基于React的前端项目，技术栈如下（其他的如eslint、sass等主要用的默认配置，所以没写上）

- 飞冰
- react
- redux
- antd
- bizcharts
- axios


## 安装依赖
```shell script
npm install
```


## 语法检查
```shell script
npm run eslint  # 检查语法问题
npm run eslint:fix  # 自动修复语法问题
```


## 启动服务
```shell script
# mode指定为dev，则后端api使用 localhost:3000 的开发环境，
# mode指定为prod，则后端api使用 finance.lijiaheng.cn 的线上环境
npm run start -- --mode prod
```


## 打包项目
```shell script
npm run build
```
