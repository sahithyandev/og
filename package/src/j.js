// TODO write a short jsdoc comment about it
function j(tag, props, ...children) {
	const output = {
		type: tag,
	};

	let _props = {};

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

exports.default = j;
