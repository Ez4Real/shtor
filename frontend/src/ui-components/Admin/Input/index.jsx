import React, {useMemo, useState} from 'react';
import './Input.css'
import {Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {formatLabelToOptions} from "../../../admin/Content/ProductForm/productUtils";

const custom = (data) => ({
	target: {
		value: data
	}
})

const Input = ({label, type, disabled, onChange, value, multiple, prefix, error}) => {
	const [text, setText] = useState('');

	if (type === 'list') {
		const handleInputChange = (e) => {
			onChange(custom(multiple ? value.includes(e.target.value) ? [...value] : [...value, e.target.value] : [e.target.value]))
		};

		const handleRemoveItem = (index) => {
			const updatedItems = [...value];
			updatedItems.splice(index, 1);
			onChange(custom(updatedItems));
		};

		return <div className={`custom-input ${error ? 'error' : ''}`}>
			<Typography variant="subtitle1" gutterBottom>{label} {prefix}</Typography>
			{value.map((item, index) => (
				<React.Fragment key={index}>
					{index ? '|' : ""}
					<Chip label={item} color="primary" onDelete={() => handleRemoveItem(index)}/>
				</React.Fragment>
			))}
			<div className="color__block add-text">
				<label></label>
				<TextField
					error={error}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<i className="add bi bi-pencil-square"></i>
							</InputAdornment>
						),
					}}
					type="text"
					value={text}
					className="color-input-text"
					placeholder="Напишіть колір"
					onChange={(e) => setText(e.target.value)}
					onBlur={(e) => {
						if (text) handleInputChange(e)
						setText("")
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (text) handleInputChange(e)
							setText("")
						}
					}}
				/>
			</div>
		</div>
	}

	if (type === 'images') {

		const handleDrop = (e) => {
			e.preventDefault();

			const files = Array.from(e.dataTransfer.files);
			// Filter only image files if needed
			const imageFiles = files.filter((file) => file.type.startsWith('image/'));

			onChange(custom(multiple ? [...value, ...imageFiles] : [imageFiles[0]]));
		};

		const handleInputChange = (e) => {
			const files = Array.from(e.target.files);
			// Filter only image files if needed
			const imageFiles = files.filter((file) => file.type.startsWith('image/'));

			onChange(custom(multiple ? [...value, ...imageFiles] : [imageFiles[0]]));
		};

		const handleRemoveImage = (index) => {
			const updatedImages = [...value];
			updatedImages.splice(index, 1);
			onChange(custom(updatedImages));
		};

		const InputImages = () => <div className="add__images__block">
			<input
				type="file"
				accept="image/*"
				onChange={handleInputChange}
				multiple={multiple}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
			/>
			<Button variant="contained" startIcon={<CloudUploadIcon />} className="add__images__button">{multiple ? "Вибрати файли" : "Вибрати файл"}</Button>
			<div className="drag__drop">
				Перетягніть зображення сюди
			</div>
		</div>

		const ImageBlock = ({image, index}) => useMemo(
			() => <div className="images-item">
				<img src={image?.key || URL.createObjectURL(image)} alt={`image-${index}`} width="100" />
				<button className="remove__image" onClick={() => handleRemoveImage(index)}><i className="bi bi-trash"></i></button>
			</div>,
			[value.key])

		return (
			<div className={`custom-input ${error ? 'error' : ''}`}>
				<Typography variant="subtitle1" gutterBottom>{label}</Typography>
				{multiple
					? <InputImages/>
					: value?.length
						? ""
						: <InputImages/>
				}
				<div className="images__container">
					{Array.isArray(value)
						? value.map((image, index) => <ImageBlock key={index} image={image} index={index}/>)
						: value
							? <ImageBlock image={value} index={value.key}/>
							: ""
					}
				</div>
			</div>
		);
	}
	if (type === 'select') {
		return <FormControl className="custom-input" fullWidth>
			<InputLabel id={label}>{label}</InputLabel>
			<Select
				error={error}
				value={value}
				labelId={label}
				label={label}
				onChange={onChange}
				disabled={disabled}
			>
				{formatLabelToOptions(label).map((option, key) => (
					<MenuItem key={key} value={option}>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	}

	if (type === 'textarea') {
		return <div className="custom-input">

			<TextField
				error={error}
				multiline
				value={value}
				rows={4}
				label={`${label} ${prefix ? prefix : ''}`}
				onKeyDown={e => e.key === 'Enter' && onChange(custom(`${value}\n`))}
				onChange={onChange} placeholder={`${label} ${prefix}`}
			/>

		</div>
	}
	return (
		<div className="custom-input">
			<TextField type={type} error={error} label={`${label} ${prefix ? prefix : ''}`} value={value} onChange={onChange} disabled={disabled} />
		</div>
	);
};

export default React.memo(Input);
