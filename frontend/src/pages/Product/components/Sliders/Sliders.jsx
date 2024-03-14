import React, {useState, useEffect, useRef, useMemo} from 'react';
import Slider from 'react-slick';
import ArrowRight from 'assets/arrow-right.svg';
import ArrowLeft from 'assets/arrow-left.svg';
import './Sliders.css';
import ProductImage from "ui-components/ProductImage";
import calculateIsAnimationDirection from "utils/calculateIsAnimationDirection";
import Dots from "./Dots/Dots";
import ThumbNails from "./ThumbNails/ThumbNails";
import useAPI from "../../../../provider/useAPI";
import {DECREMENT_PRODUCT, DELETE_PRODUCT, INCREMENT_PRODUCT} from "../../../../provider/actions/cart";
import {translations} from "../../../../info";
import product from "../../Product";
import {getSeashellIndex} from "../../../../utils/getImageIndexInVariation";

const Arrow = ({ direction, ...props }) => (
	<button {...props} className={`slider-button ${direction}-button`}>
		<img src={direction === 'next' ? ArrowRight : ArrowLeft} alt="arrow-icon" />
	</button>
);

const NextArrow = (props) => <Arrow direction="next" {...props} />;
const PrevArrow = (props) => <Arrow direction="prev" {...props} />;


const Sliders = ({ slider, setSlider, slides, initialSlide, setCurrentVariationIndex, isQuantityPicker, isSeashell, currentSlide, setCurrentSlide, seashells }) => {

	const slider1 = useRef(null);
	useEffect(() => setSlider(slider1.current), []);

	const [animation, setAnimation] = useState({back: [], forth: []})
	const { back, forth } = animation

	const startDotAnimation = (isBack) => {
		setAnimation(prevAnimation => ({
			...prevAnimation,
			[isBack ? 'back' : 'forth']: [...(isBack ? back : forth), 1]
		}))
		setTimeout(() => setAnimation(prevAnimation => ({
			...prevAnimation,
			[isBack ? 'back' : 'forth']: (isBack ? back : forth).slice(0, -1)
		})), 500)
	}

	const settings = useMemo(() => ({
		infinite: true,
		speed: 500,
		adaptiveHeight: true,
		focusOnSelect: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: "main-slider",
		beforeChange: (oldIndex, newIndex) => {
			if (oldIndex !== newIndex) startDotAnimation(calculateIsAnimationDirection(oldIndex, newIndex, slides?.length));
			setCurrentSlide(newIndex)
			setCurrentVariationIndex && setCurrentVariationIndex(newIndex)
		},
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		initialSlide,
	}), [slides?.length])

	const goToSlide = (slideIndex) => currentSlide !== slideIndex && slider.slickGoTo(slideIndex)
	const thumbnailsComponent = <ThumbNails
			isQuantityPicker={isQuantityPicker}
			slides={isQuantityPicker && isSeashell ? seashells?.map(item => item[0]) : slides}
			goToSlide={goToSlide}
			currentSlide={currentSlide}
		/>
	return (
		<div className={`slider-container ${isQuantityPicker ? 'popup-slider' : ""}`}>
			{slides?.length
				? <>
					<Slider{...settings} ref={slider1}>
						{slides?.map((imageName, index) => (
							<ProductImage key={index} imageName={imageName} alt={`Slide ${index + 1}`}/>
						))}
					</Slider>
					{slides.length > 1
						? <>
							<Dots
								backAnimation={back.length}
								forthAnimation={forth.length}
								slidesLength={slides.length}
								goToSlide={goToSlide}
								currentSlide={currentSlide}
							/>
						</>
						: ""
					}
					{isQuantityPicker && isSeashell ? <h4 className="seashell-title">Your seashell</h4> : ""}
					{slides.length > 1
						? isQuantityPicker
							? isSeashell
								? thumbnailsComponent
								: ""
							: thumbnailsComponent
						: ""}

				</>
				: ""}
		</div>
	)
};

export default React.memo(Sliders);
