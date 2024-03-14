import capitalizeFirstLetter from "./capitalizeFirstLetter";

export const getProductName = (product, lang) => capitalizeFirstLetter(product?.name?.[lang]
	|| product?.variations?.[0]?.name?.[lang])

export const getProductDescription = (product, lang) => capitalizeFirstLetter((product?.description?.[lang]
	|| product?.variations?.[0]?.description?.[lang]))?.split('\n')

export const getProductPrice = (product, lang) => product?.price?.[lang] || product?.variations?.[0]?.price?.[lang]

export const getProductImageName = (product) =>
	product?.variations?.[0]?.images?.[0] || product?.seashells?.[0]?.[0] || product?.images?.[0]

export const getProductImageNameHover = (product) => product?.variations?.[0]?.images?.[1] || product?.variations?.[1]?.images?.[0]
	|| product?.seashells?.[0]?.[1] || product?.seashells?.[1]?.[0]|| product?.images?.[1] || product?.variations?.[0]?.images?.[0]
	|| product?.images?.[0]
