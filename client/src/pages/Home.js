import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import FriendsHint from "../components/Profil/FriendsHint";
import Thread from "../components/Thread";
import Trends from "../components/Trends";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <div className="home">
          <LeftNav></LeftNav>

          <div className="main">
            <div className="home-header">
              {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
            </div>
            <Thread></Thread>
          </div>
          <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends></Trends>
            {uid && <FriendsHint />} 
          </div>
        </div>
        </div>
        </div>
      ) : (
        <div className="profil-page">
        <div className="log-container">
        <Log signin={false} signup={true} />
        
        <div className="img-container">
            <img src="./img/log.svg" alt="img-login"/>
        </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;
