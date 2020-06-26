import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ArticleList from '../UI/ArticleList';

const Favorites = () => {
  return (
    <React.Fragment>
      <Header activeItem='article' />
        <h1 style={{ marginTop: 200 }}>favorites</h1>
        <ArticleList />
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='article' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default Favorites;
