export const OBERIH = 'OBERIH';
export const OBJECT = 'OBJECT';
export const NATURE = 'NATURE';

export const ATTACHMENT_EMPTY = 'Без підвісу';
export const ATTACHMENT_CHAIN = 'Срібний ланцюг';
export const ATTACHMENT_ORBIT = 'Срібна орбіта';

export const groupOptions = [OBERIH, OBJECT, NATURE]
export const attachmentOptions = [ATTACHMENT_EMPTY, ATTACHMENT_CHAIN, ATTACHMENT_ORBIT]

export const inputsData = [
	'name', 'description', 'price', 'images', 'color', 'size', 'attachment', 'feature', 'material'
]

export const requiredInputs = [
	'name', 'description', 'price', 'image'
];

export const validationRules = {
	single: (value) => !!value,
	double: (value) => !!(value.en && value.ua),
	array: (value) => !!value.length
}
