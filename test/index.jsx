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
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontFamily: "Inter",
			fontSize: 22,
			height: "100%",
		}}
	>
		<div
			style={{
				backgroundColor: "#efefef",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<img
				src="https://sahithyandev.github.io/apple-touch-icon.png"
				width="180"
				height="180"
			/>
			<h1
				style={{
					maxWidth: 540,
					fontSize: 64,
					fontWeight: 600,
				}}
			>
				Hello JavaScript!
			</h1>

			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					width: "100%",
					fontWeight: 500,
					fontSize: 24,
				}}
			>
				<div>27 February 2021</div>

				<div
					style={{
						display: "flex",
					}}
				>
					<div style={{ marginRight: 8 }}>javascript</div>
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
