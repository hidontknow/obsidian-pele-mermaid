// 构建时 build.mjs 会把 Pele 的浏览器版（定义全局 pele）拼接在本文件之前
/* global pele */

const { Plugin } = require("obsidian");

// Pele 按真实字体测量文字宽度，传入 Obsidian 当前的正文字体
const textFont = () => getComputedStyle(document.body).getPropertyValue("--font-text").trim() || "sans-serif";

module.exports = class PeleMermaid extends Plugin {
	onload() {
		// 阅读模式：接管 mermaid 代码块
		this.registerMarkdownCodeBlockProcessor("mermaid", (source, el) => {
			el.addClass("pele-mermaid");
			// 语法错误等：显示错误信息，不让整块消失
			const showError = (e) => {
				el.empty();
				el.createEl("pre", { cls: "pele-mermaid-error", text: "Mermaid 语法错误：" + String((e && e.message) || e) });
			};
			try {
				pele.mount(el, source, { fontFamily: textFont(), zoom: false, onError: showError });
			} catch (e) {
				showError(e);
			}
		});

		// 实时预览不走代码块处理器，而是直接调用 mermaid.render，这里把它换成 Pele
		// shortcut: 依赖 Obsidian 内部调用 window.mermaid.render(id, text)，Obsidian 改实现后会失效
		this.patchMermaid();
		this.registerEvent(this.app.workspace.on("layout-change", () => this.patchMermaid()));
	}

	patchMermaid() {
		const m = window.mermaid;
		if (!m || m.render.__pele) return;
		const original = m.render;
		const render = async (id, text) => {
			const r = pele.render(text, { fontFamily: textFont(), idPrefix: id });
			return { svg: r.svg, diagramType: r.mermaidType, bindFunctions() {} };
		};
		render.__pele = true;
		m.render = render;
		this.register(() => {
			if (m.render === render) m.render = original;
		});
	}
};
