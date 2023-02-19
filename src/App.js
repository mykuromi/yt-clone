import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screen/homeScreen/HomeScreen";
import LoginScreen from "./screen/loginScreen/LoginScreen";
import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./screen/watchScreen/WatchScreen";
import SearchScreen from "./screen/SearchScreen";
import SubscriptionsScreen from "./screen/subscriptionsScreen/SubscriptionsScreen";
import ChannelScreen from "./screen/channelScreen/ChannelScreen";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container border border-info">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  return (
    <Routes>
      <Route path="/" exact element={<Layout children={<HomeScreen />} />} />
      <Route path="/auth" element={<LoginScreen />} />
      <Route
        path="/search/:query"
        element={<Layout children={<SearchScreen />} />}
      />
      <Route
        path="/watch/:id"
        element={<Layout children={<WatchScreen />} />}
      />
      <Route
        path="/feed/subscriptions"
        element={<Layout children={<SubscriptionsScreen />} />}
      />
      <Route
        path="/channel/:channelId"
        element={<Layout children={<ChannelScreen />} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
