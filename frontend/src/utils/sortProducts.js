const customOrder = [
	"Bracelet-pendant",
	"Authentic earrings",
	"Comb-pendant",
	"seashell pendant",
	"Hair comb",
	"pearl pendant",
	"Swan comb",
	"seashell set",
	"seashell pendant *long spiral"
];

// Sort the array based on the custom order
export const sortProducts = (data) => data?.sort((a, b) => {
	const nameA = a.name.en.toUpperCase(); // Convert names to uppercase
	const nameB = b.name.en.toUpperCase();

	// Get the index of each name in the custom order array
	const indexA = customOrder.indexOf(nameA);
	const indexB = customOrder.indexOf(nameB);

	// Compare the indexes
	if (indexA === -1 && indexB === -1) {
		return 0; // If both names are not found in the custom order, maintain current order
	} else if (indexA === -1) {
		return 1; // If nameA is not found in the custom order, move it down
	} else if (indexB === -1) {
		return -1; // If nameB is not found in the custom order, move it down
	} else {
		return indexA - indexB; // Compare indexes
	}
});
