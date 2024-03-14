export default (oldIndex, newIndex, slidesLength) => {
	let isBackWay;
	if (slidesLength !== 2) {
		if (oldIndex > newIndex) isBackWay = true
		if (!oldIndex && newIndex === (slidesLength - 1)) isBackWay = true
		if (!newIndex && oldIndex === (slidesLength - 1)) isBackWay = false
	} else if (oldIndex && !newIndex) isBackWay = true
	return isBackWay
}
