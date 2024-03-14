import {imageServer, server} from "../axios";

const endpoints = {
	get: () => server.get("/products"),
	updateById: ({_id, ...data}) => server.post(`admin/product/${_id}`, data),
	copyById: ({_id}) => server.post(`admin/product/${_id}/copy`),
	deleteById: ({_id}) => server.delete(`admin/product/${_id}`),
	updateOrder: (data) => server.put(`admin/product/updateOrder`, data),
	updateKeyValueById: ({_id, ...data}) => server.put(`admin/product/${_id}`, data),
	createProductImage: (data) => imageServer.post(`/admin/upload/image`, data),
	editProductImage: (data) => imageServer.post(`/admin/edit/image`, data),
	deleteProductImage: (data) => server.post(`/admin/delete/image`, data),
};

export default endpoints;
