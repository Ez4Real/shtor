export const formatSize = (size, name) => {
	if (name.ua === "Браслет-підвіс") {
		if (size === '21,5') return `XS/${size}`
		if (size === '22') return `S/${size}`
		if (size === '23,4') return `M/${size}`
		if (size === '25') return `L/${size}`
	}
	return size
}
