import {server} from "../axios";

const endpoints = {
	create: (data) => server.post("/orders/create", data),
	get: () => server.get("/orders/", ),
	sendTrackingNumber: (data) => server.post("/orders/send-tracking-id", data),
};

export default endpoints;
