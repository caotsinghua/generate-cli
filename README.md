## 安装

`npm install -g @tssword/generate-admin`

## 使用

```
    🌈 generate 🌈
    Usage
      $ generate
      $ generate admin --project-name <projectName>
      $ generate crud --resource <resourceName>
      $ generate crud-vuex --resource <resourceName> --store-path <store-path>
      $ generate init --repo <githubUserName/repoName> --path <path>

    Options

      --project-name, -p 创建名为<project-name>的基础后台项目
      --resource,-r 创建资源resource-name的增删改查模板，默认路径为src/view/{resource}
      --repo github仓库地址，格式为 用户名/仓库名 默认caotsinghua/iview-admin-template
      --path 指定目录
      --help 帮助
      --version 查看版本

    Examples

      generate 打开图形界面操作
      generate admin --project-name demo 创建demo的后台项目
      generate admin --project-name ../demo 在上级目录创建后台项目
      generate crud --resource article --path ./src/view  创建资源article的增删改查模板 =>./src/view/articles，
      ps:资源不要复数,默认path为src/view,可以指定path插入模板
      generate crud-vuex --resource article --path ./src/view --store-path src/store/modules
      generate init --repo vuejs/vue --path ./demo 把vue仓库内容拷贝到demo中
```
