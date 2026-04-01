import * as assets from "assets";

export function Image({ name, ...htmlProps }) {
	return <img alt={`image ${name}`} src={assets[name]} {...htmlProps} />;
}
