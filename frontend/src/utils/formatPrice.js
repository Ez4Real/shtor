export function formatPrice(price) {
	// Convert the price to a string
	let priceString = String(price);

	// Split the price into integer and decimal parts
	let parts = priceString.split('.');

	// Get the integer part of the price
	let integerPart = parts[0];

	// Initialize formatted price
	let formattedPrice = '';

	// Starting from the end, iterate through the integer part and add spaces
	for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
		if (j > 0 && j % 3 === 0) {
			// Add space every third digit from the right
			formattedPrice = ' ' + formattedPrice;
		}
		formattedPrice = integerPart[i] + formattedPrice;
	}

	// If decimal part exists, add it back to the formatted price
	if (parts.length > 1) {
		formattedPrice += '.' + parts[1];
	}

	return formattedPrice;
}

// Test cases
// console.log(formatPrice(13000)); // Output: "13 000"
// console.log(formatPrice(1000000)); // Output: "1 000 000"
// console.log(formatPrice(123000)); // Output: "123 000"
// console.log(formatPrice(123)); // Output: "123"

