import styles from "./PageImage.module.css";

const PageImage = (props) => {
	return (
		<div className={`${styles.parent} ${props.className}`}>
			<img alt={props.alt} src={props.src} />
		</div>
	);
};

export default PageImage;
