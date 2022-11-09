import { readFile } from "fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export { default as j } from "./j";

const defaultFonts = async () => {
	const loadFont = (fontFileName) =>
		readFile(require.resolve(`./../assets/${fontFileName}.ttf`));

	return [
		{
			name: "Inter",
			weight: 400,
			style: "normal",
			data: await loadFont("Inter-Regular"),
		},
		{
			name: "Inter",
			weight: 500,
			style: "medium",
			data: await loadFont("Inter-Medium"),
		},
		{
			name: "Inter",
			weight: 600,
			style: "semibold",
			data: await loadFont("Inter-SemiBold"),
		},
	];
};

export default async function nodeOgImages(a, options) {
	const _options = structuredClone(options);

	if (_options.fonts == undefined || _options.fonts.length === 0) {
		_options.fonts = await defaultFonts();
	}

	const svgContent = await satori(a, _options);
	const resvg = new Resvg(svgContent);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
}
