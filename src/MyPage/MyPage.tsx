import React from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';

const MyPage = () => {
  return (
    <React.Fragment>
      <Header activeItem='mypage'/>
      <h1 style={{marginTop: 200}}>my page</h1>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='mypage' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default MyPage;
