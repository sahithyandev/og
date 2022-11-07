const nodeOgImages = require("node-og-images").default;
const fs = require("fs/promises");

// intended content for testing
const x = `<div>
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

nodeOgImages("Hi", {
	width: 1200,
	height: 630,
}).then((svgContent) => {
	fs.writeFile("./test.svg", svgContent);
});
