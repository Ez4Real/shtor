import React from 'react';
import './Breadcrumbs.css'
import {Link} from "react-router-dom";
import {translations} from "../../info";

const Breadcrumbs = ({group, name, lang}) => {
    return (
        <div className='breadCrumbs' id='product-breadcrumbs'>
            <Link to="/" className='homeBtn'>{translations.product.main[lang]}</Link>
            {group ? <>/<span className="no-link" >{group}</span></> : ""}
            {group ? <>/<Link to="#">{name}</Link></> : ""}
        </div>
    );
};

export default Breadcrumbs;
