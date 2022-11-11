import { join } from "path";
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
	esbuildPlugins: [
		{
			name: "copy-satori",
			setup(build) {
				build.onStart(async () => {
					// copy every file under satori/dist/
					await copy(join(__dirname, "../deps/satori/"), "./lib/satori/", {
						overwrite: true,
						filter: (src) => {
							return (
								src.includes("satori/dist") ||
								src.includes("satori/package.json")
							);
						},
					});
				});
				build.onResolve({ filter: /^satori$/ }, async () => {
					// update the imports
					return {
						path: join("../lib/satori/"),
						external: true,
					};
				});
			},
		},
	],
});
