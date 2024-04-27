const { default: og, j } = require("@sahithyan/og");
const fs = require("fs/promises");

/** @jsx j */

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
				src="https://sahithyan.dev/apple-touch-icon.png"
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

og(x, {
	width: 1200,
	height: 630,
}).then((pngBuffer) => {
	fs.writeFile("./test.png", pngBuffer);
});
