import Logo from "./Logo";
import styles from "./Header.module.css";
import { useAuth } from "../../context/context";
import NavigationLink from "./NavigationLink";

const Header = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.logout();
  };

  let links;

  if (auth?.isLoggedIn) {
    links = (
      <>
        <NavigationLink to="/chat" text="Go To Chat" />

        {auth?.user?.role === "admin" && (
          <NavigationLink to="/admin" text="Check Enquiries" />
        )}

        <NavigationLink to="/" text="Logout" onClick={handleLogout} />
      </>
    );
  } else {
    links = (
      <>
        <NavigationLink to="/login" text="Sign In" />
        <NavigationLink to="/signup" text="Create an Account" />
      </>
    );
  }

  return (
    <div className={styles.parent}>
      <Logo />
      <div>{links}</div>
    </div>
  );
};

export default Header;
