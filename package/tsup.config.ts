import { copy } from "fs-extra";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm", "cjs"],
	splitting: false,
	sourcemap: false,
	clean: false,
	dts: true,
	noExternal: ["satori"],
});
