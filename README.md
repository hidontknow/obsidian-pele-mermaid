# Pele Mermaid（试验）

一个 Obsidian 插件：用 [Pele](https://github.com/obsidianmd/pele) 代替内置的 mermaid.js 渲染 Mermaid 图，阅读模式和实时预览都生效。

Pele 的颜色和字体由 `--pele-*` CSS 变量控制。配套主题 [Hidontknow](https://github.com/hidontknow/obsidian-theme-hidontknow) 已经把这些变量接到主题配色上，亮色 / 暗色都适配；用其他主题时是 Pele 的默认配色。

## 安装

1. `npm install`，然后 `npm run build`，生成 `main.js`。
2. 在库的 `.obsidian/plugins/` 下新建文件夹 `pele-mermaid`，把 `main.js` 和 `manifest.json` 复制进去。
3. 在 **设置 → 第三方插件** 中启用 **Pele Mermaid**。

## 工作方式

- **阅读模式**：注册 `mermaid` 代码块处理器，交给 Pele 渲染。
- **实时预览**：实时预览不走代码块处理器，而是调用 `window.mermaid.render`，插件把它替换为 Pele。停用插件时还原。
- 语法错误时显示错误信息。

## 已知限制

- 实时预览依赖 Obsidian 内部调用 `window.mermaid.render` 的方式，Obsidian 更新后可能失效。
- 实时预览渲染前 Obsidian 仍用 mermaid.js 检查语法，Pele 支持而 mermaid.js 不支持的写法会报错。
- Pele 的排版和 mermaid.js 不同，已有的图节点位置、连线会变化。
- 暗色模式下 Obsidian 会给实时预览里的 mermaid 图加反色滤镜。Hidontknow 主题已对 Pele 的图关掉这个滤镜；用其他主题时，暗色下阅读模式是浅色图、实时预览是反色后的图，两者不一致。
- 只测试过流程图和时序图，且只在桌面端测试过。

## 致谢

- [Pele](https://github.com/obsidianmd/pele)，MIT，© kepano（构建时打包进 `main.js`，保留其许可声明）
