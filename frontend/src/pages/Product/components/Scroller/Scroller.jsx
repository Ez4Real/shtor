import React, {useMemo, useState} from 'react';
import './Scroller.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useAPI from "provider/useAPI";
import ProductImage from "ui-components/ProductImage";
import {getProductName, getProductImageName, getProductImageNameHover, getProductPrice} from "../../../../utils/getProduct";
import {translations} from "info";
import {Link, useParams} from "react-router-dom";

const Scroller = () => {
    const { id, variationIndex } = useParams()
    const {state: { products, lang }} = useAPI();

    const [currentIndex, setCurrentIndex] = useState(0);
    const settings = useMemo(() => ({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,
        beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    }), [products?.length])

    const shuffledProducts = useMemo(() => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        return shuffleArray([...(Array.isArray(products) ? products.filter(product => product.isVisible) : [])]);
    }, [products.length, id, variationIndex]);

    return (
        <div className="scroller-container">
            <h4 className="scroller-title">You also may like</h4>
            <Slider className="scroller-items" {...settings}>
                {shuffledProducts?.slice(0, 8).map((product, index) => {
                    const imageName = getProductImageName(product)
                    const hoverImage = getProductImageNameHover(product)
                    return (
                        <Link to={product.link} key={index} className="product-item">
                            <div className="product-image__container">
                                <ProductImage className='product-img' imageName={imageName}/>
                                {imageName !== hoverImage ? <ProductImage className='product-img-hover' imageName={hoverImage}/> : ""}
                            </div>
                            <p className='scroller-subtitle'>{product.group}/{getProductName(product, lang)}</p>
                            <p className='scroller-price'>{translations.product.currency[lang]}{getProductPrice(product, lang)}</p>
                        </Link>)
                })
                }
            </Slider>
            <div className="progress-bar__container">
                <div className="progress-bar" style={{left: `${(currentIndex % 8) * 12.5}%`}}/>
            </div>
        </div>
    );
};

export default Scroller;
