import mainBot from "/page-photos/homepage-bot.png";
import { NavLink } from "react-router-dom";
import Section from "../components/home/Sections";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.parent}>
			<Section
				src={mainBot}
				alt="main-bot"
				imgStyle={styles.ui1}
				reverse={false}
			>
				<h2>| NEXT GEN PLATFORM</h2>
				<h1>
					YOUR OWN PERSONAL <span className={styles.highlight}>CHAT BOT</span>
				</h1>
				<p>
					Experience secure, seamless AI conversations across a wide range of topics.
				</p>
				<NavLink to="/login" className={styles.btn}>
					Get Started For Free
				</NavLink>
			</Section>
		</div>
	);
};

export default Home;
