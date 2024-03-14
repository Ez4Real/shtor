export const PRODUCT_EN_NAMES_TO_SET_VARIATION_BY_SLIDING = [
	'seashell set'
]

export const isProductToSetVariationBySliding = (product) =>
	PRODUCT_EN_NAMES_TO_SET_VARIATION_BY_SLIDING.includes(product?.name?.en.toLowerCase())
