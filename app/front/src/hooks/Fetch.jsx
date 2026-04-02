export default async function (method, resource, body) {
	const url = `${import.meta.env.VITE_SERVER_URL}/api/${resource}`;
	const options = {
		method,
		headers: { "Content-Type": "application/json" },
		body: body === undefined ? null : JSON.stringify(body),
	};

	const response = await fetch(url, options);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	}

	return data;
}
