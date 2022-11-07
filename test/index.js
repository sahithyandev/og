const nodeOgImages = require("node-og-images").default;
const fs = require("fs/promises");

// intended content for testing
const x = `<div>
			<img src="https://sahithyandev.github.io/apple-touch-icon.png" width="180" height="180" />
			<h1>Hello JavaScript!</h1>

			<div>
				<div> 27 February 2021 </div>

				<div>
					<div>javascript</div>
					<div>webdev</div>
				</div>
			</div>
		</div>
`;

nodeOgImages(
	{
		type: "div",
		props: {
			style: { display: "flex" },
			children: [
				{
					type: "img",
					props: {
						src: "https://sahithyandev.github.io/apple-touch-icon.png",
						width: "180",
						height: "180",
					},
				},
				{ type: "h1", props: { children: "Hello JavaScript!" } },
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
									children: "27 February 2021",
								},
							},
							{
								type: "div",
								props: {
									children: [
										{ type: "div", props: { children: "javascript" } },
										{ type: "div", props: { children: "webdev" } },
									],
									style: { display: "flex" },
								},
							},
						],
					},
				},
			],
		},
	},
	{
		width: 1200,
		height: 630,
	}
).then((svgContent) => {
	fs.writeFile("./test.svg", svgContent);
});
