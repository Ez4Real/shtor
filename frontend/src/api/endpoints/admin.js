import {imageServer, server} from "../axios";

const auth = {
	login: (data) => server.post("auth/login", data),
	checkAuth: (data) => server.get("admin", data),
}

const products = {
	add: (data) => server.post("admin/product/", data),
	edit: (data) => server.put(`admin/product/${data._id}`, data),
}
const image = {
	add: (data) => imageServer.post("/", data),
}

const endpoints = {
	// registration: (data) => server.post("/register", data),
	auth,
	image,
	products,
};

export default endpoints;
