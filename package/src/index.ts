import { readFile } from "fs/promises";
import { satori, SatoriOptions, FontOptions } from "@sahithyan/satori";
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

/**
 * SatoriOptions with a few changes.
 * 
 * Differences from SatoriOptions:
 *  - `fonts` is not required 
 */
declare type CustomSatoriOptions = ({
	width: number;
	height: number;
} | {
	width: number;
} | {
	height: number;
}) & {
	fonts?: FontOptions[];
	embedFont?: boolean;
	debug?: boolean;
	graphemeImages?: Record<string, string>;
	loadAdditionalAsset?: (languageCode: string, segment: string) => Promise<FontOptions | string | undefined>;
};

export default async function og(element: ReactNode, options: CustomSatoriOptions) {
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
