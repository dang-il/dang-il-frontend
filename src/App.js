import React from "react";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import LoginGoogle from "./components/LoginGoogle.js";
import LoginKakao from "./components/LoginKakao.js";
import MainPageBeforeLogin from "./pages/MainPageBeforeLogin.js";
import UserPage from "./pages/UserPage.js";
import MainPage from "./pages/MainPage.js";
import { prototype } from "postcss/lib/previous-map";

const App = () => {
  //login
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 성공 시 로그인 상태 true로 변경
  const loginHandler = () => {
    setIsLogin(true);
  };

  // 로그아웃 성공 시 로그인 상태 false로 변경
  const logoutHandler = () => {
    setIsLogin(false);
  };

  const ProtectedRoute = ({ isLogin, children }) => {
    const navigate = useNavigate();
  
    if (!isLogin) {
      return children;
    } else {
      navigate("/mainPage"); // 페이지 이동
      return null;
    }
  };
  

  return (

      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <Routes>
         {/* 로그인된 경우엔 바로 메인페이지로 이동 */}
        <Route
          exact path="/"
          element={
            <ProtectedRoute isLogin={isLogin}>
              {/* <MainPageBeforeLogin /> */}
              {/* 임시로 로그인이 되지 않더라도 로그인 후 화면으로 이동 */}
              <MainPage logoutHandler={logoutHandler} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth/google/callback"
          element={<LoginGoogle loginHandler={loginHandler} />}
        />
        <Route
          path="/auth/kakao/callback"
          element={<LoginKakao loginHandler={loginHandler} />}
        />
      {/* 서버 종료로 인해 로그인이 안되더라도 mainPage 이동이 가능하도록 수정 */}
        <Route
          path="/mainPage"
          element={
            // <ProtectedRoute isLogin={isLogin}>
            //   <MainPage logoutHandler={logoutHandler} />
            // </ProtectedRoute>
            <MainPage logoutHandler={logoutHandler} />
          }
        />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
