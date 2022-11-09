// TODO write a short jsdoc comment about it
// TODO fix type issues

type $FIX_ME = any;

export default function j(tag: $FIX_ME, props: $FIX_ME, ...children: $FIX_ME[]) {
	const output: $FIX_ME = {
		type: tag,
	};

	let _props = {} as $FIX_ME;

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
