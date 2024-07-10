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
      globals: {
        react: "react",
      },
    },
    plugins: [typescript()],
    external: ["react"],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/main.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript()],
    external: ["react"],
  },
];
