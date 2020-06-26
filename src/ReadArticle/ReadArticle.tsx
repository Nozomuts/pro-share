import React, { useState, useEffect } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import Category from './Category';
import ArticleList from '../UI/ArticleList';
import Search from './Search'
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';

const ReadArticle = () => {
  const [article, setArticle] = useState([]);
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot: any) => {
          const articleArray:any=[]
          snapshot.docs.map((doc:any)=>{
            articleArray.push(...doc.data().article)
            return articleArray
          })
          setArticle(articleArray)
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Header activeItem='article' />
        <h1 style={{ marginTop: 200 }}>read article</h1>
        <Category />
        <Search />
        <ArticleList article={article}/>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='article' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default ReadArticle;
