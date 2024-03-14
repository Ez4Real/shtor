import React, { useState, useEffect } from 'react';
import {appURL} from "../../config";

const addFolderLocation = (url) => `${appURL}/productPhotos/${url}`;

const ProductImage = ({ imageName = '', ...props }) => {

	const src = addFolderLocation(imageName);

	return <img {...props} className={`${props?.className} ${imageName.replace('.','')}`} src={src} />
};

export default ProductImage;
