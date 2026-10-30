// 把 Pele 的浏览器版和插件源码拼成 Obsidian 需要的单文件 main.js
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pele = readFileSync(require.resolve("pele/global"), "utf8");
const plugin = readFileSync("src/main.js", "utf8");
writeFileSync("main.js", pele + "\n" + plugin);
console.log("main.js 已生成");
