import { io } from "socket.io-client";

export const socket = io(
	process.env.NODE_ENV === "production" ? "http://localhost:3004" : "http://localhost:3004",
);
