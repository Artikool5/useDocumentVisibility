import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default [
  // browser-friendly UMD build
  {
    input: "src/main.ts",
    output: {
      name: "use-document-visibility",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [typescript()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/main.ts",
    plugins: [typescript()],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
