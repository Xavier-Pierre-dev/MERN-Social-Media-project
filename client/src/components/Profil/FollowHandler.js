import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const FollowHandler = ({idToFollow, type}) => {
    const userData = useSelector((state)=>state.userReducer);
    const [isFollowed, setIsFollowed]=useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id,idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id,idToFollow));
        setIsFollowed(false);
    }

    //userEffect seras lancé a l'initialisation du composant mais aussi
    //des que userData ou idToFollow seront mise a jour
    useEffect(() => {
        if (!isEmpty(userData.following)) {
          if (userData.following.includes(idToFollow)) {
            setIsFollowed(true);
          } else setIsFollowed(false);
        }
      }, [userData, idToFollow]);



    return (

    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnFollow}>
          {/* <button className="unfollow-btn">Abonné</button> */}
          {type==="suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type==="card" && <img src="./img/icons/checked.svg" alt="checked"></img>}

        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
            {/* <button className="follow-btn">Suivre</button> */}
            {type==="suggestion" && <button className="follow-btn">Suivre</button>}
            {type==="card" && <img src="./img/icons/check.svg" alt="check"></img>}
        </span>
      )}
    </>
    
    );
};

export default FollowHandler;