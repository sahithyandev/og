const nodeOgImages = require("node-og-images").default;
const fs = require("fs/promises");

// intended content for testing
const x = `<div><div>
			<img src="https://sahithyandev.github.io/apple-touch-icon.png" width="180" height="180" />
			<h1>Hello JavaScript!</h1>

			<div>
				<div> 27 February 2021 </div>

				<div>
					<div>javascript</div>
					<div>webdev</div>
				</div>
			</div>
		</div></div>
`;

nodeOgImages(
	{
		type: "div",
		props: {
			style: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "Inter",
				fontSize: 22,
				height: "100%",
			},
			children: {
				type: "div",
				props: {
					style: {
						backgroundColor: "#efefef",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					},
					children: [
						{
							type: "img",
							props: {
								src: "https://sahithyandev.github.io/apple-touch-icon.png",
								width: "14%",
							},
						},
						{
							type: "h1",
							props: {
								style: {
									maxWidth: 500,
									fontSize: 64,
									fontWeight: 600,
								},
								children: "Hello JavaScript!",
							},
						},
						{
							type: "div",
							props: {
								style: {
									display: "flex",
									justifyContent: "space-around",
									width: "100%",
									fontWeight: 500,
									fontSize: 24,
								},
								children: [
									{
										type: "div",
										props: {
											children: "27 February 2021",
										},
									},
									{
										type: "div",
										props: {
											style: {
												display: "flex",
											},
											children: [
												{
													type: "div",
													props: {
														style: { marginRight: 8 },
														children: "javascript",
													},
												},
												{ type: "div", props: { children: "webdev" } },
											],
										},
									},
								],
							},
						},
					],
				},
			},
		},
	},
	{
		width: 1200,
		height: 630,
	}
).then((svgContent) => {
	fs.writeFile("./test.svg", svgContent);
});
