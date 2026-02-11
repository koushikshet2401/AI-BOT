import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import bot2 from "/page-photos/robot-2.png";
import styles from "./AuthForm.module.css";
import { useAuth } from "../context/context";

const Login = () => {
	const [buttonName, setButtonName] = useState("Login");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			setButtonName("Loading...");
			toast.loading("Signing in...", { id: "login" });
			await auth.login(email, password);
			toast.success("Signed in successfully", { id: "login" });
			navigate("/chat");
		} catch (error) {
			toast.error(error.message, { id: "login" });
		} finally {
			setButtonName("Login");
		}
	};

	return (
		<div className={styles.parent}>
			<div>
				<PageImage src={bot2} alt="login bot" />
			</div>
			<div>
				<h2>Log Into Your Account</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<FormLabel label="E-Mail" name="email" type="text" required />
					<FormLabel label="Password" name="password" type="password" required />
					<Button buttonLabel={buttonName} type="submit" className={styles.button} />
				</form>
				<p>
					Don't have an account? <Link to="/signup">Create one</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
