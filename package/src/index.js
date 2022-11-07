const satori = require("satori").default;
const fs = require("fs/promises");

const defaultFont = async () => {
	const fontBuffer = await fs.readFile(
		require.resolve("./../assets/Inter-Regular.ttf")
	);

	return {
		name: "Inter",
		data: fontBuffer,
		weight: 400,
		style: "normal",
	};
};

exports.default = async function (a, options) {
	const _options = structuredClone(options);

	if (_options.fonts == undefined || _options.fonts.length === 0) {
		_options.fonts = [await defaultFont()];
	}

	const svgContent = await satori(a, _options);
	return svgContent;
};
