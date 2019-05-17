## SDK 介绍

  阿里云的日志服务没有成熟的 NodeJS SDK，社区中的一些 SDK 也缺少 API 与文档，这个项目是为了便利 NodeJS 用户而实现的非官方 SDK。
  
  在实现的接口上参考了 [阿里云日志 API](https://help.aliyun.com/document_detail/29007.html)，并且尽可能的保留了原来的设计方式，
  对于用户屏蔽了部分参数与设定，少许接口的参数命名有一些微调 (出于接口的一致性与优雅考虑)，这里在每一篇文档内都会附上相应的阿里云 API 文档，
  便于大家调试和参考。
  
  **[快速开始](./guide.md)**
  
### 特点

  - 使用 `TypeScript` 构建，包含 `.d.ts`，有更多的方法、参数提示。
  
  - 方法接口设计简单易用、命名规范
  
  - 良好的错误提示与文档
  
  - 屏蔽鉴权细节
  
  - 默认支持 `Promise` / `await`
  
  - 缓存 DNS，请求速度更快
  
### 关于

#### 贡献

  你可以 Fork [github 项目](https://github.com/WittBulter/aliyun-logs) 并在你自己的远程源上工作，最后以 Pull Request 合并至主仓库。
  如果你想要创建一个 Fix 相关的 PR，请先创建一个相关 Issue 说明具体的问题。
 
#### 帮助与反馈

  如果有问题可以提交至项目的 [Issues](https://github.com/WittBulter/aliyun-logs)，但 **API 相关的疑问请不要提交到这里**。
   
#### LICENSE

  [MIT License](https://github.com/WittBulter/aliyun-logs/blob/master/LICENSE)




