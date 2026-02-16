import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./NavigationLink.module.css";

const linkVariant = {
  whileHover: { scale: 1.1 },
};

const NavigationLink = ({ to, text, onClick }) => {
  return (
    <motion.div
      className={styles.link}
      variants={linkVariant}
      whileHover="whileHover"
      onClick={onClick}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? styles.active : styles.pending
        }
      >
        {text}
      </NavLink>
    </motion.div>
  );
};

export default NavigationLink;
