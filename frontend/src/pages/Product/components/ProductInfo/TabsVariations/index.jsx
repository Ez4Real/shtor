import React from 'react';
import VariationsItem from "../VariationsItem";

const TabsVariations = ({ variationsData }) => {
	return (
		<div className="tabs-variations">
			{variationsData.map(variation => (
				<VariationsItem
					key={variation.name}
					variations={variation.variations}
					currentVariation={variation.currentVariation}
					setCurrentOption={variation.setCurrentOption}
					isInVariations={variation.isInVariations}
					name={variation.name}
					pickVariation={variation.pickVariation}
				/>
			))}
		</div>
	);
}

export default TabsVariations;
