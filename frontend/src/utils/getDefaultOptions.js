export default (foundProduct, receivedVariationsIndex) => {
	const { size, color, material, feature, seashells, variations } = foundProduct || {};
	const defaultVariation = variations?.[receivedVariationsIndex] || variations?.[0] || {};

	return {
		size: size?.[0] || defaultVariation.size?.[0],
		color: color?.[0] || defaultVariation.color,
		material: material || defaultVariation.material,
		attachment: defaultVariation.attachment,
		feature: feature || defaultVariation.feature,
		image: defaultVariation.images?.[receivedVariationsIndex || 0],
		seashell: seashells?.flatMap(array => array)?.[receivedVariationsIndex || 0],
	};
};
