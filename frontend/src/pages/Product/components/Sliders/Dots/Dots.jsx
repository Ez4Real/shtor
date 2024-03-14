import React from 'react';
import './Dots.css'

const Dots = ({backAnimation, forthAnimation, slidesLength, goToSlide, currentSlide}) => {
	return (
		<div className={`dots-slider ${backAnimation ? 'back-animation' : forthAnimation ? 'forth-animation' : ''} ${slidesLength === 2 ? `double slide_${currentSlide}` : ''}`}>
			<div className="dots-slider__dot back-hidden" onClick={(e) => goToSlide(e, currentSlide - 1)}/>
			<div className="dots-slider__dot back-color" onClick={(e) => goToSlide(e, currentSlide - 1)}/>
			<div className="dots-slider__dot active"/>
			<div className="dots-slider__dot forth-color" onClick={(e) => goToSlide(e, currentSlide + 1)}/>
			<div className="dots-slider__dot forth-hidden" onClick={(e) => goToSlide(e, currentSlide + 1)}/>
		</div>
	);
};

export default Dots;
