import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';

const WriteArticle = () => {
  return (
    <React.Fragment>
      <Header activeItem='article'/>
      <h1 style={{ marginTop: 200 }}>write article</h1>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='article' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default WriteArticle;
