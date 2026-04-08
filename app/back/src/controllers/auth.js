import { errorHandler } from "#controllers";

const authController = {
	login: async (req, res) => {
		if (!req.body) {
			errorHandler.throw(400, "Missing request body");
		}
		if (!req.body.name) {
			errorHandler.throw(400, "Missing mandatory field: name");
		}
		if (!req.body.password) {
			errorHandler.throw(400, "Missing mandatory field: password");
		}
		const { name, password } = req.body;
		const response = await fetch("https://zdep.fr/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, password }),
		});
		const data = await response.json();
		if (!response.ok) {
			errorHandler.throw(response.status, data.error);
		}
		res.status(200).json({
			message: "Connection successful",
			token: data.token,
		});
	},
};

export default authController;
