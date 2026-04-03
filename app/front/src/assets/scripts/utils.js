export function makeClassName(...args) {
	const arrClasses = [];

	for (const arg of args) {
		if (arg.constructor.name === "String") {
			arrClasses.push(arg);
			continue;
		}

		if (arg.constructor.name === "Array" && arg.length === 2) {
			const [className, condition] = arg;

			if (condition) {
				arrClasses.push(className);
			}

			continue;
		}

		throw new Error("Unsupported type.");
	}

	return arrClasses.join(" ");
}
