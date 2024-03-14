import React, {useEffect, useMemo, useState} from 'react';
import './Orders.css'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../../../api";
import {translations} from "../../../info";
import PendingIcon from '@mui/icons-material/Pending';
import Button from "@mui/material/Button";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductImage from "../../../ui-components/ProductImage";
import {useParams, Redirect} from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";

const orderKeys = {
	amount: 'Вартість',
	approved: 'Сплачено',
	createdAt: 'Створено',
	currency: 'Валюта',
	email: 'Електронна пошта',
	language: 'Мова',
	orderDescription: 'Опис замовлення',
	order_id: 'Ідентифікатор замовлення',
	products: 'Товари',
	shippingInfo: 'Інформація про доставку',
	trackingSent: 'Відправлено відстеження',
	_id: 'ID'
};

const deliveryTranslations = {
	type: 'Тип',
	delivery_price: 'Вартість доставки',
	countryRegion: 'Країна/Регіон',
	firstName: 'Ім\'я',
	lastName: 'Прізвище',
	address: 'Адреса',
	additional: 'Додаткова інформація',
	postalCode: 'Поштовий індекс',
	city: 'Місто',
	phone: 'Телефон'
};

const Orders = () => {
	const [trackingNumber, setTrackingNumber] = useState("")
	const [pickedOrderIndex, setPickedOrderIndex] = useState(-1)
	const [isLoading, setIsLoading] = useState("");

	const { id } = useParams()

	const [orders, setOrders] = useState([])
	useEffect(() => {
		if (!id) {
			const requestData = async () => {
				const {data} = await api.order.get()
				setOrders(Array.isArray(data.data) ? data.data : [])
			}

			requestData()
		}
	}, [id])

	const [redirect, setRedirect] = useState(false);

	// Function to handle the click event and set redirect state
	const handleOrderClick = (orderId, e) => {
		if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setRedirect(`/admin/orders/${orderId}`);
	};

	const pickedOrder = useMemo(() => orders.find(item => item?._id === id), [id, orders])

	const sendTrackingNumber = async () => {
		setIsLoading("loading")
		try {
			const {email, language, shippingInfo, firstName, lastName, order_id } = id ? pickedOrder : orders[pickedOrderIndex]
			await api.order.sendTrackingNumber({
				order_id,
				email,
				language,
				tracking_id: trackingNumber,
				shipping_type: shippingInfo.type,
				first_name: firstName,
				last_name: lastName,
			})
			setIsLoading('success')
			setTimeout(() => {
				setPickedOrderIndex(-1)
				setIsLoading(false)
			}, 1000)
		} catch (e) {
			setIsLoading('error')
			setTimeout(() => {
				setPickedOrderIndex(-1)
				setIsLoading(false)
			}, 1000)
			console.error(e)
		}
	}

	const [search, setSearch] = useState('')
	const onSearch = (e) => setSearch(e.target.value)

	return (
		<div className="orders__container">
			<Typography variant="h5" gutterBottom className="admin-product-title">
				{id ? <ArrowBackIcon onClick={() => setRedirect('/admin/orders')}/> : ""}
				Замовлення {id ? `#${id}` : ''}
			</Typography>

			{id && pickedOrder
				? <div className="hover-info">
					<ul className="products-listed">
						{pickedOrder.products?.map((product, index) => (
							<li className="products-li" key={index} style={{marginBottom: '10px'}}>
								<div>
									<ProductImage imageName={product.image}/>
								</div>
								<div className="product-details">{product.name.en} {product.quantity}x</div>
								<div>
									{pickedOrder?.language === 'uk'
										? product.price.ua * product.quantity
										: product.price.en * product.quantity}
									{translations.product.currency[pickedOrder?.language === 'uk' ? 'ua' : 'en']}
								</div>
								{product?.attachment ? <p>Підвіс: {product?.attachment}</p> : ""}
								{typeof product?.color === 'string' ? <p>Колір: {product?.color}</p> : ""}
								{product?.material ? <p>Матеріал: {product?.material}</p> : ""}
								{product?.size ? <p>Розмір: {product?.size}</p> : ""}
							</li>
						))}
					</ul>
					<ul>
						{Object.entries(pickedOrder).map(([key, value]) => {
							if (key === 'products' || key === 'billingAddress' || key === 'shippingInfo' || key === '_id') return;
							if (key === 'amount') return (<li key={key}><h4>{orderKeys[key]}: </h4>{value} {pickedOrder?.currency}</li>);
							if (value) return (<li key={key}><h4>{orderKeys[key]}: </h4>{typeof value === 'boolean' ? value ? 'так' : 'ні' : value}</li>);
						})}
					</ul>
					<Typography variant="h6" gutterBottom>Address</Typography>
					<ul>
						{Object.entries(pickedOrder?.shippingInfo)?.map(([shippingKey, shippingValue]) => {
							if (shippingValue) return (
								<li key={shippingKey}><h4>{deliveryTranslations[shippingKey]}: </h4>{shippingValue}</li>
							)
						})}
					</ul>
					{pickedOrder?.billingAddress
						? <>
							<Typography variant="h6" gutterBottom>Billing address</Typography>
							<ul>
								{Object.entries(pickedOrder?.billingAddress)?.map(([shippingKey, shippingValue]) => {
									if (shippingValue) return (
										<li key={shippingKey}><h4>{deliveryTranslations[shippingKey]}: </h4>{shippingValue}</li>
									)
								})}
							</ul>
						</>
						: ""}
					<div className="virovni">
						<TextField id="filled-basic" label="Tracking Number" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)}/>
						<Button variant="contained" onClick={sendTrackingNumber}>
							{isLoading === 'loading'
								? <PendingIcon/>
								:  isLoading === 'success'
									? <DoneAllIcon/>
									: isLoading === 'error'
										? <ReportGmailerrorredIcon/>
										: <>Віправити на {orders.find(item => item?._id === id)?.email}</>}
						</Button>
					</div>
				</div>
				: <>
					{/*<TextField variant="outlined" value={search} onChange={onSearch}/>*/}
					<TableContainer component={Paper}>
						<Table className="table" sx={{minWidth: 650}} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>Опис</TableCell>
									<TableCell align="center">Ім'я</TableCell>
									<TableCell align="center">Адреса</TableCell>
									<TableCell align="center">Сума</TableCell>
									<TableCell align="center">Час</TableCell>
									<TableCell align="center">Дата</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders?.map((row, index) => (
									<TableRow
										key={index}
										sx={{'&:last-child td, &:last-child th': {border: 0}}}
										className={`orders-row ${index === pickedOrderIndex ? 'active' : '' } ${row.approved ? 'approved' : ''}`}
										onClick={(e) => handleOrderClick(row._id, e)}
									>
										<TableCell component="th" scope="row">
											{row.orderDescription}
											{index === pickedOrderIndex
												? <div className="tracking-number">
													<TextField id="filled-basic" label="Tracking Number" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)}/>
													<Button variant="contained" onClick={sendTrackingNumber}>
														{isLoading === 'loading'
															? <PendingIcon/>
															:  isLoading === 'success'
																? <DoneAllIcon/>
																: isLoading === 'error'
																	? <ReportGmailerrorredIcon/>
																	: <>Віправити на {row.email}</>}
													</Button>
													<Button variant="outlined" onClick={() => setPickedOrderIndex(-1)}>Скасувати</Button>
												</div>
												: ""
											}
										</TableCell>
										<TableCell align="center">{row.shippingInfo.firstName} {row.shippingInfo.lastName}</TableCell>
										<TableCell align="center">{row.shippingInfo.city}, {row.shippingInfo.countryRegion}</TableCell>
										<TableCell align="center">{row.amount} {row.language === 'uk' ? translations.product.currency.ua : translations.product.currency.en}</TableCell>
										<TableCell align="center">{formatTime(row.createdAt)}</TableCell>
										<TableCell align="center">{formatDate(row.createdAt)}</TableCell>
										<TableCell scope="row">
											{row.approved && !row.trackingSent ? <Button variant="contained" onClick={() => setPickedOrderIndex(index)}>трекінг</Button> : ''}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			}
			{redirect && <Redirect to={redirect} />}
		</div>
	);
};

export default Orders;
