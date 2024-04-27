# @sahithyan/og

@sahithyan/og is a small library for generating static social card images (also
called Open Graph images) locally with the Node runtime.

## Reason behind it

Vercel recently announced `@vercel/og`, which is a library for doing the same
thing but on the Edge, instead. You can learn more about it
[here](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images).

While it's great to have dynamic social card images, not everyone will want them
all the time; at least I won't. Sometimes we just want to run it on our machines
locally. That's why it's built.

## Overview

@sahithyan/og is built on top of [Satori](https://github.com/vercel/satori) and
[Resvg](https://github.com/RazrFalcon/resvg#svg-support). These are the exact
same technologies @vercel/og uses.

```jsx
/** @jsx j */
import og, { j } from "@sahithyan/og";
import { writeFile } from "fs";

og(
	<div>
		<h1>Hi</h1>
		<div>This is amazing!</div>
	</div>,
	{
		width: 600,
		height: 400,
	}
).then((pngData) => {
	// save as a png
	writeFile("./test.png", pngData);
});
```

Previously, @sahithyan/og was using a
[forked version of Satori](https://github.com/sahithyandev/satori) (which fell
behind updates). Now, it has been switched to using the upstream version of
satori, as the required changes have been merged with satori.

## Documentation

```javascript
import og, { j } from "@sahithyan/og";
```

These are the only exports: `og` (default export) and `j`.

### og()

The `og` function is a wrapper for Satori and Resvg. It passes the arguments to
Satori (with a few changes) to get the SVG, converts the SVG to PNG using Resvg,
and returns the PNG data as `Promise<Buffer>`.

You can then use the `fs.writeFile` to save the file.

The og() function's parameters are quite the same with Satori's. You can check
its documentation [here](https://github.com/vercel/satori#readme). You can see
the differences between them below.

```typescript
declare function og(
	element: ReactNode,
	/**
	 * CustomSatoriOptions is identical to SatoriOptions, except:
	 *
	 * - `fonts` is not required. Inter will be used when no fonts are provided.
	 */
	options: CustomSatoriOptions
): Promise<Buffer>;
```

And here is an example:

```jsx
og(
	// the input element
	<div style={{ color: "black" }}>Hello, World!</div>,
	// satori options
	{
		width: 600,
		height: 400,
	}
).then((pngData) => {
	fs.writeFile("./test.png", pngData);
});
```

Here, you don't need to proivde a default font. The library will use Inter font,
if none of them are provided.

### j()

The `j` function is a JSX Pragma function. I recommended using this pragma when
transpiling JSX to be run with @sahithyan/og (or with Satori, in general).

To use as `j` as the pragma, add this line at the top of the file. You can
declare it in your babel configuration as well, but this is recommended.

```jsx
/** @jsx j */
```

`j` is included as Satori didn't work with Preact's `h` when I tried. If it does
work for you, then it's totally fine to avoid using `j`.
