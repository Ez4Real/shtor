import { translations } from "../info";

export default (desc, curAttachment, lang) => {
	if (curAttachment === 'Срібний ланцюг') {
		let newArr = [...desc];

		newArr.splice(newArr.length - 1, 0, translations.product.silverAttachDesc[lang]);

		return newArr;
	} else {
		return desc;
	}
}
