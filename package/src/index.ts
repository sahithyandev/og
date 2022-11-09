import { readFile } from "fs/promises";
import satori, { SatoriOptions, FontOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { ReactNode } from "react";

export { default as j } from "./j";

const defaultFonts = async (): Promise<FontOptions[]> => {
	const loadFont = (fontFileName) =>
		readFile(require.resolve(`./../assets/${fontFileName}.ttf`));

	return [
		{
			name: "Inter",
			weight: 400,
			data: await loadFont("Inter-Regular"),
		},
		{
			name: "Inter",
			weight: 500,
			data: await loadFont("Inter-Medium"),
		},
		{
			name: "Inter",
			weight: 600,
			data: await loadFont("Inter-SemiBold"),
		},
	];
};

export default async function og(element: ReactNode, options: SatoriOptions) {
	const _options: SatoriOptions = structuredClone(options);

	if (_options.fonts == undefined || _options.fonts.length === 0) {
		_options.fonts = await defaultFonts();
	}

	const svgContent = await satori(element, _options);
	const resvg = new Resvg(svgContent);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
}
