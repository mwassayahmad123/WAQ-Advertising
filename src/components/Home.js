import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import NavTop from "./NavBar";
import Categories from "./Categories";
import AdsDisplay from "./ProductBox";


const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="home-page">
    <NavTop/>
    <Categories/>
    <AdsDisplay/>
    
    </div>
  );
};

export default Home;
