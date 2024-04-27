import { readFile } from "fs/promises";
import satori from "satori";
import type { SatoriNode, Font, SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { ReactNode } from "react";

export { default as j } from "./j";

const defaultFonts = async (): Promise<Font[]> => {
	const loadFont = (fontFileName) =>
		readFile(require.resolve(`./../assets/${fontFileName}.ttf`));

	return Promise.all(
		[300, 400, 500, 600, 700].map(
			async (weight) =>
				({
					name: "Inter",
					weight,
					data: await loadFont(`Inter-${weight}`),
				} as Font)
		)
	);
};

/**
 * SatoriOptions with a few changes.
 *
 * Differences from SatoriOptions:
 *  - `fonts` is not required
 */
declare type CustomSatoriOptions = (
	| {
			width: number;
			height: number;
	  }
	| {
			width: number;
	  }
	| {
			height: number;
	  }
) & {
	fonts?: Font[];
	embedFont?: boolean;
	debug?: boolean;
	graphemeImages?: Record<string, string>;
	loadAdditionalAsset?: (
		languageCode: string,
		segment: string
	) => Promise<string | Array<Font>>;
	tailwindConfig?: SatoriOptions["tailwindConfig"];
	onNodeDetected?: (node: SatoriNode) => void;
};

function isSatoriOptions(
	options: CustomSatoriOptions
): options is SatoriOptions {
	if (!options.fonts || options.fonts.length === 0) {
		console.error("@sahithyan/og: options.fonts is required");
		return false;
	}
	return true;
}

export default async function og(
	element: ReactNode,
	options: CustomSatoriOptions
) {
	const _options = structuredClone(options);

	if (_options.fonts == undefined || _options.fonts.length === 0) {
		_options.fonts = await defaultFonts();
	}
	if (!isSatoriOptions(_options)) {
		process.exit(1);
	}

	const svgContent = await satori(element, _options);
	const resvg = new Resvg(svgContent);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
}
