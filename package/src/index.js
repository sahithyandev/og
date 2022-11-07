const fs = require("fs/promises");
const satori = require("satori").default;
const { Resvg } = require("@resvg/resvg-js");

const defaultFonts = async () => {
	const loadFont = (fontFileName) =>
		fs.readFile(require.resolve(`./../assets/${fontFileName}.ttf`));

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

exports.default = async function (a, options) {
	const _options = structuredClone(options);

	if (_options.fonts == undefined || _options.fonts.length === 0) {
		_options.fonts = await defaultFonts();
	}

	const svgContent = await satori(a, _options);
	const resvg = new Resvg(svgContent);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return pngBuffer;
};
