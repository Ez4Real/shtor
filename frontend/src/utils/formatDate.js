const ukrainianMonths = {
	'01': 'січня',
	'02': 'лютого',
	'03': 'березня',
	'04': 'квітня',
	'05': 'травня',
	'06': 'червня',
	'07': 'липення',
	'08': 'серпення',
	'09': 'вересня',
	'10': 'жовтня',
	'11': 'листопаду',
	'12': 'груденя'
};

export default (dateString) => {
	const date = new Date(dateString);

	// Extract components
	const day = ('0' + date.getDate()).slice(-2);
	const month = ukrainianMonths[(('0' + (date.getMonth() + 1)).slice(-2))];
	const year = date.getFullYear().toString();

	// Construct the formatted date string
	return `${day} ${month} ${year}`;
}
