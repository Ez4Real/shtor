import {attachmentOptions, groupOptions, inputsData, validationRules} from "./constants";

export const pushKeyOrderedToInputs = (key, prevInputs) => {
	let elementToPush = key;
	let indexToInsert = inputsData.findIndex(e => e === key);

	let newInputs = [...prevInputs]
	newInputs.splice(indexToInsert, 0, elementToPush);
	return newInputs
}

export const isSingleTextKeys = (key) => key ===  'feature' || key ===  'material' || key === 'attachment' || key === 'group';
export const isDoubleInputKeys = (key) => key === 'name' || key === 'price' || key === 'description'
export const isArrayKeys = (key) => key === 'images' || key === 'color' || key === 'size';

//in variations + attachment  || in simple keys + group

export const validate = (key, value) => {
	if (isSingleTextKeys(key)) return validationRules.single(value)
	if (isDoubleInputKeys(key)) return validationRules.double(value)
	if (isArrayKeys(key)) return validationRules.array(value)
}

export const formatLabelToOptions = (label) => {
	if (label.includes('Група')) return groupOptions
	if (label.includes('Підвіс')) return attachmentOptions
}
export const formatKeyToType = (key) => {
	if (key === 'images') return 'images';
	if (key === 'description') return 'textarea';
	if (key === 'price') return 'number';
	if (key === 'color' || key === 'size') return 'list';
	if (key === 'group' || key === 'attachment') return 'select';
	if (key === 'name' || key === 'feature' || key === 'material') return 'text';
}

export const formatKeyToLabel = (key, isVariation = false) => {
	switch (key) {
		case 'name':
			return 'Назва';
		case 'description':
			return 'Опис';
		case 'price':
			return 'Ціна';
		case 'group':
			return 'Група';
		case 'color':
			return isVariation ? 'Колір' : 'Кольори';
		case 'size':
			return isVariation ? 'Розмір (см)' : 'Розміри (см)' ;
		case 'images':
			return 'Картинки';
		case 'attachment':
			return 'Підвіс';
		case 'feature':
			return 'Властивість (напр. long spiral)';
		case 'material':
			return 'Матеріал';
		default:
			return key; // Return the key itself if not found in the switch statement
	}
};

