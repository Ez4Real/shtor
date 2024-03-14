import { server } from "../axios";

const subscribe = {
	activation: (data) => server.post("/subscribe", data),
}

const endpoints = {
	subscribe
};

export default endpoints;
