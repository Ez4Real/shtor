export default (str) => {
	if (!str) return ""
	if (typeof str === 'number') return str
	return str.charAt(0).toUpperCase() + str.slice(1);
}
