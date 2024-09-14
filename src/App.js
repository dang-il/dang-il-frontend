import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginGoogle from "./components/LoginGoogle";
import LoginKakao from "./components/LoginKakao";
import MainPageBeforeLogin from "./pages/MainPageBeforeLogin";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";

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
    return isLogin ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageBeforeLogin />} />
        <Route
          path="/auth/google/callback"
          element={<LoginGoogle loginHandler={loginHandler} />}
        />
        <Route
          path="/auth/kakao/callback"
          element={<LoginKakao loginHandler={loginHandler} />}
        />
        {/* 로그인을 안했을 경우에는 게스트모드에서 벗어날 수 없음 */}
        <Route
          path="/mainPage"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <MainPage logoutHandler={logoutHandler} />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
