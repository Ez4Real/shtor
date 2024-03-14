import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
	const location = useLocation()
	useLayoutEffect(() => {
		if (location.pathname !== '/') window.scrollTo(0,0);
	}, [location.pathname]);

	return null;
}
