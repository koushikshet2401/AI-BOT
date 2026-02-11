import {
	userLogin,
	getAuthStatus,
	logoutUser,
	userSignup,
} from "../../helpers/api-functions";

import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check if user cookies are valid
	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const data = await getAuthStatus();

				if (data) {
					setUser({ email: data.email, name: data.name });
					setIsLoggedIn(true);
				}
			} catch (err) {
				console.log("User not authenticated");
			}
		};

		checkAuthStatus();
	}, []);

	const login = async (email, password) => {
		const data = await userLogin(email, password);

		if (data) {
			setUser({ email: data.email, name: data.name });
			setIsLoggedIn(true);
		}
	};

	const signup = async (name, email, password) => {
		await userSignup(name, email, password);
	};

	const logout = async () => {
		await logoutUser();
		setIsLoggedIn(false);
		setUser(null);
		window.location.reload();
	};

	const value = {
		user,
		isLoggedIn,
		login,
		logout,
		signup,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
