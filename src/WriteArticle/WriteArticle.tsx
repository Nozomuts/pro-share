import React, { useState, useEffect } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import CreateArticle from './CreateArticle';
import ArticleList from '../UI/ArticleList';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';

const WriteArticle = () => {
  const [article, setArticle] = useState([]);
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot: any) => {
          snapshot.docs.filter((doc:any)=>doc.id===user.uid).map((doc:any)=>{
            setArticle(doc.data().article)
            return {...doc.data().article}
          })
        });
    }
  }, []);

  return (
    <React.Fragment>
      <Header activeItem='article' />
      <h1 style={{ marginTop: 200 }}>write article</h1>
      <CreateArticle user={user} article={article} />
      <ArticleList article={article}/>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='article' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default WriteArticle;
