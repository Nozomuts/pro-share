import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ArticleList from '../UI/ArticleList';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';

const Favorites = () => {
  const [article, setArticle] = useState([]);
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      let favoriteArray: any = [];
      firebase
        .firestore()
        .collection('users')
        .onSnapshot((snapshot:any)=>{
          snapshot.docs.filter((doc:any)=>doc.id===user.uid).map((doc:any)=>{
            favoriteArray.push(...doc.data().favorite)
            return doc
          })
        })
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot: any) => {
          const articleArray: any = [];
          snapshot.docs.map((doc: any) => {
            articleArray.push(...doc.data().article);
            return articleArray;
          });
          console.log(articleArray);
          const newArray = articleArray.filter((el: any) =>
            favoriteArray.includes(el.id)
          );
          console.log(newArray);
          setArticle(newArray);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Header activeItem='article' />
      <h1 style={{ marginTop: 200 }}>favorites</h1>
      <ArticleList article={article} />
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='article' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default Favorites;
