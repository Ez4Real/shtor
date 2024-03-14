import React, {useEffect, useState} from 'react';
import './ProductForm.css';
import Input from "../../../ui-components/Admin/Input";
import {
	formatKeyToLabel, formatKeyToType, isArrayKeys, isDoubleInputKeys,
	isSingleTextKeys, pushKeyOrderedToInputs, validate,
} from "./productUtils";
import {useLocation} from "react-router-dom";
import {attachmentOptions, inputsData, OBJECT, requiredInputs} from "./constants";
import {Button, Typography} from "@mui/material";
import api from "../../../api";

const ProductForm = () => {
	const [form, setForm] = useState({
		group: OBJECT,
	});
	const location = useLocation();
	const isAdding = location.pathname.includes('add')
	const [inputs, setInputs] = useState(inputsData)
	const [isError, setIsError] = useState(false);
	const [variation, setVariation] = useState({})

	const hasInputAddButtonError = (key) => (key === 'images' && !Object.keys(form).includes(key) && !Object.keys(variation).includes(key)) || (key !== 'images' && requiredInputs.includes(key))

	const isValidForm = () => {
		const isRequiredInputsValid = inputs.every(requiredInput => !hasInputAddButtonError(requiredInput));

		const {group, ...formData} = form;
		const isFormValuesValid = Object.entries(formData).every(([key, value]) => key === 'variations'
			? value.every(variation => Object.entries(variation).every(([variationKey, variationValue]) => validate(variationKey, variationValue)))
			: validate(key, value));

		return isRequiredInputsValid && isFormValuesValid;
	};

	const uploadImage = async (image) => {
		try {
			const formData = new FormData();
			formData.append('image', image);
			const { data: { file }} = await api.admin.image.add(formData);
			return file
		} catch (error) {
			console.error('Error uploading image:', error.message);
			throw error;
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (isValidForm()) {
			try {
				const allImages = [];

				if (form?.images) form.images.map((image) => allImages.push(image))
				if (form?.variations?.length && variation?.images) {
					form.variations.map(({images}) => {
						if (images && images.length) images.map((image) => allImages.push(image));
						return variation;
					})
				}

				const uploadPromises = allImages.map(uploadImage);
				const responses = await Promise.all(uploadPromises);

				const newForm = {...form};
				if (newForm?.images) newForm.images = newForm.images.map((image) => responses.find(responseFile => image.name === responseFile.originalname).filename)
				if (newForm?.variations?.length && variation?.images) newForm.variations = newForm.variations.map((variation) => ({
					...variation,
					images: variation.images.map(image => responses.find(responseFile => image.name === responseFile.originalname).filename)
				}))


				const response = isAdding ? await api.admin.products.add(newForm) : await api.admin.products.edit(newForm)

				alert(isAdding ? 'Товар успішно додан до бази' : 'Товар успішно змінен')
			} catch (e) {
				console.error(e)
				alert(isAdding ? 'Не вдалось додати товар до бази' : 'Не вдалось змінити товар')
			}
		} else setIsError(true)
	}

	useEffect(() => {
		if (isValidForm()) {
			setIsError(false)
		}
	}, [inputs])

	const generateFormValueByKey = (key) => {
		let value;

		if (key ===  'feature' || key ===  'material') value = ""
		if (key === 'size' || key === 'images' || key === 'color') value = []
		if (key === 'attachment') value = attachmentOptions[((form?.variations?.length) || 0) % 3]
		if (key === 'name' || key === 'description') value = {
			en: "",
			ua: "",
		};
		if (key === 'price') value = {
			en: 0,
			ua: 0
		}

		return value;
	}

	const moveFromInputKeysToVariationsForm = (e, key) => {
		e.preventDefault();

		if (e.key === 'Enter') return;

		const value = generateFormValueByKey(key);

		setVariation((prevVariation) => ({...prevVariation, [key]: value}))
		setForm((prevForm) => ({
			...prevForm,
			variations: prevForm?.variations
				? prevForm.variations.map(variation => ({
					...variation,
					[key]: value,
				}))
				: [{[key]: value}]
		}))
		if (key !== 'images') setInputs((prevInputs) => prevInputs.filter(input => input !== key))
	}

	const moveFromVariationsFormToInputKeys = (e, key) => {
		e.preventDefault();

		if (e.key === 'Enter') return;

		setVariation((prevVariation) => {
			const updatedObject = { ...prevVariation };
			delete updatedObject[key];
			return updatedObject
		})
		setForm((prevForm) => {
			const updatedObject = { ...prevForm };
			updatedObject.variations = updatedObject.variations.map((variation) => {
				const updatedVariation = { ...variation };
				delete updatedVariation[key];
				return updatedVariation;
			});

			if (!Object.keys(updatedObject.variations[0]).length) delete updatedObject.variations;
			return updatedObject
		});
		setInputs((prevInputs) => pushKeyOrderedToInputs(key, prevInputs))
	}

	const moveFromInputKeysToFormKeys = (e, key) => {
		e.preventDefault();

		if (e.key === 'Enter') return;

		const value = generateFormValueByKey(key);

		setForm((prevForm) => ({...prevForm, [key]: value}))
		if (key !== 'images') setInputs((prevInputs) => prevInputs.filter(input => input !== key))
	}

	const moveFromFormKeysToInputKeys = (e, key) => {
		e.preventDefault();

		if (e.key === 'Enter') return;

		setInputs((prevInputs) => pushKeyOrderedToInputs(key, prevInputs))
		setForm((prevForm) => {
			const updatedObject = { ...prevForm };
			delete updatedObject[key];
			return updatedObject
		})
	}

	const handleInputChange = (key, value, lang) => setForm((prevForm) => ({
		...prevForm,
		[key]: lang ? { ...form[key], [lang]: value } : value,
	}));

	const handleVariationInputChange = (key, value, lang, index) => setForm((prevForm) => ({
		...prevForm,
		variations: prevForm.variations.map((variation, indx) => indx === index
			? ({...variation, [key]: lang ? { ...variation[key], [lang]: value } : value})
			: variation
	)}))


	const createInput = (key, value, lang, isVariation, variationIndex) => {
		const inputProps = {
			type: formatKeyToType(key),
			error: isError && !validate(key, value),
			label: formatKeyToLabel(key, isVariation),
			value: lang ? value[lang] : value,
			onChange: isVariation
				? (event) => handleVariationInputChange(key, event.target.value, lang, variationIndex)
				: (event) => handleInputChange(key, event.target.value, lang),
		};

		if (lang) inputProps.prefix = lang.toUpperCase();
		if ((!isVariation && (key === 'color' || key === 'size')) || key === 'images' ) inputProps.multiple = true;

		return <Input {...inputProps} />
	};

	const renderVariation = (key, value, variationIndex, keyIndex) => {
		let content;

		if (isSingleTextKeys(key) || isArrayKeys(key)) content = createInput(key, value, null, true, variationIndex)
		if (isDoubleInputKeys(key)) content = <>
			{createInput(key, value, 'ua', true, variationIndex)}
			{createInput(key, value, 'en', true, variationIndex)}
		</>

		return (
			<div key={`${variationIndex}${keyIndex}`} className={`input__row ${key}__container ${isDoubleInputKeys(key) ? 'double' : ''}`}>
				{content}
				<button className="remove__value variation" onClick={(e) => moveFromVariationsFormToInputKeys(e, key)}>
					<i className="delete bi bi-trash"></i>Видалити властивість варіації
				</button>
			</div>
		)
	}

	const renderValue = (key) => {
		const value = form[key]
		const content = isSingleTextKeys(key) || isArrayKeys(key)
			? createInput(key, value)
			: <>
				{createInput(key, value, 'ua')}
				{createInput(key, value, 'en')}
			</>;

		return (
			<div key={key} className={`input__row ${key}__container ${isDoubleInputKeys(key) ? 'double' : ''}`}>
				{content}
				{key !== 'group' ? <button className="remove__value" onClick={(e) => moveFromFormKeysToInputKeys(e, key)}><i className="delete bi bi-trash"></i>Видалити властивість</button> : ""}
			</div>
		);
	}

	const addVariation = () => setForm(prevForm => ({...prevForm, variations: [...prevForm.variations, variation]}))
	const removeVariation = (variationIndex) => setForm(prevForm => ({...prevForm, variations: prevForm.variations.filter((variation, index) => index !== variationIndex)}))

	const title = !isAdding ? 'Редагування товару' : 'Додавання товару';
	const showStaticValues = Object.keys(form).filter(key => key !== 'variations' && key !== 'group').length || inputs.filter((input => input !== 'attachment')).length
	const areThereStaticButtons = inputs.filter((input => input !== 'attachment')).length
	const showAddVariationButton = form?.variations ? Object.keys(form?.variations)?.length : false

	return (
		<form className="product__form" onSubmit={onSubmit} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
			<Typography variant="h4" gutterBottom>{title}</Typography>

			<div className="input__part">

				{renderValue('group')}

				{showStaticValues ? <Typography variant="h5" gutterBottom>Постійні дані товару: </Typography> : ""}

				{areThereStaticButtons ? <Typography variant="subtitle1" gutterBottom>- додати до постійних даних товару</Typography> : ""}

				<div className="choose__container">
					{inputs?.filter((input => input !== 'attachment')).map((key, index) => {
						if (key === 'images' && typeof form?.images === 'object') return "";
						return (
							<Button variant="contained" color={isError && hasInputAddButtonError(key) ? "error" : "primary"} key={index} onClick={(e) => moveFromInputKeysToFormKeys(e, key)} className="choose__button">{formatKeyToLabel(key)} товару</Button>
						)
					})}
				</div>

				<div className="values__container">
					{Object.keys(form).filter(key => key !== 'group' && key !== 'variations').map(renderValue)}
				</div>

			</div>

			<div className="input__part">

				<Typography variant="h5" gutterBottom>Дані варіацій товару: </Typography>

				{inputs.length
					? <Typography variant="subtitle1" gutterBottom>- додати до варіацій товару</Typography> : ""}

				<div className="choose__container">
					{inputs?.map((key, index) => {
						if (key === 'images' && typeof variation?.images === 'object') return "";
						return (
							<Button
								variant="contained"
								key={index}
								color={isError && hasInputAddButtonError(key) ? "error" : "primary"}
								onClick={(e) => moveFromInputKeysToVariationsForm(e, key)}
								className="choose__item"
							>
								{formatKeyToLabel(key, true)} варіації
							</Button>
						)
					})}
				</div>

				<div className="values__container variations__container">
					{form?.variations?.map((variation, variationIndex) => (
						<div className="variations-item" variation_number={variationIndex + 1} key={variationIndex}>
							{Object.entries(variation).map(([key, value], keyindex) => renderVariation(key, value, variationIndex, keyindex))}
							{form.variations.length > 1 ? <Button variant="contained" className="remove__variation-item" onClick={() => removeVariation(variationIndex)}><i className="delete bi bi-trash"></i> Видалити варіацію</Button> : ""}
						</div>
					))}
					{showAddVariationButton ? <Button variant="contained" className="add__variation-item" size="large" color="secondary" onClick={addVariation}>Додати варіацію</Button> : ""}
				</div>

			</div>
			{showAddVariationButton ? <Button variant="contained" className="add__variation-item" color="secondary" onClick={addVariation} fullWidth>Додати варіацію</Button> : ""}
			<Button variant="contained" className="add__product" color="success" size="large" onClick={onSubmit} fullWidth>Створити Товар</Button>
		</form>
	);
};

export default React.memo(ProductForm);
