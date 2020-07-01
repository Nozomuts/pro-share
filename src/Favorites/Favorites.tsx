import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ArticleList from '../UI/ArticleList';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { Icon } from 'semantic-ui-react';
import {RootState} from '../re-ducks/store'
import { ArticleType } from '../Types';

const Favorites = () => {
  const [article, setArticle] = useState<ArticleType[]>([]);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      let favoriteArray: string[] = [];
      firebase
        .firestore()
        .collection('users')
        .onSnapshot((snapshot) => {
          snapshot.docs
            .filter((doc) => doc.id === user.uid)
            .map((doc) => {
              favoriteArray.push(...doc.data().favorite);
              return doc;
            });
        });
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot) => {
          const articleArray: ArticleType[]  = [];
          snapshot.docs.map((doc) => {
            articleArray.push(...doc.data().article);
            return articleArray;
          });
          console.log(articleArray);
          const newArray = articleArray.filter((el: ArticleType) =>
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
      <div style={{ marginTop: 100,  paddingBottom: 100 }}>
        <h1 style={{width: '90vw', maxWidth: 800, margin: '0 auto', marginBottom: 50 }}><Icon color='yellow' name="star"/>お気に入り</h1>
        <ArticleList article={article} />
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='article' />
        </MediaQuery>
      </div>
    </>
  );
};

export default Favorites;
