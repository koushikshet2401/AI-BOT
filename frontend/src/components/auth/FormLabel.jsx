import styles from "./FormLabel.module.css";

const FormLabel = (props) => {
	return (
		<div className={`${styles.label} ${props.className || ""}`}>
			<label htmlFor={props.htmlFor} placeholder={props.labelPH}>
				{props.label}
			</label>
			<input
				type={props.type}
				id={props.id}
				name={props.name}
				required={props.required}
				maxLength={props.maxLength}
				minLength={props.minLength}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.inputPH}
			/>
		</div>
	);
};

export default FormLabel;
