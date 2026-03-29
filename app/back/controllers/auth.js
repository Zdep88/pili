import errorHandler from "../errorHandler.js";

const authController = {
    login: async (req, res) => {
        if (!req.body || !req.body.name || !req.body.password) {
            errorHandler.throw(400, 'Bad Request');
        }
        const { name, password } = req.body;
        const response = await fetch("https://zdep.fr/api/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });
        const data = await response.json();
        if (!response.ok) {
            errorHandler.throw(response.status, data.error);
        }
        res.status(200).json({
            "message": "Connection successful",
            token: data.token
        });
    },
}

export default authController;