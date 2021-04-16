import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);

    //variable utile pour l'infinite scroll
    const [count, setCount] = useState(5);

    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.postReducer);


    const loadMore = () => {
        //si la position de la scrollbar dans la fenetre de naviguation est en bas de la fenetre alors 
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            //on passe setLoadPost a true donc cela permet d'automatiquement appellé useEffect car 
            //use effect a loadPost en callback 
            setLoadPost(true);
        }
    }

    useEffect(()=>{
        if (loadPost){
            //on lance la fonction pour charger plus de post
            dispatch(getPosts(count));
            setLoadPost(false);
            //on incrémente setCount pour la prochaine fois qu'on auras besoin de charger des posts.
            setCount(count + 5);
        }

        window.addEventListener("scroll", loadMore);
        return () => window.removeEventListener("scroll", loadMore);
    }, [loadPost, dispatch, count])

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post)=>{
                        return <Card post={post} key={post._id}></Card>;
                    })

                }

            </ul>
        </div>
    );
};

export default Thread;