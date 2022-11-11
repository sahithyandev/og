import { copy } from "fs-extra";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm", "cjs"],
	splitting: false,
	sourcemap: false,
	clean: true,
	dts: true,
	noExternal: ["satori"],
	esbuildPlugins: [
		{
			name: "copy-readme",
			setup(build) {
				build.onStart(() => {
					return copy("../README.md", "./README.md", { overwrite: true });
				});
			},
		},
	],
});
