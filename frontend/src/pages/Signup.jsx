import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import bot2 from "/page-photos/robot-2.png";
import styles from "./AuthForm.module.css";
import { useAuth } from "../context/context";

const Signup = () => {
	const [buttonName, setButtonName] = useState("Sign Up");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			setButtonName("Loading...");
			toast.loading("Signing up...", { id: "signup" });
			await auth.signup(name, email, password);
			toast.success("Account created", { id: "signup" });
			navigate("/login");
		} catch (error) {
			toast.error(error.message, { id: "signup" });
		} finally {
			setButtonName("Sign Up");
		}
	};

	return (
		<div className={styles.parent}>
			<div>
				<PageImage src={bot2} alt="signup bot" />
			</div>
			<div>
				<h2>Create New Account</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<FormLabel label="Name" name="username" type="text" required />
					<FormLabel label="E-Mail" name="email" type="text" required />
					<FormLabel label="Password" name="password" type="password" required />
					<Button buttonLabel={buttonName} type="submit" className={styles.button} />
				</form>
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
