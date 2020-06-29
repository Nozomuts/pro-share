import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ArticleList from '../UI/ArticleList';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { Icon } from 'semantic-ui-react';

const Favorites = () => {
  const [article, setArticle] = useState([]);
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      let favoriteArray: any = [];
      firebase
        .firestore()
        .collection('users')
        .onSnapshot((snapshot: any) => {
          snapshot.docs
            .filter((doc: any) => doc.id === user.uid)
            .map((doc: any) => {
              favoriteArray.push(...doc.data().favorite);
              return doc;
            });
        });
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
    <>
      <Header activeItem='article' />
      <div style={{ margin: '100px 0' }}>
        <h1 style={{marginLeft: '5vw'}}><Icon color='yellow' name="star"/>お気に入り</h1>
        <ArticleList article={article} />
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='article' />
        </MediaQuery>
      </div>
    </>
  );
};

export default Favorites;
