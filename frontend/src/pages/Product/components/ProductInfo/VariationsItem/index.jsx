import React from 'react';
import './VariationsItem.css'
import CustomRadio from "../../../../../ui-components/CustomRadio";
import {translations} from "../../../../../info";
import useAPI from "../../../../../provider/useAPI";

const VariationsItem = ({variations, currentVariation, setCurrentOption, isInVariations, name, pickVariation}) => {

	const {state: { lang }} = useAPI();

	if (!variations || variations.length <= 1) return null;
	if (name === 'size' && variations?.length > 1 && isInVariations) return;

	const handleOptionChange = (e, index) => {
		const shouldSetDefaultAttachment = name === 'attachment' && e.target.value === currentVariation
		const defaultAttachmentVariationIndex = shouldSetDefaultAttachment ? variations.findIndex(variation => variation === 'Без підвісу') : 0
		if (isInVariations) pickVariation(shouldSetDefaultAttachment ? defaultAttachmentVariationIndex : index, name)
		setCurrentOption(name, shouldSetDefaultAttachment ? variations[defaultAttachmentVariationIndex] : e.target.value);
	};

	return (
		<ul className={`variation ${name}`}>
			{variations.map((variation, index) => {
				const value = typeof variation === 'object' ? variation[0] : variation
				if (name === 'attachment' && value === 'Без підвісу') return null;
				return (
					<li key={variation}>
						<CustomRadio
							checked={value === currentVariation}
							name={name}
							value={value}
							type={name === 'attachment' ? 'checkbox' : ''}
							showValue={name === 'color'
								? translations.product.color[value][lang]
								: name === 'attachment'
									? translations.product.attachment[value][lang]
									: (name === 'image' || name === 'seashell')
										? `#${index + 1}`
										: value
							}
							onChange={(e) => handleOptionChange(e, index)}
						/>
					</li>
				)
			})}
		</ul>
	);
};

export default VariationsItem;
