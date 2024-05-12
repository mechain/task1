import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginUser from "./components/login";
import SignUpUser from "./components/signup";
import useAuth from "./hooks/useAuth";
import { getLocalStorage } from "./helpers/localStorage";
import { useEffect } from "react";
import Home from "./components/home";
import AdminHomePage from "./components/adminHomePage";

function App() {
  const isLoggedIn = getLocalStorage('isLoggedIn');
  const isAdmin = getLocalStorage('isAdmin')
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/home")
    }
    navigate("/login")
  }, [isLoggedIn])
  return (
    <>
      {
        isLoggedIn && <button onClick={() => {
          localStorage.clear()
          navigate('/login')
        }}>Log Out</button>
      }
      <Routes>
        <Route path='/login' element={<LoginUser />} />
        <Route path='/signup' element={<SignUpUser />} />
        {isLoggedIn && !isAdmin &&
          <>
            <Route path='/home' element={<Home />} />
          </>
        }
        {isLoggedIn && isAdmin &&
          <>
            <Route path="/home" element={<AdminHomePage />} />
          </>
        }
      </Routes>
    </>
  )
}

export default App;
