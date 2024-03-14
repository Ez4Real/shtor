import React, {useLayoutEffect, useRef} from 'react';
import './Main.css'
import Banner from "./components/Banner/Banner";
import UTP from "./components/UTP/UTP";
import Products from "./components/Products/Products";
import {useHistory, useLocation} from "react-router-dom";

const Main = () => {
    const { hash } = useLocation()
    const history = useHistory()
    const targetRef = useRef(null)
    useLayoutEffect(() => {
        if (hash) {
            // Extract the anchor from the pathname
            const anchor = hash.split('#')[1];
            targetRef.current = document.getElementById(anchor);

                // Start the interval
            const intervalId = setInterval(() => {
                if (targetRef.current) {
                    window.scrollTo({
                        top: targetRef.current.offsetTop,
                        behavior: 'smooth',
                    });
                    history.push({
                        pathname: '/',
                        hash: '',
                    })
                    clearInterval(intervalId);
                }
            }, 300);

            // Clean up the interval when the component unmounts
            return () => clearInterval(intervalId)
        }
    }, [hash])
    return (
        <>
            <Banner/>
            <UTP/>
            <Products/>
        </>
    );
}

export default Main;
