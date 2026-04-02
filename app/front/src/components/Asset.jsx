import * as images from "images";

export function Image({ name, ...htmlProps }) {
	return <img alt={`image ${name}`} src={images[name]} {...htmlProps} />;
}
