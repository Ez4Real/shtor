const customSortOrder = [
	'Без підвісу',
	'Срібний ланцюг',
	'Срібна орбіта',
];

export default (product) => {
	if (!product || !product.variations) {
		return product;
	}

	const sortedVariationsProduct = {...product};
	if (product?.variations?.[0]?.attachment) {
		sortedVariationsProduct.variations = sortedVariationsProduct.variations.sort((a, b) => {
			const indexA = customSortOrder.indexOf(a.attachment);
			const indexB = customSortOrder.indexOf(b.attachment);

			return indexA - indexB;
		})
	}
	return sortedVariationsProduct
}
