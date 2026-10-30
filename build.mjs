// 把 Pele 的浏览器版和插件源码拼成 Obsidian 需要的单文件 main.js
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pele = readFileSync(require.resolve("pele/global"), "utf8");
// MIT 要求随代码附上完整许可声明
const peleLicense = readFileSync(require.resolve("pele/package.json").replace(/package\.json$/, "LICENSE"), "utf8");
const plugin = readFileSync("src/main.js", "utf8");
writeFileSync("main.js", `/*! 内含 Pele（https://github.com/obsidianmd/pele），许可如下：\n\n${peleLicense.trim()}\n*/\n` + pele + "\n" + plugin);
console.log("main.js 已生成");
