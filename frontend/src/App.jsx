import Header from "./components/shared/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import { useAuth } from "./context/context";
import styles from "./App.module.css";

function App() {
  const auth = useAuth();

  return (
    <div>
      <Header />

      <main className={styles.routes}>
        <Routes>

          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              auth?.isLoggedIn ? <Navigate to="/chat" /> : <Home />
            }
          />

          {/* 🔐 AUTH ROUTES */}
          {!auth?.isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {/* 💬 CHAT */}
          {auth?.isLoggedIn && (
            <Route path="/chat" element={<Chat />} />
          )}

          {/* 🛡 ADMIN */}
          {auth?.user?.role === "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}

          {/* ❌ FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
