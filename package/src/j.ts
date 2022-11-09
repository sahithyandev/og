// TODO write a short jsdoc comment about it
export type JChildren = JElement | JElement[] | null | undefined;

export type JElementProps =
	| {
			children?: JChildren;
	  }
	| null
	| undefined;

export type JElement =
	| string
	| {
			type: string;
			props?: JElementProps;
			children?: JChildren;
	  };

export default function j(
	tag: string,
	props: any,
	...children: JElement[]
): JElement {
	const output: JElement = {
		type: tag,
	};

	let _props = {} as JElementProps;

	if (props != null && Object.keys(props).length != 0) {
		_props = { ...props };
	}

	if (children != undefined) {
		if (typeof children === "string") {
			_props.children = children;
		}
		if (Array.isArray(children)) {
			if (children.length === 1) {
				_props.children = children[0];
			} else if (children.length != 0) {
				_props.children = children;
			}
		}
	} else {
		_props.children = undefined;
	}

	if (Object.keys(_props).length !== 0) {
		output.props = structuredClone(_props);
	}

	return output;
}
