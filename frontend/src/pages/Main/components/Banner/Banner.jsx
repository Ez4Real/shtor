import React from 'react';

import banner from 'assets/banner.jpeg';
import bannerMobile from 'assets/bannerFullSize.jpg';

import './Banners.css';
import useAPI from "../../../../provider/useAPI";

const Banner = () => {
	const {state: {isMobile}} = useAPI();
	return (
		<div className="banner__container">
			<img src={isMobile ? bannerMobile : banner} className="banner-img" alt="banner"/>
		</div>
	);
};

export default Banner;
