import React, {useEffect, useRef, useState} from 'react';
import './ProductsPage.css'
import {Redirect, useParams} from "react-router-dom";
import api from "../../../api";
import useAPI from "../../../provider/useAPI";
import {getProductImageName} from "../../../utils/getProduct";
import ProductImage from "../../../ui-components/ProductImage";
import {translations} from "../../../info";
import Checkbox from '@mui/material/Checkbox';
import {ADD_PRODUCTS} from "../../../provider/actions/products";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Loader from "../../../ui-components/Loader";
import InputFileUpload from "../../../ui-components/InputFileUpload";
import DeletePopUp from "../../../ui-components/DeletePopUp";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export const PRODUCTS = "PRODUCTS";
export const ORDERS = "ORDERS";
export const REGULAR_PRODUCTS = "REGULAR_PRODUCTS";
export const BRACELET_PRODUCTS = "BRACELET_PRODUCTS";
export const SHELL_PRODUCTS = "SHELL_PRODUCTS";
export const COLORS = "COLORS";
export const ATTACHMENTS = "ATTACHMENTS";

const ProductsPage = () => {

	const {state: {products, lang, currency}, dispatch} = useAPI();
	const [data, setData] = useState(products)
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false)
	const [deleting, setDeleting] = useState(null);
	const [copy, setCopy] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)
	const {id} = useParams()
	const [pickedProduct, setPickedProduct] = useState({});
	const [rerender, setRerender] = useState(false);

	const scrollRef = useRef(null);

	const scrollDown = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	useEffect(() => setData(products), [products])

	const deleteProduct = async () => {
		const {_id} = deleting;
		setLoading(_id)
		try {
			const {data: {success}} = await api.products.deleteById({_id})
			if (success) dispatch({
				type: ADD_PRODUCTS,
				payload: products.filter(prod => prod._id !== _id),
			})
		} catch (e) {
			console.error(e)
		} finally {
			setDeleting(null)
			setLoading(false);
		}
	}

	const handleProductClick = (productId, {target: {tagName}}) => {
		if (tagName === 'DIV' || tagName === 'IMG') setRedirect(`/admin/${productId}`);
	};

	const changeKeyValue = async (newObj) => {
		setLoading(newObj._id)
		try {
			const {data: {success, data: responseData}} = await api.products.updateKeyValueById(newObj)
			if (success) dispatch({
				type: ADD_PRODUCTS,
				payload: products.map(prod => prod._id === responseData._id ? responseData : prod),
			})
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (id) setPickedProduct(Array.isArray(data) ? data?.find(item => item?._id === id) : []);
		else setPickedProduct({})
	}, [id, data])


	const copyProduct = async () => {
		const {_id} = copy
		setLoading(_id)
		try {
			const {data: { success, data: responseData }} = await api.products.copyById({_id})
			if (success) {
				dispatch({
					type: ADD_PRODUCTS,
					payload: [...products, {...responseData, active: true}],
				})
				scrollDown();
			}
		} catch (e) {
			console.error(e)
		} finally {
			setCopy(false)
			setLoading(false)
		}
	}

	// Function to update list on drop
	const handleDrop = (droppedItem) => {
		const { destination, source, draggableId } = droppedItem;
		// Ignore drop outside droppable container
		if (!droppedItem || !destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
			return;
		}
		var updatedList = [...data];
		// Remove dragged item
		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
		// Add dropped item
		updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
		// Update State
		dispatch({
			type: ADD_PRODUCTS,
			payload: updatedList,
		})
		try {
			setPageLoading(true)
			api.products.updateOrder(updatedList.map(item => item._id))
		} catch (e) {
			console.error(e)
		} finally {
			setPageLoading(false)
		}
	};

	const updateKey = async (key, newValue, hasLang) => {
		if ((!hasLang ? pickedProduct[key] !== newValue : pickedProduct[key][lang] !== newValue) && (newValue)) {
			const {data: {data: responseData, success}} = await api.products.updateKeyValueById({
				_id: pickedProduct._id,
				[key]: hasLang
					? ({
						...pickedProduct[key],
						[lang]: newValue,
					})
					: newValue
			})
			if (success) dispatch({
				type: ADD_PRODUCTS,
				payload: products.map(prod => prod._id === responseData._id ? responseData : prod),
			})
		}
	}

	const handleNewImage = async (newValueObj) => {
		try {
			const {data: {data: responseData, success}} = await api.products.updateKeyValueById({_id: pickedProduct._id, ...newValueObj});
			if (success) dispatch({
				type: ADD_PRODUCTS,
				payload: products.map(prod => prod._id === responseData._id ? responseData : prod),
			})
		} catch (e) {
			console.error(e)
		}
	}

	// Callback for uploading an image
	const uploadImage = async (event) => {
		const file = event.target.files[0];
		try {
			const formData = new FormData();
			formData.append('image', file);
			await api.products.createProductImage(formData);
			console.log('Image uploaded successfully');
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	// Callback for deleting an image
	const deleteImage = async (imageName) => {
		try {
			const deleteImageIfNotUsed = () => {
				const otherProducts = data.filter(product => product._id !== pickedProduct._id)
				return otherProducts.reduce((deleteImage, otherProduct) => {
					if (!deleteImage) return false; // If deleteImage is already false, return false

					if (otherProduct?.seashells?.length) {
						otherProduct.seashells.map(seashellArr =>
							seashellArr.map(seashell => {
								if (seashell === imageName) deleteImage = false;
							})
						);
					}
					if (otherProduct?.images?.length) {
						otherProduct.images.map(image => {
							if (image === imageName) deleteImage = false;
						});
					}
					if (otherProduct?.variations?.length && otherProduct?.variations?.[0]?.images?.length) {
						otherProduct.variations.map(variation =>
							variation.images.map(image => {
								if (image === imageName) deleteImage = false;
							})
						);
					}

					return deleteImage;
				}, true); // Initialize deleteImage as true
			};
			// Here, you need to specify the image name or ID to delete
			// if (deleteImageIfNotUsed()) await api.products.deleteProductImage({ imageName });
			if (deleteImageIfNotUsed()) {
				await api.products.deleteProductImage({ imageName });
				console.log('Image deleted successfully');
			} else {
				console.log('Image is used in other products. Not deleted.');
			}
		} catch (error) {
			console.error('Error deleting image:', error);
		}
	};

	// Callback for editing an image
	const editImage = async (event, imageToDelete) => {
		const file = event.target.files[0];
		console.log('file', file)
		try {
			const formData = new FormData();
			formData.append('image', file);
			await deleteImage(imageToDelete);
			await uploadImage(event);
		} catch (error) {
			console.error('Error editing image:', error);
		}
	};

	function generateNewFileName(originalFileName) {
		const dotIndex = originalFileName.lastIndexOf('.');
		const extension = originalFileName.substring(dotIndex);
		return `${Date.now()}${extension}`;
	}

	function createNewFileWithModifiedName(originalFile) {
		// Generate a new name for the file
		const newFileName = generateNewFileName(originalFile.name);

		// Create a new File object with the modified name
		return new File([originalFile], newFileName, {type: originalFile.type});
	}

	useEffect(() => {
		setRerender(true)
		setTimeout(() => setRerender(false), 500)
	}, [lang, currency])
	return (
		<div className={`list__container ${id && pickedProduct ? 'flex' : ''}`}>
			<Typography variant="h5" gutterBottom className="admin-product-title">
				{id ? <ArrowBackIcon onClick={() => setRedirect('/admin/')}/> : ""}
				{id ? `Товар #${id}` : ''}
			</Typography>

			{id && pickedProduct && !rerender
				? <div className="product__edit">
					<Button className="delete__product" onClick={() => setDeleting(pickedProduct)}>Видалити товар</Button>
					<div className="images__edit images">
						{Boolean(pickedProduct?.seashells?.length) && (
							<>
								<h5>Seashells Images</h5>
								{pickedProduct?.seashells.map((seashellArr, index) => (
									<div className="images__row variation" key={index}>
										Мушля {index}
										{seashellArr.map((seashell, undix) => (
											<div className="images__edit-item" key={seashell}>
												<ProductImage imageName={seashell}/>
												<div className="actions__images">
													<InputFileUpload onChange={async (e) => {
														const originalFile = e.target.files[0];
														const newFile = createNewFileWithModifiedName(originalFile);
														await editImage({target: {files: [newFile]}}, pickedProduct.seashells[index][undix]);
														await handleNewImage({
															seashells: pickedProduct.seashells.map((item, flex) => item.map((unit, flex2) => index === flex && undix === flex2
																? newFile.name
																: unit
															))
														})
													}}/>
													{seashellArr.length !== 1 ? (
														<Button className="delete" onClick={async (e) => {
															console.log('e.target.files[0].name', pickedProduct?.seashells?.[index][undix])
															await deleteImage(pickedProduct?.seashells?.[index]?.[undix]);
															await handleNewImage({
																seashells: pickedProduct.seashells.map((item) => item.filter((unit) => unit !== pickedProduct?.seashells?.[index][undix]))
															})
														}}>
															<i className="bi bi-trash"></i>
														</Button>
													) : ""}
												</div>
											</div>
										))}
										<div className="general__actions">
											<InputFileUpload title="Додати фото" onChange={async (e) => {
												const originalFile = e.target.files[0];
												const newFile = createNewFileWithModifiedName(originalFile);
												await uploadImage({target: {files: [newFile]}});
												console.log('e.target.files[0].name', newFile.name)
												await handleNewImage({
													seashells: pickedProduct.seashells.map((itm, idx) => idx === index
														? [...pickedProduct.seashells[idx], newFile.name]
														: itm
													),
												})
											}}/>
											{pickedProduct.seashells.length !== 1 ? (
												<Button className="delete" onClick={async () => {
													pickedProduct.seashells[index].map(async item => await deleteImage(item))
													console.log('pickedProduct seashells', pickedProduct.seashells)
													console.log('pickedProduct filtered', pickedProduct.seashells.filter((itm, idx) => idx !== (pickedProduct.seashells.length - 1)),)
													await handleNewImage({
														seashells: pickedProduct.seashells.filter((itm, idx) => idx !== index),
													})
												}}>
													Видалити мушлю <i className="bi bi-trash"></i>
												</Button>
											) : ""}
										</div>
									</div>
								))}
								<div className="images__edit-item add">
									<div className="actions__images">
										<InputFileUpload title="Додати Seashell" onChange={async (e) => {
											const originalFile = e.target.files[0];
											const newFile = createNewFileWithModifiedName(originalFile);
											await uploadImage({target: {files: [newFile]}});
											console.log('e.target.files[0].name', newFile.name)
											await handleNewImage({
												seashells: [...pickedProduct.seashells, [newFile.name]],
											})
										}}/>
									</div>
								</div>
							</>
						)}
						{Boolean(pickedProduct?.variations?.length && pickedProduct.variations[0].images?.length) && (
							<>
								<h5>Variation Images</h5>
								{pickedProduct?.variations.map((variation, index) => (
									<div className="images__row variation" key={index}>
										Варіація {index + 1}
										{variation.images.map((img, imgIndex) => (
											<div className="images__edit-item" key={img}>
												<ProductImage imageName={img}/>
												<div className="actions__images">
													<InputFileUpload onChange={async (e) => {
														const originalFile = e.target.files[0];
														const newFile = createNewFileWithModifiedName(originalFile);
														await editImage({target: {files: [newFile]}}, img);
														let newVariations = [...pickedProduct.variations]
														newVariations[index].images[imgIndex] = newFile.name
														await handleNewImage({
															variations: newVariations
														})
													}}/>
													{variation.images.length !== 1
														? (<Button
															className="delete"
															onClick={async (e) => {
																await deleteImage(img);
																let newVariations = [...pickedProduct.variations]
																newVariations[index].images = newVariations[index].images.filter((itm, idx) => itm !== img)
																await handleNewImage({
																	variations: newVariations
																})
															}}>
															<i className="bi bi-trash"></i>
														</Button>)
														: ""}
												</div>
											</div>
										))}
										<div className="general__actions">
											<InputFileUpload title="Додати фото" onChange={async (e) => {
												const originalFile = e.target.files[0];
												const newFile = createNewFileWithModifiedName(originalFile);
												await uploadImage({target: {files: [newFile]}});
												console.log('e.target.files[0].name', newFile.name)
												let newVariations = [...pickedProduct.variations]
												newVariations[index].images = [...newVariations[index].images, newFile.name]
												await handleNewImage({
													variations: newVariations,
												})
											}}/>
										</div>
									</div>
								))}
							</>
						)}
						{Boolean(pickedProduct?.images?.length) && (
							<>
								<h5>General Images</h5>
								{pickedProduct.images.map((item, index) => (
									<div className="images__edit-item" key={item}>
										<ProductImage imageName={item}/>
										<div className="actions__images">
											<InputFileUpload onChange={async (e) => {
												const originalFile = e.target.files[0];
												const newFile = createNewFileWithModifiedName(originalFile);
												await editImage({target: {files: [newFile]}}, item);
												await handleNewImage({
													images: pickedProduct.images.map((vibe, flex) => index === flex ? newFile.name : vibe),
												})
											}}/>
											{pickedProduct.images.length !== 1 ? (
												<Button className="delete" onClick={async (e) => {
													await deleteImage(item);
													await handleNewImage({
														images: pickedProduct.images.filter((filterItem) => filterItem !== item),
													})
												}}>
													<i className="bi bi-trash"></i>
												</Button>
											) : ""}
										</div>
									</div>
								))}
								<div className="images__edit-item add">
									<div className="actions__images">
										<InputFileUpload title="Додати General" onChange={async (e) => {
											const originalFile = e.target.files[0];
											const newFile = createNewFileWithModifiedName(originalFile);
											await uploadImage({target: {files: [newFile]}});
											await handleNewImage({
												images: [...pickedProduct.images, newFile.name],
											})
										}}/>
									</div>
								</div>
							</>
						)}
					</div>
					{Object.keys(pickedProduct)
						.filter(key => Array.isArray(pickedProduct[key]) ? pickedProduct[key].length : true)
						.map(key => {
							if (key !== 'variations' && key !== '_id' && key !== 'seashells' && key !== 'images' && key !== 'orderIndex' && key !== 'inStock' && key !== '__v' && key !== 'link' && key !== 'material') {
								return (
									<div className="edit__item" key={key}>
										{key}: {pickedProduct[key]?.[lang]
										? key === 'description'
											? <textarea name={key} defaultValue={rerender ? "" : pickedProduct[key][lang]} onBlur={(e) => updateKey(key, e.target.value, true)}/>
											: <><input name={key} defaultValue={rerender ? "" : pickedProduct[key][lang]} onBlur={(e) => updateKey(key, e.target.value, true)}/> {key === 'price' ? translations.currencySymbol[currency] : ""}</>
										: key === 'size'
											? pickedProduct.size.length === 1
												? <><input name={key} defaultValue={rerender ? "" : pickedProduct.size[0]} onBlur={(e) => updateKey(key, [e.target.value])}/> {translations.product.size.cm[lang]}</>
												: <>{pickedProduct[key].join(' ')} {translations.product.size.cm[lang]}</>
											: Array.isArray(pickedProduct[key])
												? pickedProduct[key].map( item => Array.isArray(item)
													? item.join(', ')
													: `${item}, `)
												: <input name={key} defaultValue={pickedProduct[key]} onBlur={(e) => updateKey(key, e.target.value)}/>
									}
									</div>
								)
							}
						})}
				</div>
				: <>
					<label className="search__label">
						<i className="bi bi-search"></i>
						<input className="search" type="search" placeholder="Шукати товар..."/>
					</label>

					<div className="list-titles">
						<div className="pro-image">Show</div>
						<div className="pro-image">В наявності</div>
						<div className="pro-image">Картинка</div>
						<div className="pro-title">Ім'я</div>
						<div className="category">Категорія</div>
						<div className="price">Ціна</div>
						<div className="actions">Дії</div>
					</div>
					<div className="list-items">
						{Array.isArray(data) && data.length &&
							<DragDropContext onDragEnd={handleDrop}>
								<Droppable droppableId="list-container">
									{(provided) => (
										<div
											className="list-container"
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{data.map((item, key) => (
												<Draggable key={item._id} draggableId={item._id} index={key}>
													{(provided) => (
														<div
															onClick={(e) => handleProductClick(item._id, e)}
															className={`item-container list-item ${item?.active ? 'active' : ''} ${!item?.inStock ? 'hidden' : ''}`}
															ref={provided.innerRef}
															{...provided.dragHandleProps}
															{...provided.draggableProps}
														>
															<div className="inShow">
																<Loader isActive={loading === item?._id}/>
																<Checkbox checked={item?.isVisible}
																		  onChange={() => changeKeyValue({
																			  _id: item._id,
																			  isVisible: !item.isVisible
																		  })}/>
															</div>
															<div className="inUse">
																<Checkbox checked={item?.inStock}
																		  onChange={() => changeKeyValue({
																			  _id: item._id,
																			  inStock: !item.inStock
																		  })}/>
															</div>
															<div className="image"><ProductImage
																imageName={getProductImageName(item)} alt=""
																width="30px"/></div>
															<div className="pro-title">{item.name[lang]}</div>
															<div className="category">{item.group}</div>
															<div
																className="price">{item.price?.[lang] || item.variations[0].price[lang]} {translations.product.currency[lang]}</div>
															<div className="actions">
																<Button className="edit" onClick={() => setCopy(item)}>
																	<i className="bi bi-copy"></i>
																</Button>
																<Button className="delete" onClick={() => setDeleting(item)}>
																	<i className="bi bi-trash"></i>
																</Button>
															</div>
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						}
						<div ref={scrollRef}/>
					</div>
				</>
			}
			{(deleting || copy) && <DeletePopUp isActive={(deleting || copy)?.name?.[lang]} onNo={() => deleting ? setDeleting(null) : setCopy(null)} onYes={deleting ? deleteProduct : copyProduct} from={deleting ? ` з бази даних?` : "в базу даних?"} alertText={deleting ? "" : translations.cart.copy[lang]}/>}
			{pageLoading && <Loader isActive={pageLoading}/>}
			{redirect && <Redirect to={redirect}/>}
		</div>
	);
};

export default ProductsPage;
