import session from "express-session";

export default session({
	secret: process.env.EXPRESS_SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
});
