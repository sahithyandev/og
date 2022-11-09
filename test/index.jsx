const nodeOgImages = require("node-og-images").default;
const fs = require("fs/promises");

/** @jsx j */

function j(tag, _props, ...children) {
	const output = {
		type: tag,
	};

	let props = {};

	if (_props != null && Object.keys(_props).length != 0) {
		props = { ..._props };
	}

	if (children != undefined) {
		if (typeof children === "string") {
			props.children = children;
		}
		if (Array.isArray(children)) {
			if (children.length === 1) {
				props.children = children[0];
			} else if (children.length != 0) {
				props.children = children;
			}
		}
	} else {
		props.children = undefined;
	}

	if (Object.keys(props).length !== 0) {
		output.props = structuredClone(props);
	}

	return output;
}

const x = (
	<div>
		<div>
			<img
				src="https://sahithyandev.github.io/apple-touch-icon.png"
				width="180"
				height="180"
			/>
			<h1>Hello JavaScript!</h1>

			<div>
				<div> 27 February 2021 </div>

				<div>
					<div>javascript</div>
					<div>webdev</div>
				</div>
			</div>
		</div>
	</div>
);

nodeOgImages(x, {
	width: 1200,
	height: 630,
}).then((pngBuffer) => {
	fs.writeFile("./test.png", pngBuffer);
});
